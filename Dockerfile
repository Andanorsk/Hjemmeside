FROM tiangolo/uwsgi-nginx-flask:python3.10

RUN pip3 install --upgrade pip
RUN apt-get update
RUN apt-get install telnet

COPY requirements.txt /app
RUN pip install -r /app/requirements.txt
COPY . /app
WORKDIR /app

# RUN rm /app/main.py
ENV PYTHONUNBUFFERED=1

# using uwsgi to run no need for anything else
# ENTRYPOINT ["python"]
# CMD ["app.py"]