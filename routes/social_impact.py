# routes/social_impact.py

import pandas as pd
import requests
from flask import Blueprint, jsonify

social_impact_bp = Blueprint('social_impact', __name__)

def gerar_resumo_altmetrics():
    df = pd.read_csv("data/df_altmetric.csv", delimiter=';', on_bad_lines='skip')

    def sanitize(col):
        return col.apply(lambda x: float(x) if isinstance(x, (int, float)) or len(str(x)) <= 20 else 0.0).fillna(0.0)

    readers = sanitize(df['readers_count'])
    tweeters = sanitize(df['cited_by_tweeters_count'])
    rdts = sanitize(df['cited_by_rdts'])
    news_count = sanitize(df['cited_by_msm_count'])
    feeds = sanitize(df['cited_by_feeds_count'])
    accounts = sanitize(df['cited_by_accounts_count'])
    fbwalls = sanitize(df['cited_by_fbwalls_count'])
    gplus = sanitize(df['cited_by_gplus_count'])
    videos = sanitize(df['cited_by_videos_count'])
    wikipedia = sanitize(df['cited_by_wikipedia_count'])
    doi_score = sanitize(df['doi_score'])

    resumo = f"""
    <p class="justify">
    As métricas alternativas, do inglês altmetrics, são definidas como o indicador de medidas de impacto de uma pesquisa, utilizando como base a atividade online.
    </p>
    <p class="justify">
    Até hoje, as pesquisas realizadas pela rede de pesquisadores do CEPID NeuroMat possuem o Altmetric Score total de <strong>{doi_score.sum():.2f}</strong>.
    Este score é composto por <strong>{int(readers.sum())}</strong> leitores (Mendeley, CiteULike, Connotea), 
    {int(tweeters.sum())} menções no Twitter, {int(rdts.sum())} no Reddit, {int(news_count.sum())} em sites de notícias, 
    {int(feeds.sum())} em blogs, {int(accounts.sum())} perfis de dados, {int(fbwalls.sum())} em páginas do Facebook, 
    {int(gplus.sum())} no Google+, {int(videos.sum())} em sites de vídeo.
    </p>
    <p class="justify">
    Há também {int(wikipedia.sum())} artigos na Wikipédia que fazem uso da produção científica do NeuroMat.
    </p>
    """

    # ---- NOVO BLOCO: impacto altmétrico do artigo específico ----
    url_api = "https://api.altmetric.com/v1/doi/10.1007/S10955-013-0733-9"
    try:
        response = requests.get(url_api)
        if response.status_code == 200:
            dados_api = response.json()
            titulo = dados_api.get("title", "Título não disponível")
            autores = dados_api.get("authors", [])
            tipo_producao = dados_api.get("type", "Tipo não disponível")
            local_publicacao = dados_api.get("journal", "Local de publicação não disponível")
            score = dados_api.get("score", "Score não disponível")
            posts = dados_api.get("cited_by_posts_count", "Menções em postagens não disponíveis")
            accounts = dados_api.get("cited_by_accounts_count", "Menções em contas não disponíveis")
            wikipedia = dados_api.get("cited_by_wikipedia_count", "Menções em wikis não disponíveis")

            resumo += f"""
            <h3>Impacto altmétrico do NeuroMat</h3>
            <p class="justify">
            O artigo '<em>{titulo}</em>', publicado no <strong>{local_publicacao}</strong>, é a produção científica do tipo <strong>{tipo_producao.lower()}</strong> de maior impacto social no NeuroMat.
            Com um <strong>Altmetric Attention Score</strong> de <strong>{score}</strong>, este trabalho foi produzido por {', '.join(autores) if autores else 'autores não disponíveis'}.
            Ele possui <strong>{posts}</strong> citações em posts de blogs, <strong>{accounts}</strong> contas distintas o mencionaram e <strong>{wikipedia}</strong> páginas da Wikipédia fazem referência ao artigo.
            </p>
            """
        else:
            resumo += "<p>Não foi possível acessar os dados altmétricos do artigo em destaque no momento.</p>"
    except Exception as e:
        resumo += f"<p>Erro ao consultar Altmetric: {e}</p>"

    return resumo

@social_impact_bp.route("/api/social-impact")
def social_impact_api():
    return jsonify({"html": gerar_resumo_altmetrics()})
