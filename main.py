from flask import Flask, render_template, request, url_for, flash, redirect
import sqlalchemy
from MySQLdb import _mysql

# Her setter jeg opp connection til basen, og dbc variablelen brukes senere for å hente og sende data fra databasen.
host='localhost'
user='root'
password='mysqlpass'
datab='hjemmeside'
dbc=_mysql.connect(host=host, user=user,password=password, database=datab)


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

@app.route('/artikkel')
def artikkel():
    # hente data
    # Først lagert jeg en spørring som bruker SQL 
    # SQL-en er et strukturert spørrespråk
    # dbc.query spør databasen om 
    dbc.query("""SELECT Tittel, ArtikkelUrl, Beskrivelse FROM artikkel""")
    r=dbc.store_result()
    data=r.fetch_row(how=1, maxrows=0)
    print(data)

    return render_template('artikkel.html', data=data)

@app.route('/input', methods=('GET', 'POST') )
def input():
    if request.method == 'POST':
        tittel = request.form['tittel']
        url = request.form['url']
        beskrivelse = request.form['beskrivelse']
          # Lagre dataene 
        dbc.query(f'''INSERT INTO artikkel (Tittel, ArtikkelUrl, Beskrivelse) VALUES ({tittel}, {url}, {beskrivelse});''')

      

        # Returnere OK hvis lagret
        return  render_template('input.html', okornot="Dataene ble lagret")
    if request.method == 'GET':
        return render_template('input.html', okornot="")

if __name__ == '__main__':
    # APP.run(host='0.0.0.0', port=5000, debug=True)
    app.run(debug=True)