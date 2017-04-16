#!/bin/sh
pip install -r requirements.txt
python ./fourhorsemen/fixtures/populate.py
python manage.py loaddata initial_data.yaml
python manage.py makemigrations fourhorsemen
python manage.py migrate fourhorsemen
