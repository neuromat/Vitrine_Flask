# routes/social_impact.py

import pandas as pd
from pathlib import Path
from flask import Blueprint, jsonify

social_impact_bp = Blueprint("social_impact", __name__)


# -----------------------------
# Formatação acessível de número
# -----------------------------
def format_number(n):
    """Formata número inteiro com separador de milhar brasileiro."""
    return f"{int(n):,}".replace(",", ".")


# -----------------------------
# Lógica de cálculo altmetrics
# -----------------------------
def gerar_resumo_altmetrics():

    df = pd.read_csv(
        "data/df_altmetric.csv",
        delimiter=";",
        on_bad_lines="skip"
    )

    def sanitize(col):
        return col.apply(
            lambda x: float(x)
            if isinstance(x, (int, float)) or len(str(x)) <= 20
            else 0.0
        ).fillna(0.0)

    readers = sanitize(df["readers_count"]).sum()
    tweeters = sanitize(df["cited_by_tweeters_count"]).sum()
    rdts = sanitize(df["cited_by_rdts"]).sum()
    news = sanitize(df["cited_by_msm_count"]).sum()
    feeds = sanitize(df["cited_by_feeds_count"]).sum()
    accounts = sanitize(df["cited_by_accounts_count"]).sum()
    fbwalls = sanitize(df["cited_by_fbwalls_count"]).sum()
    gplus = sanitize(df["cited_by_gplus_count"]).sum()
    videos = sanitize(df["cited_by_videos_count"]).sum()
    wikipedia = sanitize(df["cited_by_wikipedia_count"]).sum()
    doi_score = sanitize(df["doi_score"]).sum()

    # -----------------------------
    # Lê HTML externo
    # -----------------------------
    path = Path("static/content/social_impact/resumo.html")

    if not path.exists():
        return "<p>Arquivo de resumo não encontrado.</p>"

    html = path.read_text(encoding="utf-8")

    # -----------------------------
    # Substitui placeholders
    # -----------------------------
    html = html.replace("{{doi_score}}", format_number(doi_score))
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