from flask import Flask
from flask_cors import CORS
from routes.market_insight_route import market_insights_bp  # Import Market Insights Blueprint

app = Flask(__name__)

# Enable CORS for frontend communication
CORS(app)

# Register Blueprints for modular API structure
app.register_blueprint(market_insights_bp, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True)
