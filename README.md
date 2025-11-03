Atelier: Création d'une Application NestJS Manuellement (sans Nest CLI)

Ce dépôt contient une application NestJS minimale montée manuellement, sans utiliser Nest CLI.

## Prérequis
- Node.js >= 20 recommandé (Express 5 et certaines libs exigent Node >= 18/20)
- npm

## Installation
```bash
npm install
```

## Démarrage en développement
```bash
npm run start
```

Cela lance `ts-node` sur `src/main.ts`.

## Structure du projet
- `src/`
  - `main.ts`: bootstrap de l'application
  - `app.module.ts`: module racine
  - `app.controller.ts`: contrôleur de test
- `tsconfig.json`: configuration TypeScript (decorators activés)
- `package.json`: scripts et dépendances
- `.gitignore`: exclusions git (node, build, etc.)
- `docs/commit-conventions.md`: guide des messages de commit

## Guide des commits
Voir `docs/commit-conventions.md` pour les types: `feat`, `fix`, `refactor`, `chore`, `test`, `docs`.

## Notes
- Projet basé sur `@nestjs/core` et `@nestjs/platform-express` v11.

