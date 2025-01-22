import { gql } from '@apollo/client/core';

export const CREATE_BOOKING = gql`
  mutation CreateBooking($input: CreateBookingInput!) {
    createBooking(createBookingInput: $input) {
      id
    }
  }
`;
