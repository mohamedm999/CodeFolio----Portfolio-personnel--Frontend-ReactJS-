import { gql } from '@apollo/client';

// ==================== QUERIES ====================

export const GET_EXPERIENCES = gql`
  query GetExperiences {
    getExperiences {
      id
      poste
      entreprise
      lieu
      dateDebut
      dateFin
      actuel
      description
    }
  }
`;

// ==================== MUTATIONS ====================

export const CREATE_EXPERIENCE = gql`
  mutation CreateExperience($input: ExperienceInput!) {
    createExperience(input: $input) {
      id
      poste
      entreprise
      lieu
      dateDebut
      dateFin
      actuel
      description
    }
  }
`;

export const UPDATE_EXPERIENCE = gql`
  mutation UpdateExperience($id: ID!, $input: ExperienceInput!) {
    updateExperience(id: $id, input: $input) {
      id
      poste
      entreprise
      lieu
      dateDebut
      dateFin
      actuel
      description
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
