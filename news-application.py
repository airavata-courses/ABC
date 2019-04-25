from flask import Flask, jsonify, abort
import requests
from flask_cors import CORS
import os
import atexit
import multiprocessing
import consul
import sys


def flask_news(api_key):

    app = Flask(__name__)
    CORS(app)
    url = "https://newsapi.org/v2"

    # For removing x_hr warning
    # app.config["JSONIFY_PRETTYPRINT_REGULAR"] = False

    @app.route("/color", methods=['GET'])
    def color():
        return "blue"

    @app.route("/", methods=['GET'])
    def index():
        return "Use /top_headlines endpoint to get latest headlines from \
            United States "

    @app.route("/checkhealth", methods=['GET'])
    def check_health():
        return "Up and running."

    @app.route("/top_headlines", methods=["GET"])
    def get_news():
        """
        Top 10 news from United status
        """
        response = ""
        try:
            r = requests.get(
                url + "/top-headlines",
                headers={"X-Api-Key": api_key},
                params={"country": "us", "pageSize": 10}
            )

            if r.status_code == 200:
                result = {"success": 1, "news": []}
                for news in r.json()["articles"]:
                    result["news"].append(news)
                return jsonify(result)

            return response

        except Exception as e:
            print(e)
            abort(500)

    return app


def run_at_exit():
    # deregister the service on exit
    print("Exiting the news application")


def register_service():
    # Registering the service
    print("Registering the service")
    c = consul.Consul(host="127.0.0.1")
    try:
        result = c.agent.service.register(
            "news",
            service_id="news",
            port=5000,
            check={
                "DeregisterCriticalServiceAfter": "90s",
                "http": "http://127.0.0.1:5000/checkhealth",
                "interval": "10s",
                "timeout": "1s"
            }
        )
    except Exception as e:
        print(e)
        sys.exit()
    result


def consul_conn_check(host):
    c = consul.Consul(host=host)
    state = False
    try:
        c.catalog.nodes()
        state = True
    except ConnectionError:
        pass
    finally:
        return state


atexit.register(run_at_exit)

if __name__ == "__main__":

    try:
        app = flask_news(os.environ["NEWS_API_KEY"])
        process = multiprocessing.Process(target=register_service)
        process.daemon = True
        process.start()
        app.run(host="0.0.0.0")

    except KeyError as e:
        print(e)
        print("News API key is not set in Environment variable")
