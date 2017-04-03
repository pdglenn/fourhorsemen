#!/bin/sh
pip install -r requirements.txt
python manage.py makemigrations fourhorsemen
python manage.py migrate fourhorsemen
python manage.py loaddata initial_data.yaml
