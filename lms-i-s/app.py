from flask import Flask, render_template

app = Flask(__name__)

# Función para la página principal (index.html)
@app.route('/')
def index():  # <-- ¡Este es el 'index' que usas en url_for('index')!
    return render_template('index.html')

# Función para la página de servicios (servicios.html)
@app.route('/servicios')
def servicios(): # <-- ¡Este es el 'servicios' que usas en url_for('servicios')!
    return render_template('servicios.html')
    
# Función para la página de contacto (contacto.html)
@app.route('/contacto')
def contacto(): # <-- ¡Este es el 'contacto' que usas en url_for('contacto')!
    return render_template('contacto.html')

if __name__ == '__main__':
    app.run(debug=True)