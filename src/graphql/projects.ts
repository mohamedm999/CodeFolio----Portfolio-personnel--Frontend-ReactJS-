import { gql } from '@apollo/client';

// ==================== QUERIES ====================

export const GET_PROJECTS = gql`
  query GetProjects {
    getProjets {
      id
      title
      description
      technologies
      imageUrl
      githubUrl
      featured
      createdAt
    }
  }
`;

// ==================== MUTATIONS ====================

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: ProjectInput!) {
    createProjet(input: $input) {
      id
      title
      description
      technologies
      imageUrl
      githubUrl
      featured
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $input: ProjectInput!) {
    updateProjet(id: $id, input: $input) {
      id
      title
      description
      technologies
      imageUrl
      githubUrl
      featured
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProjet(id: $id) {
      success
      message
    }
  }
`;
