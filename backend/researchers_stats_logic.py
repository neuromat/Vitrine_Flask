# backend/researchers_stats_logic.py

import pandas as pd
import os


def get_bolsas_stats():

    caminho_csv = os.path.join(
        "data",
        "bolsasFapesp.csv"
    )

    df = pd.read_csv(
        caminho_csv,
        sep=";",
        encoding="utf-8"
    )

    df.columns = (
        df.columns
        .str.strip()
    )

    df["modalidade"] = (
        df["modalidade"]
        .fillna("")
        .astype(str)
        .str.strip()
    )

    modalidades = {
        "BP.IC": "iniciacao_cientifica",
        "BP.MS": "mestrado",
        "BP.DR": "doutorado",
        "BP.DD": "doutorado_direto",
        "BP.PD": "pos_doutorado",
        "BP.TT": "treinamento_tecnico",
        "BP.JC": "jornalismo_cientifico",
        "BE.PQ": "pesquisa_exterior"
    }

    resultado = {
        "total": len(df),
        "iniciacao_cientifica": 0,
        "mestrado": 0,
        "doutorado": 0,
        "doutorado_direto": 0,
        "pos_doutorado": 0,
        "treinamento_tecnico": 0,
        "jornalismo_cientifico": 0,
        "pesquisa_exterior": 0
    }

    for codigo, nome in modalidades.items():

        resultado[nome] = int(
            df["modalidade"]
            .eq(codigo)
            .sum()
        )

    return resultado