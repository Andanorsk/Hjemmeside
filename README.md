# Hjemmeside

Hvordan konfiguirere terminalen i VS code:
https://stackoverflow.com/questions/69605313/vs-code-terminal-activate-ps1-cannot-be-loaded-because-running-scripts-is-disa

Hvordan sette opp flask
https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world
https://flask.palletsprojects.com/en/2.1.x/tutorial/



Hvordan sette opp venv i VS code
1. Install extension: Python fra mixcrosoft.com
2. Install python 3.10
3. sett opp venv ved å velge: 
4. ctrl + shift + p 
5. skriv "Python: Create Enviroment"
6. trykk på Venv 
7. velg riktig python versjon

Husk å sette miljø(windows) variabel: 

$ set FLASK_APP=main.py


For å lagre de installeretye pakkene i en fil:
$ pip freeze > requirements.txt 

For å installere dette på en annen maskin: 
$ pip install -r requirements.txt


To connect to the DB
pip install SQLAlchemy
pip install mysql-connector-python

Hvordan starte webserveren
1. start mamp
2. start en terminal
3. sjekk om venv kjører4
3b. hvis ikke venv kjører - kjør venv.cmd i terminalen
4. python app.py  for å starte serveren
5 åpne chrome og gå till webadressen
6. Hvis "module not found" så kjør - pip install -r requirements.txt

hvis problemer med å starte mamp oppstår så: 
ctrl + alt + del
task manager
prosseses
avslutt mysqld 
avslutt mamp
avslutt httpd
(avslutt ggjøres med å høyre klikke og end prosses)
restard mamp
