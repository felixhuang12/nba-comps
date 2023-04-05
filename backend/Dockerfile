# syntax=docker/dockerfile:1

FROM python:3.9-slim-buster

WORKDIR /

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 5001

COPY . .

CMD ["flask", "run", "--host", "0.0.0.0", "-p", "5001"]