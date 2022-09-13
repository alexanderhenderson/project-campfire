FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

# Copy the top-level files in your service's directory
# Modify these instructions to do that
COPY requirements.txt requirements.txt
COPY poller.py poller.py

# Copy all of the subdirectories in your service's directory
# Modify these instructions to do that
COPY users_project users_project
COPY users_app users_app

RUN pip install -r requirements.txt
CMD python poller.py
