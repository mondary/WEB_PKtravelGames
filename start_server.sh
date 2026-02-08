#!/bin/bash
# Script pour lancer le serveur local pour PK Travel Games

echo "Lancement du serveur local pour PK Travel Games..."
echo "Ouvrez votre navigateur à l'adresse: http://localhost:8000/web/"

if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m http.server 8000
else
    echo "Python n'est pas disponible. Veuillez installer Python ou utiliser une autre méthode."
fi