# routes/researchers_stats.py

from flask import Blueprint, jsonify
from backend.researchers_stats_logic import get_bolsas_stats


researchers_stats_bp = Blueprint(
    'researchers_stats',
    __name__
)


@researchers_stats_bp.route(
    '/api/researchers-stats'
)
def researchers_stats():

    dados = get_bolsas_stats()

    return jsonify(dados)