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

export const CONFIRM_BOOKING = gql`
  mutation ConfirmBooking($confirmBookingInput: ConfirmBookingInput!) {
    confirmBooking(confirmBookingInput: $confirmBookingInput) {
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
