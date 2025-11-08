import { gql } from '@apollo/client';

// ==================== QUERIES ====================

export const GET_SKILLS = gql`
  query GetSkills {
    getCompetences {
      id
      name
      category
      level
      icon
    }
  }
`;

// ==================== MUTATIONS ====================

export const CREATE_SKILL = gql`
  mutation CreateSkill($input: SkillInput!) {
    createCompetence(input: $input) {
      id
      name
      category
      level
      icon
    }
  }
`;

export const UPDATE_SKILL = gql`
  mutation UpdateSkill($id: ID!, $input: SkillInput!) {
    updateCompetence(id: $id, input: $input) {
      id
      name
      category
      level
      icon
    }
  }
`;

export const DELETE_SKILL = gql`
  mutation DeleteSkill($id: ID!) {
    deleteCompetence(id: $id) {
      success
      message
    }
  }
`;
