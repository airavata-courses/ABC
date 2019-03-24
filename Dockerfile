FROM python:3.4

COPY . /opt/app
WORKDIR /opt/app

#Set container port 
EXPOSE 5000

#Install dependencies
RUN pip install -r requirement.txt

ENV NEWS_API_KEY="06d6ba7067ae4ceaba12b125dbb99375"

CMD ["python", "news-application.py"]
