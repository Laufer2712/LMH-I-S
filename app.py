from flask import Flask, render_template
import os
import logging # Añadimos el módulo de logging

# Configurar logging básico para ver mensajes en el log de Render
logging.basicConfig(level=logging.INFO)

# Define la ruta absoluta al directorio actual del archivo app.py
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# Define la ruta absoluta a la carpeta de plantillas (templates/)
TEMPLATE_DIR = os.path.join(BASE_DIR, 'templates')

# Define la ruta absoluta a la carpeta de archivos estáticos (static/)
STATIC_DIR = os.path.join(BASE_DIR, 'static')


# Creamos la instancia de Flask, forzando ambas rutas (templates y static).
app = Flask(__name__, 
            template_folder=TEMPLATE_DIR,
            static_folder=STATIC_DIR)

# Función para la página principal (index.html)
@app.route('/')
def index():
    template_path = os.path.join(TEMPLATE_DIR, 'index.html')
    
    # *** VERIFICACIÓN CRÍTICA DE ARCHIVO ***
    # Esto comprueba si el archivo EXISTE en la ruta que Render está usando.
    if not os.path.exists(template_path):
        logging.error(f"FATAL: Template file not found at expected path: {template_path}")
        # Lanzamos una excepción visible para que aparezca en el log.
        raise FileNotFoundError(f"TemplateNotFound: index.html (File missing at {template_path})")
    
    # Si existe, intenta renderizar
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
    # Esta parte solo se ejecuta si corres el archivo directamente (localmente), no en Render.
    app.run(host='0.0.0.0', port=5000, debug=True)
