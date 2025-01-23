import { gql } from "@apollo/client/core";

export const CREATE_BOOKING = gql`
  mutation CreateBooking($createBookingInput: CreateBookingInput!) {
    createBooking(createBookingInput: $createBookingInput) {
      id
      email
      travel {
        id
        name
        description
        maxCapacity
      }
      seats
    }
  }
`;
