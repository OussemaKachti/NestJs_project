# 📮 Requêtes Postman pour tester l'API NestJS

## 🚀 Configuration de base
- **Base URL**: `http://localhost:3000`
- **Content-Type**: `application/json` (pour POST/PUT)

---

## 📋 1. CRUD Basique (UsersController)

### 1.1 Créer un utilisateur
```http
POST http://localhost:3000/users
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### 1.2 Récupérer tous les utilisateurs
```http
GET http://localhost:3000/users
```

### 1.3 Récupérer un utilisateur par ID
```http
GET http://localhost:3000/users/{id}
```
**Exemple**: `GET http://localhost:3000/users/507f1f77bcf86cd799439011`

### 1.4 Récupérer un utilisateur par email
```http
GET http://localhost:3000/users/email/john@example.com
```

### 1.5 Récupérer les utilisateurs actifs
```http
GET http://localhost:3000/users/active
```

### 1.6 Mettre à jour un utilisateur
```http
PATCH http://localhost:3000/users/{id}
Content-Type: application/json

{
  "email": "john.updated@example.com",
  "role": "admin",
  "active": true
}
```

### 1.7 Activer un utilisateur
```http
POST http://localhost:3000/users/{id}/activate
Content-Type: application/json

{
  "password": "password123"
}
```

### 1.8 Supprimer un utilisateur
```http
DELETE http://localhost:3000/users/{id}
```

---

## 🔐 2. Endpoints avec Intercepteur (Admin & Client)

### 2.1 Admin - Liste complète (tous les champs)
```http
GET http://localhost:3000/admin/users
```
**Résultat attendu**: `id`, `email`, `role`, `createdAt`, `updatedAt`

### 2.2 Client - Liste restreinte (champs limités)
```http
GET http://localhost:3000/client/users
```
**Résultat attendu**: `id`, `email` uniquement

### 2.3 Avec header role (alternative)
```http
GET http://localhost:3000/users
Header: role: admin
```

```http
GET http://localhost:3000/users
Header: role: client
```

---

## 🔍 3. Requêtes Avancées - Récupération (AdvancedController)

### 3.1 Exclure des champs sensibles
```http
GET http://localhost:3000/users/advanced/exclude-sensitive?excludeEmail=true&excludeRole=false
```

### 3.2 Utilisateurs non mis à jour depuis 6 mois
```http
GET http://localhost:3000/users/advanced/not-updated-6months
```

### 3.3 Utilisateurs par domaine d'email
```http
GET http://localhost:3000/users/advanced/domain/example.com
```

### 3.4 Utilisateurs créés dans les 7 derniers jours
```http
GET http://localhost:3000/users/advanced/created-last-7days
```

---

## 📊 4. Requêtes Statistiques

### 4.1 Compter les utilisateurs par rôle
```http
GET http://localhost:3000/users/advanced/stats/count-by-role
```
**Résultat attendu**: `{ "admin": 5, "client": 10 }`

### 4.2 Utilisateurs créés entre deux dates
```http
GET http://localhost:3000/users/advanced/stats/between-dates?date1=2024-01-01&date2=2024-12-31
```

### 4.3 Utilisateurs les plus récents
```http
GET http://localhost:3000/users/advanced/stats/most-recent?limit=5
```

### 4.4 Moyenne des jours entre création et mise à jour
```http
GET http://localhost:3000/users/advanced/stats/avg-days-between
```
**Résultat attendu**: `{ "averageDays": 15.5 }`

---

## 📄 5. Pagination et Tri

### 5.1 Pagination
```http
GET http://localhost:3000/users/advanced/paginated?page=1&limit=10
```
**Résultat attendu**: 
```json
{
  "data": [...],
  "total": 50,
  "page": 1,
  "limit": 10
}
```

### 5.2 Tri par createdAt DESC
```http
GET http://localhost:3000/users/advanced/sorted/created-desc
```

### 5.3 Tri multi-critères (role puis createdAt)
```http
GET http://localhost:3000/users/advanced/sorted/multi-criteria
```

---

