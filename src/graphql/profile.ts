import { gql } from '@apollo/client';

// ==================== QUERIES ====================

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

// ==================== MUTATIONS ====================

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
