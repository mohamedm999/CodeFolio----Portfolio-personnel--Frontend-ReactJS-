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
      projectUrl
      githubUrl
      featured
      order
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
      projectUrl
      githubUrl
      featured
      order
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
      projectUrl
      githubUrl
      featured
      order
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