## ✏️ 6. Manipulation des Données

### 6.1 Créer un utilisateur avec vérification de doublon
```http
POST http://localhost:3000/users/advanced/create-with-check
Content-Type: application/json

{
  "email": "newuser@example.com",
  "role": "client"
}
```

### 6.2 Mettre à jour avec journalisation
```http
PUT http://localhost:3000/users/advanced/{id}/update-with-logging
Content-Type: application/json

{
  "email": "updated@example.com",
  "role": "admin",
  "active": true
}
```
**Résultat attendu**: 
```json
{
  "user": {...},
  "changes": {
    "email": { "old": "...", "new": "..." },
    "role": { "old": "...", "new": "..." }
  }
}
```

### 6.3 Désactiver les comptes inactifs depuis plus d'un an
```http
PUT http://localhost:3000/users/advanced/disable-inactive-year
```
**Résultat attendu**: 
```json
{
  "count": 3,
  "users": [...]
}
```

### 6.4 Mise à jour en masse du rôle par domaine
```http
PUT http://localhost:3000/users/advanced/bulk-update-role-by-domain
Content-Type: application/json

{
  "domain": "example.com",
  "newRole": "admin"
}
```
**Résultat attendu**: 
```json
{
  "count": 5,
  "users": [...]
}
```

---

## 🧪 7. Scénarios de Test Complets

### Scénario 1 : Créer et tester un utilisateur admin
```http
# 1. Créer un utilisateur
POST http://localhost:3000/users/advanced/create-with-check
Content-Type: application/json
{
  "email": "admin@test.com",
  "role": "admin"
}

# 2. Vérifier via endpoint admin (tous les champs)
GET http://localhost:3000/admin/users

# 3. Vérifier via endpoint client (champs limités)
GET http://localhost:3000/client/users
```

### Scénario 2 : Statistiques et pagination
```http
# 1. Créer plusieurs utilisateurs avec différents rôles
POST http://localhost:3000/users/advanced/create-with-check
{ "email": "user1@test.com", "role": "admin" }
POST http://localhost:3000/users/advanced/create-with-check
{ "email": "user2@test.com", "role": "client" }
POST http://localhost:3000/users/advanced/create-with-check
{ "email": "user3@test.com", "role": "client" }

# 2. Compter par rôle
GET http://localhost:3000/users/advanced/stats/count-by-role

# 3. Paginer les résultats
GET http://localhost:3000/users/advanced/paginated?page=1&limit=2
```

### Scénario 3 : Mise à jour avec journalisation
```http
# 1. Créer un utilisateur
POST http://localhost:3000/users/advanced/create-with-check
{ "email": "test@example.com", "role": "client" }

# 2. Mettre à jour avec journalisation
PUT http://localhost:3000/users/advanced/{id}/update-with-logging
{
  "email": "updated@example.com",
  "role": "admin"
}
```

---

## 📝 Notes Importantes

1. **MongoDB doit être démarré** : Assurez-vous que MongoDB est en cours d'exécution sur `localhost:27017`

2. **IDs MongoDB** : Les IDs sont des ObjectId MongoDB (ex: `507f1f77bcf86cd799439011`). Récupérez-les depuis les réponses des requêtes POST.

3. **Intercepteur** : L'intercepteur filtre automatiquement les champs selon le chemin :
   - `/admin/users` → Tous les champs
   - `/client/users` → Seulement `id` et `email`

4. **Dates** : Pour les requêtes de dates, utilisez le format ISO (ex: `2024-01-01`)

5. **Erreurs courantes** :
   - **409 Conflict** : Email déjà existant (doublon)
   - **404 Not Found** : Utilisateur introuvable
   - **400 Bad Request** : Données invalides

---

## 🎯 Collection Postman

Pour importer dans Postman, créez une collection avec ces requêtes organisées par dossiers :
- `1. CRUD Basique`
- `2. Admin & Client (Intercepteur)`
- `3. Requêtes Avancées`
- `4. Statistiques`
- `5. Pagination & Tri`
- `6. Manipulation des Données`


