import { gql } from '@apollo/client';

// ==================== QUERIES ====================

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
        avatar
      }
      projects {
        id
        title
        description
        technologies
        imageUrl
        githubUrl
        featured
      }
      skills {
        id
        name
        category
        level
        icon
      }
      experiences {
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
  }
`;
