from flask import Flask, render_template
import os

# --- Configuración de Rutas Absolutas (Para compatibilidad con Render) ---

# Define la ruta base del proyecto (donde está app.py)
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# Define las rutas de las carpetas de Jinja2 (templates) y archivos web (static)
TEMPLATE_DIR = os.path.join(BASE_DIR, 'templates')
STATIC_DIR = os.path.join(BASE_DIR, 'static')

# Creamos la instancia de Flask, especificando ambas rutas.
# Esto fuerza a Flask a buscar las plantillas en TEMPLATE_DIR.
app = Flask(__name__, 
            template_folder=TEMPLATE_DIR,
            static_folder=STATIC_DIR)

# Función para la página principal (index.html)
@app.route('/')
def index():
    # Intenta renderizar index.html
    return render_template('index.html')

# Función para la página de servicios (servicios.html)
@app.route('/servicios')
def servicios():
    return render_template('servicios.html')
    
# Función para la página de contacto (contacto.html)
@app.route('/contacto')
def contacto():
    return render_template('contacto.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
