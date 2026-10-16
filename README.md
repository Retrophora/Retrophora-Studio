# Retrophora Studio

Premier prototype local de création de brouillons de succès. L'éditeur valide les données (identifiant, adresse, opérateur, points) et exporte un JSON versionné.

Les exports respectent le contrat `retrophora.draft-0.1` interprété par [Retrophora-Engine](https://github.com/Retrophora/Retrophora-Engine/blob/main/docs/DRAFT_FORMAT.md). Un export de référence est testé dans les deux dépôts. Le moteur sait évaluer les conditions sur mémoire simulée, sans connexion à un jeu.

Il n'analyse pas encore la mémoire en temps réel et ne publie aucun succès.

```sh
npm test
python3 -m http.server 8000
```

Ouvrir ensuite `http://localhost:8000`. Aucun compte ni backend nécessaire au prototype. Licence : AGPL-3.0-only.