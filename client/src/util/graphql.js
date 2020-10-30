import { gql } from '@apollo/client';


export const FETCH_POSTS_QUERY = gql`
{
    getPosts{
        id
        body
        createdAt
        username
        comments{
            id
            body
            username
            createdAt
        }
        likes{
            id
            username
            createdAt
        }
        likeCount
        commentCount
    }
}
`;