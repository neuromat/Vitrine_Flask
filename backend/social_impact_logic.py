import pandas as pd
from pathlib import Path


def format_number_br(valor: int) -> str:
    """Formata número inteiro no padrão brasileiro: 1234 → 1.234."""
    return f"{int(valor):,}".replace(",", ".")


def format_decimal_br(valor: float) -> str:
    """Formata número decimal no padrão brasileiro: 4448.80 → 4.448,80."""
    return f"{valor:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")


def gerar_resumo_altmetrics(csv_path: str) -> str:
    path = Path(csv_path)

    if not path.exists():
        raise FileNotFoundError(f"Arquivo não encontrado: {csv_path}")

    df = pd.read_csv(path, delimiter=";", on_bad_lines="skip")

    colunas = [
        "doi_score",
        "readers_count",
        "cited_by_tweeters_count",
        "cited_by_rdts",
        "cited_by_msm_count",
        "cited_by_feeds_count",
        "cited_by_accounts_count",
        "cited_by_fbwalls_count",
        "cited_by_gplus_count",
        "cited_by_videos_count",
        "cited_by_wikipedia_count",
    ]

    for coluna in colunas:
        if coluna not in df.columns:
            df[coluna] = 0.0

        df[coluna] = pd.to_numeric(
            df[coluna],
            errors="coerce"
        ).fillna(0.0)

    score = df["doi_score"].sum()
    readers = df["readers_count"].sum()
    tweeters = df["cited_by_tweeters_count"].sum()
    rdts = df["cited_by_rdts"].sum()
    news = df["cited_by_msm_count"].sum()
    feeds = df["cited_by_feeds_count"].sum()
    accounts = df["cited_by_accounts_count"].sum()
    fbwalls = df["cited_by_fbwalls_count"].sum()
    gplus = df["cited_by_gplus_count"].sum()
    videos = df["cited_by_videos_count"].sum()
    wiki = df["cited_by_wikipedia_count"].sum()

    paragrafo = " ".join([
        "As métricas alternativas, do inglês altmetrics, são definidas como o indicador de medidas de impacto de uma pesquisa, utilizando como base a atividade online.",
        f"Até hoje, as pesquisas realizadas pela rede de pesquisadores do CEPID NeuroMat possuem o Altmetric Score total de {format_decimal_br(score)}.",
        f"Este score é composto por {format_number_br(readers)} leitores — através das plataformas Mendeley, CiteULike e Connotea,",
        f"{format_number_br(tweeters)} menções no Twitter, {format_number_br(rdts)} no Reddit, {format_number_br(news)} em sites de notícias,",
        f"{format_number_br(feeds)} em blogs (acadêmicos e gerais), {format_number_br(accounts)} perfis de fontes, {format_number_br(fbwalls)} páginas do Facebook,",
        f"{format_number_br(gplus)} no Google+, {format_number_br(videos)} em sites de vídeo.",
        f"Há também {format_number_br(wiki)} artigos na Wikipédia que fazem uso da produção científica do NeuroMat."
    ])

    return paragrafo