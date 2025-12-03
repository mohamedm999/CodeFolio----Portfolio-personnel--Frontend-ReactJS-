# CodeFolio - Portfolio Personnel

Portfolio professionnel développé avec React + Vite et intégration GraphQL Backend.

## 🚀 First Time Here?

**Start here:** [START_HERE.md](./START_HERE.md) - Quick setup guide

**Having issues?** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Fix common problems

## 🚀 Technologies

- **React 18.3** - Bibliothèque UI
- **Vite** - Build tool rapide
- **TypeScript** - Types statiques
- **Apollo Client** - GraphQL client
- **React Router** - Navigation
- **TailwindCSS** - Styling
- **ESLint** - Linting
- **JWT** - Authentication

## 📋 Prérequis

- Node.js (v18 ou supérieur)
- npm ou yarn
- Backend GraphQL API running on http://localhost:4000/graphql

## 🛠️ Installation

```bash
# Cloner le repository
git clone <your-repo-url>

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos configurations

# Lancer le serveur de développement
npm run dev

# Build production
npm run build

# Preview du build
npm run preview
```

## 📁 Structure du projet

```
CodeFolio/
├── src/
│   ├── apollo/              # Apollo Client configuration
│   │   └── client.ts        # GraphQL client setup
│   ├── components/          # Composants réutilisables
│   │   ├── ui/              # Composants UI (Button, Card, Input, etc.)
│   │   └── ProtectedRoute.tsx
│   ├── context/             # React Context
│   │   └── AuthContext.tsx  # Authentication context
│   ├── graphql/             # GraphQL queries & mutations
│   │   ├── auth.ts
│   │   ├── profile.ts
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   ├── experiences.ts
│   │   └── portfolio.ts
│   ├── pages/               # Pages de l'application
│   │   ├── Home.tsx         # Portfolio public
│   │   └── Login.tsx        # Authentication page
│   ├── types/               # TypeScript types
│   │   └── graphql.ts
│   ├── utils/               # Utilitaires
│   │   ├── auth.ts          # Auth helpers
│   │   └── errorHandler.ts  # Error handling
│   ├── App.jsx              # Composant principal
│   └── main.jsx             # Point d'entrée
├── public/                  # Fichiers statiques
├── index.html               # Template HTML
└── package.json             # Dépendances
```

## 🎯 Fonctionnalités

### ✅ Implémenté

- ✅ **Interface publique responsive**
  - Page d'accueil avec informations du profil
  - Section Projets avec filtrage
  - Section Compétences par catégories
  - Section Expériences professionnelles
  - Liens sociaux et contact
  
- ✅ **Command Console (NEW!)**
  - Accès admin via commandes (Ctrl+K)
  - Interface terminal-like
  - Pas de boutons admin visibles
  - Navigation par clavier
  
- ✅ **Authentification JWT**
  - Login/Logout sécurisé
  - Token management
  - Token refresh
  - Protected routes
  
- ✅ **Apollo Client Configuration**
  - GraphQL queries & mutations
  - Error handling
  - Cache management
  - Authentication headers
  
- ✅ **Composants UI réutilisables**
  - Button, Card, Input, TextArea
  - Loading states
  - Error messages
  - Responsive design

### 🚧 En cours / À venir

- ⏳ Panel d'administration
  - Dashboard avec statistiques
  - CRUD Profile
  - CRUD Projects
  - CRUD Skills
  - CRUD Experiences
  
- ⏳ Fonctionnalités additionnelles
  - Upload d'images
  - Drag & drop ordering
  - Dark mode toggle
  - Animations

## 🔐 Authentication

### Credentials par défaut (Backend)
```
Username: admin
Password: admin123
```

### Command Console Access (NEW!)
1. Press `Ctrl+K` anywhere on the site
2. Type `login` to access login page
3. Enter credentials
4. Press `Ctrl+K` again
5. Type `dashboard` to access admin panel
6. Type `logout` to sign out
7. Type `help` for all commands

### Flow d'authentification
1. Utilisateur entre username/password sur `/login`
2. Backend valide et retourne `accessToken` + `refreshToken`
3. Tokens stockés dans localStorage
4. `accessToken` ajouté dans headers pour chaque requête GraphQL
5. Routes admin protégées par `ProtectedRoute`
6. Token refresh automatique avant expiration
7. **Accès admin uniquement via Command Console (pas de boutons visibles)**

