# Retrophora Studio

Premier prototype local de création de brouillons de succès. L'éditeur valide les données (identifiant, adresse, opérateur, points) et exporte un JSON versionné.

Il n'analyse pas encore la mémoire en temps réel et ne publie aucun succès.

```sh
npm test
python3 -m http.server 8000
```

Ouvrir ensuite `http://localhost:8000`. Aucun compte ni backend nécessaire au prototype. Licence : AGPL-3.0-only.