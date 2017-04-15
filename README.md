1. open terminal
2. "source activate fourhorsemen" <-- emily/jason, your command is "source activate py27"
3. cd to the place you've cloned the repository. emily/molly, for you it's "cd ~/documents/fourhorsemen"
4. "cd fourhorsemen"
5. ./setup.sh
6. python manage.py runserver
7. Open browser to 127.0.0.1:8000

To modify templates go to fourhorsemen/fourhorsemen/fourhorsemen/templates
To modify forms go to fourhorsemen/fourhorsemen/fourhorsemen/forms.py
To modify the text of the survey responses, go to fourhorsemen/fourhorsemen/fourhorsemen/fixtures/populate.py and change them. You'll have to re-run ./setup.sh to re-load them to the database and see changes
To modify the survey questions, set the label parameter in survey.py on the question
