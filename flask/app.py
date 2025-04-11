
from flask import Flask
app = Flask(__name__)

@app.route("/")
def home():
<<<<<<< HEAD
    return "Welcome to Flask!"
=======
    return "Welcome to Flask Again!"
>>>>>>> 6609f8bf5cd45c4a961d2fa3531337fa978e1d87

if __name__ == "__main__":
    app.run(debug=True)

