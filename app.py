from flask import Flask, render_template
from routes.social_impact import social_impact_bp  #Importa o Blueprint

app = Flask(__name__)

#Registra o Blueprint da seção Impacto Social
app.register_blueprint(social_impact_bp)

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
