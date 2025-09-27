from flask import Flask, render_template
import os

# Define la ruta absoluta al directorio actual del archivo app.py
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
# Define la ruta absoluta a la carpeta de plantillas (templates/)
TEMPLATE_DIR = os.path.join(BASE_DIR, 'templates')

# Creamos la instancia de Flask, forzando la ruta al directorio de plantillas.
# Esto garantiza que Flask encuentre las plantillas sin importar la configuración 
# de "Root Directory" que Render esté usando internamente.
app = Flask(__name__, template_folder=TEMPLATE_DIR)

# Función para la página principal (index.html)
@app.route('/')
def index():
    # El archivo debe estar en /templates/index.html
    return render_template('index.html')

# Función para la página de servicios (servicios.html)
@app.route('/servicios')
def servicios():
    # El archivo debe estar en /templates/servicios.html
    return render_template('servicios.html')
    
# Función para la página de contacto (contacto.html)
@app.route('/contacto')
def contacto():
    # El archivo debe estar en /templates/contacto.html
    return render_template('contacto.html')

if __name__ == '__main__':
    # Usamos 0.0.0.0 para escuchar peticiones externas (útil para pruebas en red local)
    # En Render, Gunicorn maneja el host y el puerto, pero esta configuración es segura.
    app.run(host='0.0.0.0', port=5000, debug=True)
