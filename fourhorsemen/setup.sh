#!/bin/sh
pip install -r requirements.txt
python manage.py makemigrations survey
python manage.py migrate survey
python manage.py loaddata initial_data.yaml
