import os
import requests

API_KEY = os.getenv("GOV_API_KEY")
BASE_URL = "https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24"

def fetch_market_data(state, district, commodity=None):
    """Fetch market insights based on filters"""

    params = {
        "api-key": API_KEY,
        "format": "json",
        "limit": 20,
        "filters[State.keyword]": state,
        "filters[District.keyword]": district
    }

    if commodity:
        params["filters[Commodity.keyword]"] = commodity

    response = requests.get(BASE_URL, params=params)
    return response.json() if response.status_code == 200 else {"error": "Failed to fetch data"}