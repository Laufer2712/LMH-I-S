from flask import Flask, render_template

# Creamos la instancia de Flask. 
# Importante: No es necesario especificar template_folder si está
# en la raíz junto a app.py. Pero si está anidado, ayuda a Flask a encontrarlo.
# En este caso, asumimos que templates/ está en la misma carpeta que app.py.
app = Flask(__name__)

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
