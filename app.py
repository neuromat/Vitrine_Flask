from flask import Flask, render_template
from routes.social_impact import social_impact_bp  # Importa o Blueprint

app = Flask(__name__)

# Registra o Blueprint da seção Impacto Social
app.register_blueprint(social_impact_bp)

@app.route('/')
def home():
    # Adição de atributos de WAI-ARIA para melhorar acessibilidade
    # Passa a variável 'current_page' para o template.
    # Esta variável define o item do menu ativo na carga inicial da página
    # (neste caso, 'featured' corresponde à âncora '#featured').
    return render_template('index.html', current_page='featured')


# --- NOVA ROTA ADICIONADA ---
@app.route('/mapa-do-site')
def sitemap():
    # Renderiza a página do Mapa do Site.
    # Esta página servirá como alternativa de localização (Item 5.7.13 da ABNT NBR 17225)
    return render_template('sitemap.html')


if __name__ == '__main__':
    app.run(debug=True)