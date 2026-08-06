# routes/social_impact.py

import pandas as pd
from pathlib import Path
from flask import Blueprint, jsonify
from pathlib import Path

social_impact_bp = Blueprint("social_impact", __name__)


# -----------------------------
# Formatação de números
# -----------------------------
def format_number(n):
    """Formata número inteiro no padrão brasileiro: 8966 → 8.966."""
    return f"{int(n):,}".replace(",", ".")


def format_decimal_br(n):
    """Formata número decimal no padrão brasileiro: 4448.80 → 4.448,80."""
    return f"{n:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")


# -----------------------------
# Lógica de cálculo altmetrics
# -----------------------------
BASE_DIR = Path(__file__).resolve().parent.parent
CAMINHO_CSV = BASE_DIR / "data" / "df_altmetric.csv"
def gerar_resumo_altmetrics():
    df = pd.read_csv(
        CAMINHO_CSV,
        delimiter=";",
        on_bad_lines="skip"
    )

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
    wikipedia = df["cited_by_wikipedia_count"].sum()

    path = Path("static/content/social_impact/resumo.html")

    if not path.exists():
        return "<p>Arquivo de resumo não encontrado.</p>"

    html = path.read_text(encoding="utf-8")

    html = html.replace("{{doi_score}}", format_decimal_br(score))
    html = html.replace("{{readers}}", format_number(readers))
    html = html.replace("{{tweeters}}", format_number(tweeters))
    html = html.replace("{{rdts}}", format_number(rdts))
    html = html.replace("{{news}}", format_number(news))
    html = html.replace("{{feeds}}", format_number(feeds))
    html = html.replace("{{accounts}}", format_number(accounts))
    html = html.replace("{{fbwalls}}", format_number(fbwalls))
    html = html.replace("{{gplus}}", format_number(gplus))
    html = html.replace("{{videos}}", format_number(videos))
    html = html.replace("{{wikipedia}}", format_number(wikipedia))

    return html


# -----------------------------
# API
# -----------------------------
@social_impact_bp.route("/api/social-impact")
def social_impact_api():
    html = gerar_resumo_altmetrics()

    return jsonify({
        "html": html
    })