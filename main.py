# Flask er en python pakke som fungerer som en webserver.
from flask import Flask, render_template, request, url_for, flash, redirect

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
    data=[]
    data.append({"tittel":"Forms", "url":"https://www.digitalocean.com/community/tutorials/how-to-use-web-forms-in-a-flask-application", "beskrivelse":"Her fant jeg hvordan jeg skulle bruke forms i flask"})
    data.append({"tittel":"Flask tutorial", "url":"https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world", "beskrivelse":"Her lærte jeg Flask"})
    return render_template('artikkel.html', data=data)

@app.route('/input', methods=('GET', 'POST') )
def input():
    if request.method == 'POST':
        tittel = request.form['tittel']
        url = request.form['url']
        beskrivelse = request.form['beskrivelse']
        # Lagre dataene

        # Returnere OK hvis lagret
        return  render_template('input.html', okornot="Dataene ble lagret")
    if request.method == 'GET':
        return render_template('input.html', okornot="")

if __name__ == '__main__':
    # APP.run(host='0.0.0.0', port=5000, debug=True)
    app.run(debug=True)