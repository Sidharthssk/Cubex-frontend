import {gql} from "graphql-request";

export const LOGIN_QUERY = gql`
    mutation login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
                id
                email
                token{
                    access
                }
          }
    }`;

export const CREATE_EVENT = gql`
mutation CreateEvent($name: String!, $description: String!, $startDate: String!, $endDate: String!) {
  createEvent(
    name: $name
    description: $description
    startDate: $startDate
    endDate: $endDate) {
        name
        description
        startDate
        endDate
    }
}`;

export const CREATE_PARTICIPANT = gql`
    mutation createParticipant($name: String!, $phone: String!, $email: String!, $gender: String!, $dob: String!, $city: String!, $state: String!, $country: String!, $ageGroupID: ID!){
        createParticipant(name: $name, phone: $phone, email: $email, gender: $gender, dob: $dob, city: $city, state: $state, country: $country, ageGroup: $ageGroupID){
            id
        }
    }`;

export const REGISTER_PARTICIPANT = gql`
    mutation registerParticipantForCategory($participantID: ID!, $eventID: ID!){
        registerParticipantForCategory(participantID: $participantID, eventID: $eventID)
    }`;

export const RECORD_SCORE = gql`
    mutation recordScore($participantID: ID!, $eventID: ID!, $duration: String!){
        recordScore(scoreboard: {participantID: $participantID, eventID: $eventID, duration: $duration}){
            id
        }
    }`;

export const CREATE_SCORE_ENTERER = gql`
    mutation createScoreEnterer($email: String!, $password: String!, $username: String!) {
      createScoreEnterer(email: $email, password: $password, username: $username) {
            email
      }
}`;

export const CREATE_ADMIN_MUTATION = gql`
    mutation createAdmin($email: String!, $password: String!, $username: String!) {
        createAdmin(email: $email, password: $password, username: $username) {
            email
        }
}`;

export const REMOVE_PARTICIPANT = gql`
    mutation removeParticipantFromCategory($eventID: ID!, $participantID: ID!){
        removeParticipantFromCategory(eventID: $eventID, participantID: $participantID)
    }`;

export const PARTICIPANTS_WITH_KEYWORD = gql`
    query participants($keyword: String){
        participants(keyword: $keyword){
            participants {
              name
              id
              contact
              email
            }
        }
  }`;
