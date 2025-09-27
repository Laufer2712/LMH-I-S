from flask import Flask, render_template

# Inicialización de la aplicación Flask
app = Flask(__name__)

# Función para la página principal (index.html)
# Ruta: /
@app.route('/')
def index():
    # Asegúrate de que index.html se encuentra en la carpeta 'templates'
    return render_template('index.html')

# Función para la página de servicios (servicios.html)
# Ruta: /servicios
@app.route('/servicios')
def servicios():
    # Asegúrate de que servicios.html se encuentra en la carpeta 'templates'
    return render_template('servicios.html')
    
# Función para la página de contacto (contacto.html)
# Ruta: /contacto
@app.route('/contacto')
def contacto():
    # Asegúrate de que contacto.html se encuentra en la carpeta 'templates'
    return render_template('contacto.html')

if __name__ == '__main__':
    # ----------------------------------------------------------------------
    # ¡CAMBIO IMPORTANTE! 
    # 'host='0.0.0.0'' permite conexiones externas, como tu celular.
    # ----------------------------------------------------------------------
    app.run(host='0.0.0.0', port=5000, debug=True)
