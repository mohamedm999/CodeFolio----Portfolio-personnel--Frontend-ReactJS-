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
