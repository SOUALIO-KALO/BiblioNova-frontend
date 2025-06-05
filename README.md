# Biblio Nova - Frontend

## Description

Biblio Nova est une application web moderne de gestion de bibliothèque développée avec React, TypeScript et Vite.

## Technologies Utilisées

- React 18
- TypeScript
- Vite
- Redux Toolkit pour la gestion d'état
- React Router pour la navigation
- Tailwind CSS pour le styling
- React Toastify pour les notifications

## Fonctionnalités Principales

### 1. Authentification et Gestion des Utilisateurs

- Système d'authentification complet (login/register)
- Gestion des profils utilisateurs
- Protection des routes
- Gestion des tokens JWT

### 2. Interface Utilisateur

- Design responsive avec Tailwind CSS
- Header avec navigation
- Footer
- Notifications toast pour le feedback utilisateur
- Layout flexible et adaptatif

### 3. Architecture

- Structure modulaire avec séparation des composants
- Gestion d'état centralisée avec Redux
- Routing dynamique avec React Router
- Types TypeScript pour une meilleure maintenabilité

### 4. Composants Principaux

- Header : Navigation principale
- Footer : Informations de bas de page
- Système de routing avec Outlet pour le rendu des pages
- Composants réutilisables dans le dossier components/

### 5. Gestion d'État

- Store Redux pour la gestion globale de l'état
- Slices Redux pour différentes fonctionnalités
- Gestion de l'authentification avec authSlice

## Installation

```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm run dev

# Build pour la production
npm run build
```

## Structure du Projet

```
frontend/
├── src/
│   ├── components/     # Composants React réutilisables
│   ├── redux/         # Configuration Redux et slices
│   ├── types/         # Types TypeScript
│   ├── assets/        # Ressources statiques
│   ├── lib/           # Utilitaires et helpers
│   └── App.tsx        # Composant racine
```

## Configuration ESLint

Le projet utilise une configuration ESLint avancée pour assurer la qualité du code :

- Règles TypeScript strictes
- Règles React spécifiques
- Vérification des types en temps réel

## Développement

Pour contribuer au projet :

1. Assurez-vous d'avoir Node.js installé
2. Clonez le repository
3. Installez les dépendances avec `npm install`
4. Lancez le serveur de développement avec `npm run dev`

## Production

Pour déployer en production :

1. Exécutez `npm run build`
2. Les fichiers optimisés seront générés dans le dossier `dist/`
