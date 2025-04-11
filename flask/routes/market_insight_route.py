from flask import Blueprint, request, jsonify
from services.market_insight_service import fetch_market_data

market_insights_bp = Blueprint("market_insights", __name__)

@market_insights_bp.route("/market-insights", methods=["GET"])
def market_insights():
    """API to fetch real-time market insights"""

    state = request.args.get("state")
    district = request.args.get("district")
    commodity = request.args.get("commodity", None)

    if not state or not district:
        return jsonify({"error": "State and District are required"}), 400

    data = fetch_market_data(state, district, commodity)
    return jsonify(data)