# 🎓 Atelier NestJS - CRUD avec Validation et DTOs

Ce dépôt contient une application NestJS complète avec opérations CRUD, validation globale, DTOs et messages de validation personnalisés. Projet académique pour apprendre NestJS manuellement (sans Nest CLI).

## 📋 Objectif

Créer une application NestJS avec :
- ✅ Opérations CRUD complètes
- ✅ Utilisation des décorateurs (`@Get`, `@Post`, `@Put`, `@Delete`, `@Param`, `@Body`, `@Query`, `@Headers`)
- ✅ Validation globale avec `class-validator`
- ✅ DTOs (Data Transfer Objects) avec règles de validation
- ✅ Messages de validation personnalisés

## 🚀 Prérequis
- Node.js >= 20 recommandé (Express 5 et certaines libs exigent Node >= 18/20)
- npm

## 📦 Installation
```bash
npm install
```

## ▶️ Démarrage en développement
```bash
npm run start
```

L'application démarre sur `http://localhost:3000`

## 🏗️ Structure du projet
```
src/
├── main.ts                 # Bootstrap de l'application + validation globale
├── app.module.ts           # Module racine
├── app.controller.ts       # Contrôleur de test
└── users/
    ├── users.module.ts     # Module users
    ├── users.controller.ts # Contrôleur users avec CRUD complet
    └── dto/
        └── create-user.dto.ts # DTO avec validation
```

## 🎯 Endpoints disponibles

### Users API

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/users` | Récupérer tous les utilisateurs (filtrage optionnel via `?status=active`) |
| `GET` | `/users/active/:status` | Récupérer les utilisateurs par statut |
| `GET` | `/users/:id` | Récupérer un utilisateur par ID |
| `POST` | `/users` | Créer un nouvel utilisateur (avec header `authorization`) |
| `PUT` | `/users/:id` | Mettre à jour un utilisateur |
| `DELETE` | `/users/:id` | Supprimer un utilisateur |

### Exemples de requêtes

#### Créer un utilisateur
```bash
POST http://localhost:3000/users
Content-Type: application/json
Authorization: Bearer token123

{
  "username": "John",
  "email": "john@example.com",
  "status": "active"
}
```

#### Récupérer tous les utilisateurs actifs
```bash
GET http://localhost:3000/users?status=active
```

#### Mettre à jour un utilisateur
```bash
PUT http://localhost:3000/users/1
Content-Type: application/json

{
  "username": "John Updated",
  "email": "john.updated@example.com"
}
```

## 🔒 Validation

La validation globale est configurée dans `main.ts` avec :
- `whitelist: true` - Supprime les propriétés non autorisées
- `forbidNonWhitelisted: true` - Lance une erreur pour propriétés non autorisées
- `transform: true` - Transforme automatiquement les types

### Messages de validation personnalisés
- `username`: "Le username est obligatoire"
- `email`: "L'email est obligatoire" et "L'email doit être une adresse email valide"

## 🛠️ Technologies utilisées
- **NestJS 11** - Framework Node.js
- **TypeScript 5** - Langage de programmation
- **class-validator** - Validation des DTOs
- **class-transformer** - Transformation des objets
- **Express 5** - Serveur HTTP

## 📚 Guide des commits
Voir `docs/commit-conventions.md` pour les types: `feat`, `fix`, `refactor`, `chore`, `test`, `docs`.

## 📝 Notes
- Projet basé sur `@nestjs/core` et `@nestjs/platform-express` v11
- Données stockées en mémoire (tableau `users`)
- Projet académique pour l'apprentissage de NestJS

