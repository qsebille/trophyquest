# Image Uploader

Ce module est une application Python conçue pour être exécutée sous forme de fonction **AWS Lambda**. Elle a pour rôle
de récupérer les images (avatars de joueurs, icônes de trophées, images de jeux via IGDB, etc.) non encore téléchargées
depuis des sources externes et de les envoyer vers un bucket **Amazon S3**.

Le statut de chaque image est géré dans une base de données **PostgreSQL**.

## Fonctionnalités

- Récupération d'images depuis des URLs externes.
- Upload parallélisé vers S3 via `ThreadPoolExecutor`.
- Support de plusieurs types d'images :
    - Avatars de joueurs
    - Icônes de trophées
    - Suites de trophées
    - Images de jeux (générales et via IGDB)
- Gestion des limites de traitement par type d'image via l'événement d'appel de la Lambda.

## Prérequis

- Python 3.12+ (recommandé)
- Accès à une base de données PostgreSQL.
- Un bucket Amazon S3 configuré.
- Identifiants AWS configurés (IAM role pour Lambda ou variables d'environnement en local).

## Installation

```bash
pip install -r requirements.txt
```

## Configuration (Variables d'environnement)

Le module utilise les variables d'environnement suivantes (peuvent être définies dans un fichier `.env` pour le
développement local) :

- `POSTGRES_HOST` : Hôte de la base de données PostgreSQL.
- `POSTGRES_PORT` : Port de la base de données.
- `POSTGRES_DATABASE` : Nom de la base de données.
- `POSTGRES_USER` : Utilisateur PostgreSQL.
- `POSTGRES_PASSWORD` : Mot de passe PostgreSQL.
- `IMAGES_BUCKET_NAME` : Nom du bucket S3 de destination.
- `IMAGES_MAX_WORKERS` (optionnel) : Nombre maximum de threads pour l'upload (par défaut `16`).

## Utilisation

### En tant que AWS Lambda

Le handler principal est situé dans `handler.py` (`image_uploader_handler`).

L'événement (`event`) passé à la Lambda peut contenir des limites optionnelles pour chaque type de traitement :

```json
{
  "game_image_limit": 20,
  "player_avatar_limit": 20,
  "trophy_icon_limit": 20,
  "trophy_suite_image_limit": 20,
  "igdb_image_limit": 20
}
```

Par défaut, chaque limite est fixée à `20` si non spécifiée.

### Exécution locale

Vous pouvez appeler `run_image_uploader` directement depuis `src/run.py` en fournissant les limites souhaitées.

## Structure du projet

- `handler.py` : Point d'entrée pour AWS Lambda.
- `src/run.py` : Logique principale de coordination des fetchers et des uploaders.
- `src/game/`, `src/player/`, etc. : Modules spécifiques à chaque type d'entité pour la récupération des données et l'
  upload.
- `src/postgres/` : Gestion de la connexion à la base de données.
- `src/utils/` : Utilitaires (notamment pour S3).
