import pandas as pd
from pathlib import Path

def gerar_resumo_altmetrics(csv_path: str) -> str:
    path = Path(csv_path)
    if not path.exists():
        raise FileNotFoundError(f"Arquivo não encontrado: {csv_path}")

    df = pd.read_csv(path, delimiter=';', on_bad_lines='skip')

    # Colunas esperadas no CSV
    colunas = [
        'doi_score', 'readers_count', 'cited_by_tweeters_count',
        'cited_by_rdts', 'cited_by_msm_count', 'cited_by_feeds_count',
        'cited_by_accounts_count', 'cited_by_fbwalls_count',
        'cited_by_gplus_count', 'cited_by_videos_count',
        'cited_by_wikipedia_count'
    ]

    for coluna in colunas:
        df[coluna] = pd.to_numeric(df[coluna], errors='coerce').fillna(0.0)

    # Somatórios
    score = df['doi_score'].sum()
    readers = int(df['readers_count'].sum())
    tweeters = int(df['cited_by_tweeters_count'].sum())
    rdts = int(df['cited_by_rdts'].sum())
    news = int(df['cited_by_msm_count'].sum())
    feeds = int(df['cited_by_feeds_count'].sum())
    accounts = int(df['cited_by_accounts_count'].sum())
    fbwalls = int(df['cited_by_fbwalls_count'].sum())
    gplus = int(df['cited_by_gplus_count'].sum())
    videos = int(df['cited_by_videos_count'].sum())
    wiki = int(df['cited_by_wikipedia_count'].sum())

    paragrafo = " ".join([
        "As métricas alternativas, do inglês altmetrics, são definidas como o indicador de medidas de impacto de uma pesquisa, utilizando como base a atividade online.",
        f"Até hoje, as pesquisas realizadas pela rede de pesquisadores do CEPID NeuroMat possuem o Altmetric Score total de {score:.2f}.",
        f"Este score é composto por {readers} leitores - através das plataformas Mendeley, CiteULike e Connotea,",
        f"{tweeters} menções no Twitter, {rdts} no Reddit, {news} em sites de notícias,",
        f"{feeds} em blogs (acadêmicos e gerais), {accounts} perfis de fontes, {fbwalls} páginas do Facebook,",
        f"{gplus} no Google+, {videos} em sites de vídeo.",
        f"Há também {wiki} artigos na Wikipédia que fazem uso da produção científica do NeuroMat."
    ])

    return paragrafo