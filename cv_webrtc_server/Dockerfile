FROM python as prepare

WORKDIR /app
COPY ./requirements.txt /app/requirements.txt
RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY ./detection/ /app/detection

WORKDIR /app/detection/tests

CMD python server.py
