# CodeFolio - Portfolio Personnel

Portfolio professionnel développé avec React + Vite et intégration GraphQL Backend.

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

### Flow d'authentification
1. Utilisateur entre username/password sur `/login`
2. Backend valide et retourne `accessToken` + `refreshToken`
3. Tokens stockés dans localStorage
4. `accessToken` ajouté dans headers pour chaque requête GraphQL
5. Routes admin protégées par `ProtectedRoute`
6. Token refresh automatique avant expiration

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

- [Frontend Integration Guide](./FRONTEND_INTEGRATION_GUIDE.md)
- [Backend Documentation](../backend/README.md)
- [Apollo Client Docs](https://www.apollographql.com/docs/react/)
- [React Router Docs](https://reactrouter.com/)
- [TailwindCSS Docs](https://tailwindcss.com/)

---

**Status**: ✅ Core features implemented | 🚧 Admin panel in progress

Made with ❤️ using React + Vite + GraphQL
