FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

# Copy the top-level files in your service's directory
# Modify these instructions to do that
COPY requirements.txt requirements.txt
COPY poller.py poller.py
# COPY events_app events_app
# COPY events_project events_project
# Copy all of the subdirectories in your service's directory
# Modify these instructions to do that


RUN pip install -r requirements.txt
CMD python poller.py
