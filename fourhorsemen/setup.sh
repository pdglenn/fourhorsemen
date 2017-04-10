#!/bin/sh
pip install -r requirements.txt
python manage.py makemigrations fourhorsemen
python manage.py migrate fourhorsemen
python ./fourhorsemen/fixtures/populate.py
python manage.py loaddata initial_data.yaml
