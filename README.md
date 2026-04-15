# VanLife API

API REST pour la plateforme VanLife, construite avec NestJS et TypeScript.

## À propos

VanLife API fournit une API complète pour gérer les utilisateurs, les véhicules et les réservations de la plateforme VanLife. Le backend offre une authentification cookie-session, une gestion de base de données (sqlite) et une architecture modulaire et scalable.

## Stack technologique

- **NestJS** : Framework backend progressif pour Node.js
- **TypeScript** : Langage de programmation typé
- **TypeORM** : ORM pour la gestion de la base de données
- **Cookie Session** : Authentification
- **ESLint** : Linting et qualité du code

## Fonctionnalités

- **Authentification cookies** : Système d'authentification avec des cookies de session
- **Gestion des utilisateurs** : Inscription, connexion, gestion des profils
- **Gestion des véhicules** : CRUD complet pour les véhicules aménagés
- **Système de réservation** : Gestion des réservations de véhicules
- **Base de données** : Persistance des données avec TypeORM
- **Seeding** : Données initiales pour le développement et les tests
- **Validation** : Validation des données entrantes avec DTOs

## Structure du projet

```
src/
├── auth/                # Module d'authentification
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   └── dtos/           # Data Transfer Objects
├── users/              # Module des utilisateurs
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.module.ts
│   └── dtos/
├── vans/               # Module des véhicules
│   ├── vans.controller.ts
│   ├── vans.service.ts
│   ├── vans.module.ts
│   └── dtos/
├── database/           # Configuration de la base de données
│   ├── database.module.ts
│   └── database.seeder.ts
├── entities/           # Entités TypeORM
│   ├── user.entity.ts
│   ├── van.entity.ts
│   └── index.ts
├── common/             # Utilitaires et code commun
│   ├── constants.ts
│   ├── helpers.ts
│   ├── decorators/
│   ├── guards/
│   ├── interceptors/
│   └── interfaces/
├── app.module.ts       # Module racine
└── main.ts             # Point d'entrée de l'application
```

## Installation et démarrage

### Installation des dépendances

```bash
npm install
```


### Lancer le serveur de développement

```bash
npm run start:dev
```

Le serveur se lancera sur `http://localhost:3000` par défaut.

### Build pour la production

```bash
npm run build
```

### Lancer en production

```bash
npm run start:prod
```

## Tests

### Tests unitaires

```bash
npm run test
```

### Tests e2e (end-to-end)

```bash
npm run test:e2e
```

### Couverture des tests

```bash
npm run test:cov
```

## Linting

```bash
npm run lint
```

## API Endpoints

### Authentification
- `POST /auth/register` - Inscription d'un nouvel utilisateur
- `POST /auth/login` - Connexion d'un utilisateur
- `POST /auth/logout` - Déconnexion d'un utilisateur

### Utilisateurs
- `GET /users` - Récupérer tous les utilisateurs
- `GET /users/:id` - Récupérer un utilisateur spécifique
- `PUT /users/:id` - Mettre à jour un utilisateur
- `DELETE /users/:id` - Supprimer un utilisateur

### Véhicules
- `GET /vans` - Récupérer tous les véhicules
- `GET /vans/:id` - Récupérer un véhicule spécifique
- `POST /vans` - Créer un nouveau véhicule
- `PUT /vans/:id` - Mettre à jour un véhicule
- `DELETE /vans/:id` - Supprimer un véhicule

## Documentation

Pour plus d'informations sur NestJS, consultez la [documentation officielle](https://docs.nestjs.com).

