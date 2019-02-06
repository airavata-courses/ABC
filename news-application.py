from flask import Flask, jsonify, request, abort
import requests
import json
from flask_cors import CORS
import os

def flask_news(api_key):

    app = Flask(__name__)
    CORS(app)
    url = "https://newsapi.org/v2"

    # For removing x_hr warning
    # app.config["JSONIFY_PRETTYPRINT_REGULAR"] = False

    @app.route("/", methods=['GET'])
    def index():
        return "Use /top_headlines endpoint to get latest headlines from United States "

    @app.route("/top_headlines", methods=["GET"])
    def get_news():
        """
        Top 10 news from United status
        """
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
            abort(500)

    return app

if __name__ == "__main__":

    try:
        app = flask_news(os.environ["NEWS_API_KEY"])
        app.run(host="0.0.0.0")

    except KeyError as e:
        print("News API key is not set in Environment variable")

