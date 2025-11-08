import { gql } from '@apollo/client';

// ==================== QUERIES ====================

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

// ==================== MUTATIONS ====================

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

export const DELETE_EXPERIENCE = gql`
  mutation DeleteExperience($id: ID!) {
    deleteExperience(id: $id) {
      success
      message
    }
  }
`;
