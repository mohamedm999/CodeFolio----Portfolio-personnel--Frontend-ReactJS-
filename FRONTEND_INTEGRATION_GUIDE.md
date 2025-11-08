# 🚀 Frontend Integration Guide - CodeFolio GraphQL API

Complete guide for integrating your React frontend with this GraphQL backend.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Apollo Client Setup](#apollo-client-setup)
3. [Authentication Flow](#authentication-flow)
4. [GraphQL Queries & Mutations](#graphql-queries--mutations)
5. [TypeScript Types](#typescript-types)
6. [Error Handling](#error-handling)
7. [Best Practices](#best-practices)

---

## 🎯 Quick Start

### Backend Configuration

**Base URL:** `http://localhost:4000/graphql`

**Environment Variables:**
```env
REACT_APP_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
```

### Required NPM Packages

```bash
npm install @apollo/client graphql
```

Optional but recommended:
```bash
npm install jwt-decode
```

---

## 🔧 Apollo Client Setup

### Basic Configuration

```typescript
// src/apollo/client.ts
import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

// Authentication link - adds token to headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, extensions }) => {
      console.error(`[GraphQL error]: ${message}`, extensions);
      
      // Handle authentication errors
      if (extensions?.code === 'UNAUTHENTICATED') {
        // Clear tokens and redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    });
  }
  
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Apollo Client instance
export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
```

### App Integration

```typescript
// src/App.tsx
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/client';

function App() {
  return (
    <ApolloProvider client={client}>
      {/* Your app components */}
    </ApolloProvider>
  );
}

export default App;
```

---

## 🔐 Authentication Flow

### 1. Login Component

```typescript
// src/components/Login.tsx
import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      // Store tokens
      localStorage.setItem('accessToken', data.login.accessToken);
      localStorage.setItem('refreshToken', data.login.refreshToken);
      
      // Redirect to dashboard
      window.location.href = '/dashboard';
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};
```

### 2. Token Refresh Hook

```typescript
// src/hooks/useTokenRefresh.ts
import { useMutation, gql } from '@apollo/client';

const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`;

export const useTokenRefresh = () => {
  const [refreshTokenMutation] = useMutation(REFRESH_TOKEN_MUTATION);

  const refreshToken = async () => {
    const token = localStorage.getItem('refreshToken');
    if (!token) return false;

    try {
      const { data } = await refreshTokenMutation({
        variables: { refreshToken: token },
      });

      localStorage.setItem('accessToken', data.refreshToken.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken.refreshToken);
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return false;
    }
  };

  return { refreshToken };
};
```

### 3. Logout Component

```typescript
// src/components/Logout.tsx
import { useMutation, gql } from '@apollo/client';

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      success
      message
    }
  }
`;

export const Logout = () => {
  const [logout] = useMutation(LOGOUT_MUTATION, {
    onCompleted: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    },
  });

  return (
    <button onClick={() => logout()}>
      Logout
    </button>
  );
};
```

### 4. Protected Route

```typescript
// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
```

---

## 📊 GraphQL Queries & Mutations

### Profile Operations

```typescript
// src/graphql/profile.ts
import { gql } from '@apollo/client';

// Query: Get Profile
export const GET_PROFILE = gql`
  query GetProfile {
    getProfil {
      id
      name
      title
      bio
      email
      phone
      location
      website
      github
      linkedin
      avatar
    }
  }
`;

// Mutation: Create Profile
export const CREATE_PROFILE = gql`
  mutation CreateProfile($input: UpdateProfileInput!) {
    createProfil(input: $input) {
      id
      name
      title
      bio
      email
      phone
      location
      website
      github
      linkedin
      avatar
    }
  }
`;

// Mutation: Update Profile
export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfil(input: $input) {
      id
      name
      title
      bio
      email
      phone
      location
      website
      github
      linkedin
      avatar
    }
  }
`;

// Usage in component
import { useQuery, useMutation } from '@apollo/client';

export const ProfilePage = () => {
  const { data, loading, error } = useQuery(GET_PROFILE);
  const [updateProfile] = useMutation(UPDATE_PROFILE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>{data.getProfil.name}</h1>
      <p>{data.getProfil.title}</p>
    </div>
  );
};
```

### Projects Operations

```typescript
// src/graphql/projects.ts
import { gql } from '@apollo/client';

// Query: Get All Projects
export const GET_PROJECTS = gql`
  query GetProjects {
    getProjets {
      id
      title
      description
      technologies
      imageUrl
      projectUrl
      githubUrl
      featured
      order
      createdAt
    }
  }
`;

// Mutation: Create Project
export const CREATE_PROJECT = gql`
  mutation CreateProject($input: ProjectInput!) {
    createProjet(input: $input) {
      id
      title
      description
      technologies
      imageUrl
      projectUrl
      githubUrl
      featured
      order
    }
  }
`;

// Mutation: Update Project
export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $input: ProjectInput!) {
    updateProjet(id: $id, input: $input) {
      id
      title
      description
      technologies
      imageUrl
      projectUrl
      githubUrl
      featured
      order
    }
  }
`;

// Mutation: Delete Project
export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProjet(id: $id) {
      success
      message
    }
  }
`;

// Usage in component
export const ProjectsList = () => {
  const { data, loading } = useQuery(GET_PROJECTS);
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {data.getProjets.map((project: any) => (
        <div key={project.id}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <button onClick={() => deleteProject({ variables: { id: project.id } })}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
```

### Skills Operations

```typescript
// src/graphql/skills.ts
import { gql } from '@apollo/client';

// Query: Get All Skills
export const GET_SKILLS = gql`
  query GetSkills {
    getCompetences {
      id
      name
      category
      level
      icon
      order
    }
  }
`;

// Mutation: Create Skill
export const CREATE_SKILL = gql`
  mutation CreateSkill($input: SkillInput!) {
    createCompetence(input: $input) {
      id
      name
      category
      level
      icon
      order
    }
  }
`;

// Mutation: Update Skill
export const UPDATE_SKILL = gql`
  mutation UpdateSkill($id: ID!, $input: SkillInput!) {
    updateCompetence(id: $id, input: $input) {
      id
      name
      category
      level
      icon
      order
    }
  }
`;

// Mutation: Delete Skill
export const DELETE_SKILL = gql`
  mutation DeleteSkill($id: ID!) {
    deleteCompetence(id: $id) {
      success
      message
    }
  }
`;
```

### Experience Operations

```typescript
// src/graphql/experiences.ts
import { gql } from '@apollo/client';

// Query: Get All Experiences
export const GET_EXPERIENCES = gql`
  query GetExperiences {
    getExperiences {
      id
      title
      company
      location
      startDate
      endDate
      current
      description
      order
    }
  }
`;

// Mutation: Create Experience
export const CREATE_EXPERIENCE = gql`
  mutation CreateExperience($input: ExperienceInput!) {
    createExperience(input: $input) {
      id
      title
      company
      location
      startDate
      endDate
      current
      description
      order
    }
  }
`;

// Mutation: Update Experience
export const UPDATE_EXPERIENCE = gql`
  mutation UpdateExperience($id: ID!, $input: ExperienceInput!) {
    updateExperience(id: $id, input: $input) {
      id
      title
      company
      location
      startDate
      endDate
      current
      description
      order
    }
  }
`;

// Mutation: Delete Experience
export const DELETE_EXPERIENCE = gql`
  mutation DeleteExperience($id: ID!) {
    deleteExperience(id: $id) {
      success
      message
    }
  }
`;
```

### Portfolio Query (Get All Data)

```typescript
// src/graphql/portfolio.ts
import { gql } from '@apollo/client';

// Query: Get Complete Portfolio
export const GET_PORTFOLIO = gql`
  query GetPortfolio {
    getPortfolio {
      profile {
        id
        name
        title
        bio
        email
        phone
        location
        website
        github
        linkedin
        avatar
      }
      projects {
        id
        title
        description
        technologies
        imageUrl
        projectUrl
        githubUrl
        featured
        order
      }
      skills {
        id
        name
        category
        level
        icon
        order
      }
      experiences {
        id
        title
        company
        location
        startDate
        endDate
        current
        description
        order
      }
    }
  }
`;

// Usage for public portfolio page
export const PortfolioPage = () => {
  const { data, loading, error } = useQuery(GET_PORTFOLIO);

  if (loading) return <p>Loading portfolio...</p>;
  if (error) return <p>Error loading portfolio</p>;

  const { profile, projects, skills, experiences } = data.getPortfolio;

  return (
    <div>
      <section>
        <h1>{profile.name}</h1>
        <h2>{profile.title}</h2>
        <p>{profile.bio}</p>
      </section>

      <section>
        <h2>Projects</h2>
        {projects.map((project: any) => (
          <div key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        {skills.map((skill: any) => (
          <div key={skill.id}>
            <span>{skill.name}</span>
            <span>{skill.level}%</span>
          </div>
        ))}
      </section>

      <section>
        <h2>Experience</h2>
        {experiences.map((exp: any) => (
          <div key={exp.id}>
            <h3>{exp.title} at {exp.company}</h3>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};
```

---

## 📝 TypeScript Types

```typescript
// src/types/graphql.ts

export interface Profile {
  id: string;
  name: string;
  title: string;
  bio?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  avatar?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon?: string;
  order: number;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  order: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface Portfolio {
  profile: Profile;
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
}

export interface DeleteResponse {
  success: boolean;
  message: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}
```

---

## ⚠️ Error Handling

### GraphQL Error Codes

| Code | Description | Action |
|------|-------------|--------|
| `UNAUTHENTICATED` | Invalid or expired token | Redirect to login |
| `PROFILE_ALREADY_EXISTS` | Profile exists (createProfil) | Use updateProfil instead |
| `INTERNAL_SERVER_ERROR` | Server configuration error | Contact admin |

### Error Handler Component

```typescript
// src/components/ErrorBoundary.tsx
import { ApolloError } from '@apollo/client';

export const handleGraphQLError = (error: ApolloError) => {
  if (error.graphQLErrors) {
    error.graphQLErrors.forEach(({ message, extensions }) => {
      switch (extensions?.code) {
        case 'UNAUTHENTICATED':
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          break;
        case 'PROFILE_ALREADY_EXISTS':
          console.warn('Profile already exists, use update instead');
          break;
        default:
          console.error('GraphQL Error:', message);
      }
    });
  }

  if (error.networkError) {
    console.error('Network Error:', error.networkError);
    // Show user-friendly error message
  }
};

// Usage in component
import { useQuery } from '@apollo/client';

export const MyComponent = () => {
  const { data, loading, error } = useQuery(GET_PROFILE, {
    onError: handleGraphQLError,
  });

  // Component logic...
};
```

---

## ✅ Best Practices

### 1. Token Management

```typescript
// src/utils/auth.ts
import jwt_decode from 'jwt-decode';

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: any = jwt_decode(token);
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

export const getValidToken = async (): Promise<string | null> => {
  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken || isTokenExpired(accessToken)) {
    // Try to refresh
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken || isTokenExpired(refreshToken)) {
      return null;
    }
    
    // Call refresh mutation
    // Return new token or null
  }
  
  return accessToken;
};
```

### 2. Cache Management

```typescript
// Clear cache on logout
import { useApolloClient } from '@apollo/client';

export const useLogout = () => {
  const client = useApolloClient();

  const logout = async () => {
    await client.mutate({ mutation: LOGOUT_MUTATION });
    
    // Clear Apollo cache
    await client.clearStore();
    
    // Clear local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    // Redirect
    window.location.href = '/login';
  };

  return { logout };
};
```

### 3. Optimistic Updates

```typescript
// Optimistic UI for better UX
const [deleteProject] = useMutation(DELETE_PROJECT, {
  optimisticResponse: {
    deleteProjet: {
      __typename: 'DeleteResponse',
      success: true,
      message: 'Project deleted',
    },
  },
  update: (cache, { data }) => {
    if (data?.deleteProjet.success) {
      cache.modify({
        fields: {
          getProjets(existingProjects = [], { readField }) {
            return existingProjects.filter(
              (projectRef: any) => readField('id', projectRef) !== projectId
            );
          },
        },
      });
    }
  },
});
```

### 4. Loading States

```typescript
// Centralized loading component
export const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

// Usage
export const ProfilePage = () => {
  const { data, loading, error } = useQuery(GET_PROFILE);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return <ProfileDisplay profile={data.getProfil} />;
};
```

### 5. Form Handling with Mutations

```typescript
// src/components/ProjectForm.tsx
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form'; // Optional but recommended

export const ProjectForm = ({ projectId }: { projectId?: string }) => {
  const [createProject] = useMutation(CREATE_PROJECT);
  const [updateProject] = useMutation(UPDATE_PROJECT);

  const onSubmit = async (formData: any) => {
    try {
      if (projectId) {
        await updateProject({
          variables: { id: projectId, input: formData },
        });
      } else {
        await createProject({
          variables: { input: formData },
          refetchQueries: [{ query: GET_PROJECTS }],
        });
      }
      // Success notification
    } catch (error) {
      // Error notification
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

---

## 🔒 CORS Configuration

The backend is configured to accept requests from any origin in development. For production, update the CORS settings:

```typescript
// Backend: src/index.ts (already configured)
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true,
}));
```

Update your Apollo Client for production:

```typescript
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
  credentials: 'include', // For cookies if needed
});
```

---

## 📚 Additional Resources

### Recommended Libraries

- **Apollo Client**: GraphQL client - https://www.apollographql.com/docs/react/
- **React Router**: Routing - https://reactrouter.com/
- **React Hook Form**: Form handling - https://react-hook-form.com/
- **jwt-decode**: JWT decoding - https://github.com/auth0/jwt-decode
- **date-fns**: Date formatting - https://date-fns.org/

### Testing

```bash
npm install @testing-library/react @testing-library/jest-dom @apollo/client/testing
```

```typescript
// Example test
import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import { GET_PROFILE } from './graphql/profile';
import { ProfilePage } from './components/ProfilePage';

const mocks = [
  {
    request: {
      query: GET_PROFILE,
    },
    result: {
      data: {
        getProfil: {
          id: '1',
          name: 'John Doe',
          title: 'Developer',
        },
      },
    },
  },
];

test('renders profile', async () => {
  render(
    <MockedProvider mocks={mocks}>
      <ProfilePage />
    </MockedProvider>
  );

  expect(await screen.findByText('John Doe')).toBeInTheDocument();
});
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Not authenticated" error

**Solution:** Check that the Authorization header is properly set:
```typescript
const token = localStorage.getItem('accessToken');
console.log('Token:', token); // Debug
```

### Issue 2: Token expires too quickly

**Solution:** Implement automatic token refresh:
```typescript
// Refresh token every 14 minutes (before 15min expiry)
setInterval(async () => {
  await refreshToken();
}, 14 * 60 * 1000);
```

### Issue 3: CORS errors

**Solution:** Make sure backend is running and CORS is enabled.

### Issue 4: Cache not updating

**Solution:** Use `refetchQueries` or `update` function in mutations.

---

## 📞 Support

- **Backend Documentation**: See `README.md` in backend project
- **Postman Collection**: `CodeFolio-Complete-v2.postman_collection.json`
- **Test Results**: See `TEST_RESULTS_DETAILED.md`

---

## 🎉 Complete Example Application

```typescript
// src/App.tsx - Complete example
import { ApolloProvider, useQuery } from '@apollo/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { client } from './apollo/client';
import { GET_PORTFOLIO } from './graphql/portfolio';

const PortfolioPage = () => {
  const { data, loading } = useQuery(GET_PORTFOLIO);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="portfolio">
      <header>
        <h1>{data.getPortfolio.profile.name}</h1>
        <p>{data.getPortfolio.profile.title}</p>
      </header>

      <section className="projects">
        <h2>Projects</h2>
        <div className="grid">
          {data.getPortfolio.projects.map((project: any) => (
            <div key={project.id} className="card">
              <img src={project.imageUrl} alt={project.title} />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tags">
                {project.technologies.map((tech: string) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="skills">
        <h2>Skills</h2>
        <div className="skills-grid">
          {data.getPortfolio.skills.map((skill: any) => (
            <div key={skill.id} className="skill">
              <span>{skill.name}</span>
              <div className="progress-bar">
                <div style={{ width: `${skill.level}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="experience">
        <h2>Experience</h2>
        <div className="timeline">
          {data.getPortfolio.experiences.map((exp: any) => (
            <div key={exp.id} className="timeline-item">
              <h3>{exp.title}</h3>
              <h4>{exp.company}</h4>
              <p className="date">
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </p>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
```

---

**Happy Coding! 🚀**

For more details, check the backend documentation and Postman collection.
