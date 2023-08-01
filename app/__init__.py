# app/__init__.py
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Assuming your MongoDB is running on the default host and port (localhost:27017)
from . import db
from . import routes

if __name__ == "__main__":
    app.run(debug=True)
