# TrophyQuest Backend

Backend web service for the "TrophyQuest" project. This service manages PlayStation Network (PSN) trophy data, player
statistics, and game information, integrating with IGDB for enhanced game metadata.

## 🚀 Tech Stack

- **Java 17**
- **Spring Boot 3.5.7**
- **Spring Data JPA** with **Hibernate**
- **PostgreSQL**
- **Liquibase** (Database migrations)
- **AWS SDK** (Lambda integration)
- **Lombok**
- **Testcontainers** (For integration tests)

## 📋 Prerequisites

- **JDK 17** or higher
- **Docker** (recommended for running PostgreSQL and tests)
- **Gradle** (included via `./gradlew`)

## ⚙️ Configuration

The application uses Spring profiles for configuration:

- `default`: Base configuration in `application.yaml`
- `local`: Development configuration in `application-local.yaml` (PostgreSQL on localhost)
- `prod`: Production configuration
- `test`: Configuration for running tests

### Database Setup

By default, the `local` profile expects a PostgreSQL database:

- **URL**: `jdbc:postgresql://localhost:5432/trophyquest?currentSchema=app`
- **Username**: `postgres`
- **Password**: `postgres`

Migrations are handled automatically by Liquibase on startup.

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-repo/trophyquest-backend.git
cd trophyquest-backend
```

### 2. Build the project

```bash
./gradlew build
```

### 3. Run the application

```bash
./gradlew bootRun --args='--spring.profiles.active=local'
```

## 🔌 API Endpoints

The API is accessible under `/api`. Key controllers include:

- **PlayerController** (`/api/player`): Manage players, search profiles, and fetch stats.
- **GameController** (`/api/game`): Access game information and recently played games.
- **TrophyController** (`/api/trophy`): Global trophy statistics.
- **TrophySuiteController** (`/api/trophy-suite`): Details about trophy lists and earned trophies.
- **IgdbCandidateController** (`/api/igdb-candidate`): Manage mappings between PSN games and IGDB entries.

## 🧪 Testing

Integration tests use **Testcontainers** to spin up a PostgreSQL instance.

```bash
./gradlew test
```

## 📄 License

This project is licensed under the terms of the MIT license (or specify your license).
