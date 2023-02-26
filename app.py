# Flask er en python pakke som fungerer som en webserver.
from flask import Flask, render_template, request, url_for, flash, redirect
import sqlalchemy
from MySQLdb import _mysql

# Her setter jeg opp connection til basen, og dbc variablelen brukes senere for å hente og sende data fra databasen.
host='db'
user='root'
password='mysqlpass'
datab='hjemmeside'
port=3306
dbc=_mysql.connect(host=host, port=port, user=user,password=password, database=datab)


# Her starter flask appen og den konffigureres   
app = Flask(__name__)
app.config['SECRET_KEY'] = 'wergfc3453f63d4uwger6uf5trdf42d5'

# Fuksjonene som er under er de ulike adressene for websidene
# app.route er en dekrotør(dekorator)som setter hvilke addresser denne skal  låse på
@app.route('/')
def index():
    # render_template er en innebygget flask funksjon som returnerer en mal html side til brukeren. 
    # Man kan sende data med dette svaret som kan brukes av siden. Se foreskempel artikkelfunksjonen.
    return render_template('index.html')

@app.route('/amalie')
def amalie():
    return render_template('amalie_skram.html')

@app.route('/prod')
def prod():
    return render_template('prod.html')

@app.route('/ikt')
def ikt():
    return render_template('IKT.html')

@app.route('/four')
def four():
    return render_template('4_in_a_row.html')

@app.route('/artikkel')
def artikkel():
    # hente data
    # Først lagert jeg en spørring som bruker SQL 
    # SQL-en er et strukturert spørrespråk
    # dbc.query spør databasen om å returnere Tittel, ArtikkelUrl og beskrivelse fra tabellen "artikkel"
    dbc.query("""SELECT Tittel, ArtikkelUrl, Beskrivelse FROM artikkel""")
    r=dbc.store_result()
    data=r.fetch_row(how=1, maxrows=0) # how=1 betyr retur som dict, maxrows=0 returnerer alle rows.
    print(data)
    # "data" som er hentet fra databasen sendes ut til nettside templaten som generer innholdet der.
    return render_template('artikkel.html', data=data)

@app.route('/input', methods=('GET', 'POST') )
def input():
    # hvis noen bare ber om siden så sender vi dem formen.
    if request.method == 'GET':
        return render_template('input.html', okornot="")
    
    # hvis noen sender inn data fra html-formen så behandler vi dem og lagrer i databasen
    if request.method == 'POST':
        # vi henter ut form dataene fra requesten som er sendt til flask webserveren
        tittel = request.form['tittel']
        url = request.form['url']
        beskrivelse = request.form['beskrivelse']
        # Her burde jeg rense input dataene for å unngå sql injections 

        # Lagre dataene 
        
        # print(f"""INSERT INTO artikkel (Tittel, ArtikkelUrl, Beskrivelse) VALUES ('{tittel}', '{url}', '{beskrivelse}');""")
        
        # Sett inn dataene tittel, url og beskrivelse (values) definert over, i feltene (Tittel, ArtikkelUrl, Beskrivelse) i tabellene artikkel
        dbc.query(f"""INSERT INTO artikkel (Tittel, ArtikkelUrl, Beskrivelse) VALUES ('{tittel}', '{url}', '{beskrivelse}');""")

      

        # Returnere OK hvis lagret
        return redirect(url_for('artikkel'))


if __name__ == '__main__':
    # APP.run(host='0.0.0.0', port=5000, debug=True)
    app.run(debug=True)