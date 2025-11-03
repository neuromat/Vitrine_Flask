from flask import Flask, render_template
from routes.social_impact import social_impact_bp  # Importa o Blueprint

app = Flask(__name__)

# Registra o Blueprint da seção Impacto Social
app.register_blueprint(social_impact_bp)

@app.route('/')
def home():
    # Adição de atributos de WAI-ARIA para melhorar acessebilidade
    # Passa a variável 'current_page' para o template.
    # Esta variável define o item do menu ativo na carga inicial da página
    # (neste caso, 'featured' corresponde à âncora '#featured').
    return render_template('index.html', current_page='featured')

if __name__ == '__main__':
    app.run(debug=True)