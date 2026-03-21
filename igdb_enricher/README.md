# IGDB Enricher

Ce module est une application Python conçue pour être exécutée sous forme de fonction **AWS Lambda**. Elle a pour rôle
d'enrichir les jeux PSN de la base de données avec des informations provenant de **IGDB** via l'API **Twitch**.

Le statut de chaque jeu est géré dans une base de données **PostgreSQL**.

## Fonctionnalités

- Récupération des jeux PSN en attente d'enrichissement.
- Recherche de correspondances sur IGDB.
- Calcul de score de similarité pour trouver le meilleur candidat.
- Mise à jour de la base de données avec les IDs IGDB et les métadonnées (images, compagnies, etc.).

## Prérequis

- Python 3.12+
- Accès à une base de données PostgreSQL.
- Un Client ID et un Client Secret Twitch (pour l'API IGDB).

## Installation

```bash
pip install -r requirements.txt
```

## Configuration (Variables d'environnement)

Le module utilise les variables d'environnement suivantes :

- `POSTGRES_HOST` : Hôte de la base de données PostgreSQL.
- `POSTGRES_PORT` : Port de la base de données.
- `POSTGRES_DATABASE` : Nom de la base de données.
- `POSTGRES_USER` : Utilisateur PostgreSQL.
- `POSTGRES_PASSWORD` : Mot de passe PostgreSQL.
- `TWITCH_CLIENT_ID` : Client ID Twitch.
- `TWITCH_CLIENT_SECRET` : Client Secret Twitch.

## Utilisation

### En tant que AWS Lambda

Le handler principal est situé dans `handler.py` (`igdb_enricher_handler`).

L'événement (`event`) passé à la Lambda peut contenir une limite optionnelle :

```json
{
  "limit": 50
}
```

Par défaut, la limite est fixée à `20` si non spécifiée.

### Exécution locale

Vous pouvez appeler `run_enricher` directement depuis `src/run.py`.

## Structure du projet

- `handler.py` : Point d'entrée pour AWS Lambda.
- `src/igdb_enricher/run.py` : Logique principale de coordination.
- `src/igdb_enricher/candidate/` : Logique de recherche et de scoring des candidats IGDB.
- `src/igdb_enricher/igdb/` : Client API IGDB.
- `src/igdb_enricher/postgres/` : Gestion de la base de données.
