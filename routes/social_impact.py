import pandas as pd
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
    return resumo

@social_impact_bp.route("/api/social-impact")
def social_impact_api():
    return jsonify({"html": gerar_resumo_altmetrics()})
