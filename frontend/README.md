# TrophyQuest Frontend

This is the frontend application for **TrophyQuest**, built with [Angular](https://angular.io/). It allows users to
track their gaming trophies, view player profiles, and manage trophy suites.

## 🚀 Features

- **Home**: Landing page of the application.
- **Players**: Browse and search for players.
- **Profile**: Detailed view of a player's statistics and trophies.
- **Trophy Suite**: Comprehensive view of earned trophies and game groups.
- **IGDB Mapping**: Tool for validating and mapping game candidates.

## 🛠️ Prerequisites

- **Node.js**: Version 20 or higher is recommended (as used in CI/CD).
- **npm**: Comes with Node.js.

## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd trophyquest-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## 💻 Development

Run `npm start` (or `ng serve`) for a dev server. Navigate to `http://localhost:4200/`. The app will automatically
reload if you change any of the source files.

The application expects a backend API running at `http://localhost:8080` by default (configurable in
`src/environments/environment.ts`).

## 🏗️ Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.
Use `npm run build:prod` for a production build.

## 🧪 Running Tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).
For CI environments, you can use `npm run test:ci` to run tests once in headless Chrome.

## 🚢 Deployment

This project is configured with GitHub Actions to deploy automatically to AWS S3 when changes are pushed to the `main`
branch.

- **Workflow**: `.github/workflows/deploy-to-aws.yaml`
- **Destination**: AWS S3 Bucket

## 📚 Technologies Used

- **Framework**: Angular 20
- **UI Components**: Angular Material, ng-bootstrap
- **Styling**: Bootstrap 5, SCSS
- **Testing**: Jasmine, Karma
- **Deployment**: AWS S3, GitHub Actions
