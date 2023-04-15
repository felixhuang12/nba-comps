# syntax=docker/dockerfile:1

FROM python:3.9-slim-buster
WORKDIR /backend

# ==== INSTALL DEPENENCIES ====
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# ==== COPY OVER REST OF STUFF ====
COPY . .

# ==== RUN ====
EXPOSE 5001
CMD ["flask", "run", "--host", "0.0.0.0", "-p", "5001"]