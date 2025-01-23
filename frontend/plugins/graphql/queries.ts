import { gql } from '@apollo/client/core';

export const GET_TRAVEL = gql`
  query GetTravel($id: String!) {
    travel(id: $id) {
      id
      name
      price
      description
      maxCapacity
    }
  }
`;

export const GET_TRAVELS = gql`
  query GetTravels {
    travels {
      id
      name
      description
      price
      maxCapacity
      iata
    }
  }
`;