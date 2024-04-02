from flask import Flask, request, jsonify
from rasa.core.agent import Agent

# Importation du module CORS depuis la bibliothèque flask_cors pour gérer les requêtes Cross-Origin Resource Sharing (CORS).
from flask_cors import CORS

# Création d'une application Flask.
app = Flask(__name__)

# Activation du support CORS pour l'application Flask, permettant à l'API d'accepter des requêtes depuis différents domaines.
CORS(app, resources={r"/webhooks/*": {"origins": "*"}}, supports_credentials=True)

# Chargement de mon modèle Rasa
agent = Agent.load("C:/Users/Hp/Desktop/finally/models/20240402-214631-obnoxious-return.tar.gz", action_endpoint=None)

# Définition d'une route pour l'API qui permet de recevoir des requêtes POST contenant des données JSON.
@app.route("/predict", methods=["POST"])
def predict():
    # Extraction des données JSON de la requête.
    data = request.json
    # Utilisation de l'agent Rasa pour gérer le texte de la requête et obtenir une réponse.
    response = agent.handle_text(data["message"])
    # Retourne la réponse sous forme de JSON.
    return jsonify(response)

# Point d'entrée pour exécuter l'application Flask en mode debug.
if __name__ == "__main__":
    app.run(debug=True)
