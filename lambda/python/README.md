# TrophyQuest IGDB Enricher

A Python-based AWS Lambda function that enriches the TrophyQuest database by matching PlayStation (PSN) games with
entries from the [IGDB (Internet Game Database)](https://www.igdb.com/).

## Overview

The IGDB Enricher automates the process of finding corresponding IGDB metadata for games currently in the TrophyQuest
system that lack such mapping. It retrieves unmapped games from a PostgreSQL database, queries the IGDB API for
potential matches, calculates a similarity score for each candidate, and persists the data back to the database for
further processing or manual verification.

## Workflow

1. **Fetch Unmapped Games**: Selects a batch of games from `app.psn_game` that do not yet have entries in
   `app.igdb_candidate`.
2. **IGDB Search**: For each game, it queries the IGDB API using the game title, filtered for PlayStation platforms (
   PS3, PS4, PS5) and specific game types (Main Game, Remake, Remaster, etc.).
3. **Candidate Scoring**: Computes a similarity score (0-100) between the PSN game title and the IGDB candidate name
   using an F1-based token similarity algorithm.
4. **Data Persistence**:
    * Inserts new IGDB games, companies, and collections into their respective tables.
    * Creates candidate mappings in `app.igdb_candidate` with a `PENDING` status.

## Prerequisites

* Python 3.x
* A PostgreSQL database with the TrophyQuest schema.
* Twitch Developer credentials (Client ID and Client Secret) to access the IGDB API.

## Configuration

The application requires the following environment variables (which can be provided in a `.env` file for local
development):

| Variable | Description |
| :--- | :--- |
| `TWITCH_CLIENT_ID` | Your Twitch Developer Client ID. |
| `TWITCH_CLIENT_SECRET` | Your Twitch Developer Client Secret. |
| `POSTGRES_HOST` | PostgreSQL database host. |
| `POSTGRES_PORT` | PostgreSQL database port. |
| `POSTGRES_DATABASE` | PostgreSQL database name. |
| `POSTGRES_USER` | PostgreSQL username. |
| `POSTGRES_PASSWORD` | PostgreSQL password. |

## Installation & Setup

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Local Execution**:
   You can run the enricher locally by executing the main script:
   ```bash
   python -m igdb_enricher.main
   ```

## AWS Lambda Usage

When deployed as an AWS Lambda function, the entry point is `lambda_function.lambda_handler`.

### Event Payload

The Lambda function accepts an optional `limit` parameter in its event payload to control the number of games processed
per execution:

```json
{
  "limit": 50
}
```

*Default limit is 20 if not specified.*

## Project Structure

* `src/igdb_enricher/main.py`: Main orchestration logic.
* `src/igdb_enricher/client/`: IGDB API client and token management.
* `src/igdb_enricher/postgres/`: Database connection and query logic.
* `src/igdb_enricher/candidate/`: Similarity scoring and candidate formatting.
* `src/igdb_enricher/app/`: Logic for building data structures for database insertion.
* `lambda_function.py`: AWS Lambda handler.