## 📡 API GraphQL

### Endpoint
```
http://localhost:4000/graphql
```

### Queries principales
```graphql
# Get complete portfolio
query GetPortfolio {
  getPortfolio {
    profile { ... }
    projects { ... }
    skills { ... }
    experiences { ... }
  }
}

# Get profile
query GetProfile {
  getProfil { ... }
}

# Get projects
query GetProjects {
  getProjets { ... }
}
```

### Mutations principales
```graphql
# Login
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    accessToken
    refreshToken
  }
}

# Create/Update Profile
mutation UpdateProfile($input: UpdateProfileInput!) {
  updateProfil(input: $input) { ... }
}

# Create Project
mutation CreateProject($input: ProjectInput!) {
  createProjet(input: $input) { ... }
}
```

Voir `FRONTEND_INTEGRATION_GUIDE.md` pour la documentation complète.

## 🎨 Styling

Le projet utilise **TailwindCSS** pour le styling :
- Classes utilitaires
- Dark mode support
- Responsive design
- Custom theme colors

## 🧪 Testing

```bash
# Run tests (à configurer)
npm test

# Lint
npm run lint
```

## 🐛 Debugging

### ⚠️ "No profile data found" Error?

**Quick Fix:**
1. Make sure backend is running: `cd backend && npm run dev`
2. Backend should be on port 4000
3. Create profile via admin panel (Ctrl+K → login → dashboard)

**See:** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for complete guide

### Erreurs communes

**1. CORS Error**
- Vérifier que le backend est lancé
- Vérifier l'URL dans `.env`

**2. Authentication Failed**
- Vérifier credentials
- Vérifier que le token n'est pas expiré
- Clear localStorage et re-login

**3. GraphQL Errors**
- Vérifier la console pour les détails
- Vérifier les variables des mutations/queries

## � Build & Deployment

```bash
# Build production
npm run build

# Preview build
npm run preview

# Deploy (exemple)
npm run build && firebase deploy
```

## 🤝 Contributing

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 👤 Auteur

Mohamed

## 📝 License

MIT

## 📚 Documentation

### 🆕 Command Console (NEW!)
- [📖 Documentation Index](./DOCUMENTATION_INDEX.md) - **START HERE** - Complete guide to all docs
- [🚀 Quick Start](./QUICK_START.md) - Get started in 30 seconds
- [📋 Command Reference](./COMMAND_REFERENCE.md) - Printable cheat sheet
- [📖 Complete Guide](./COMMAND_CONSOLE_GUIDE.md) - Full implementation guide
- [🏗️ Architecture](./ARCHITECTURE_DIAGRAM.md) - Visual diagrams
- [🧪 Testing Guide](./TESTING_GUIDE.md) - Complete test suite
- [📝 Implementation Summary](./IMPLEMENTATION_SUMMARY.md) - Technical overview

### 📱 Responsive Design (NEW!)
- [✅ Implementation Complete](./RESPONSIVE_IMPLEMENTATION_COMPLETE.md) - **ALL DONE!** ✅
- [📱 Responsive Design Guide](./RESPONSIVE_DESIGN_GUIDE.md) - Complete responsive design guide for React
- [✅ Implementation Checklist](./RESPONSIVE_CHECKLIST.md) - Step-by-step checklist
- [📝 Quick Summary](./RESPONSIVE_SUMMARY.md) - 15-minute quick start
- [🧪 Device Testing Guide](./DEVICE_TESTING_GUIDE.md) - Test on real devices

### Project Documentation
- [Apollo Client Explained](./APOLLO_CLIENT_EXPLAINED.md) - **NEW!** Detailed explanation of client.ts
- [Apollo Client Visual Guide](./APOLLO_CLIENT_VISUAL.md) - Visual diagrams
- [Frontend Integration Guide](./FRONTEND_INTEGRATION_GUIDE.md)
- [Backend Documentation](../backend/README.md)
- [Apollo Client Docs](https://www.apollographql.com/docs/react/)
- [React Router Docs](https://reactrouter.com/)
- [TailwindCSS Docs](https://tailwindcss.com/)

---

**Status**: ✅ Core features implemented | 🚧 Admin panel in progress

Made with ❤️ using React + Vite + GraphQL
