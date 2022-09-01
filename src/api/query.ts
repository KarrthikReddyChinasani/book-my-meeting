import { gql } from "@apollo/client";

export const GET_BUILDINGS = gql`
    query {
        Buildings {
            name
            meetingRooms {
                name
                meetings {
                    title
                    date
                    startTime
                    endTime
                }
            }
        }
    }
`;

export const GET_MEETINGS = gql`
    query {
        MeetingRooms {
            name
            floor
            id
            building {
                name
                id
            }
            meetings {
                title
                date
                startTime
                endTime
            }
        }
    }
`;
