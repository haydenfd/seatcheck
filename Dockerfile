FROM python:3.11-slim
WORKDIR /app
RUN apt-get update && \
    apt-get install -y zip && \
    rm -rf /var/lib/apt/lists/*
COPY db_requirements.txt .
RUN pip install -r db_requirements.txt -t /opt/python/
CMD cd /opt && zip -r9 /app/db-layer.zip .