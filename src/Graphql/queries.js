import {gql} from "graphql-request";

export const EVENT_DETAILS = gql`
    query event($id: ID!) {
  event(id: $id) {
    name
    description
    startDate
    endDate
  }
  AgeGroups(filters: {eventID: $id}) {
    minAge
    maxAge
    name
    id
  }
}`;

export const SCORE_BOARD = gql`
    query scoreboard($ageGroupID: ID!, $eventID: ID!, $keyword: String){
    scoreboard(ageGroupID: $ageGroupID, eventID: $eventID, keyword: $keyword){
        scores {
          duration
          participant {
            name
          }
          rank
        }
    }
}`;

export const PARTICIPANTS = gql`
    query participants($eventID: ID){
        participants(filters: {eventID: $eventID}){
            participants{
                name
                id
            }
        }
    }`;

export const ALL_PARTICIPANTS = gql`
    query participants{
        participants{
            participants {
              name
              id
              contact
              email
            }
        }
  }`;

export const EVENTS = gql`
    query{
        events{
            name
            description
            id
            startDate
            endDate
            }
        }`;

export const PARTICIPANT = gql`
    query participant($id: ID!){
    participant(id: $id){
        name
        dob
        contact
        email
        gender
        ageGroup {
          name
        }
        events {
          name
          id
        }
    }
}`;

export const DETAILED_PARTICIPANTS = gql`
    query participants {
      getAllParticipants {
        id
        name
        contact
        email
        dob
        city
        state
        country
        events {
          name
        }
        gender
        ageGroup {
          name
        }
      }
}`;