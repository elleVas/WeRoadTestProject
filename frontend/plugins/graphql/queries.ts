import { gql } from '@apollo/client/core';

export const GET_TRAVEL = gql`
  query GetTravel($id: String!) {
    travel(id: $id) {
      id
      name
      description
      description_extended
      startingDate
      endingDate
      price
      maxCapacity
      iata
      moods{
        nature,
        relax,
        history,
        culture,
        party
        }
      }
    }
  
`;

export const GET_TRAVELS = gql`
  query GetTravels {
    travels {
      id
      name
      description
      startingDate
      endingDate
      price
      maxCapacity
      iata
    }
  }
`;