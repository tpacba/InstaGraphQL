import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { get } from 'mongoose';

const FETCH_POST_QUERY = gql`
    query getPost($postId: ID!) {
        getPost(postId: $postId) {
            id
            body
            createdAt
            username
            comments {
                id
                body
                username
                createdAt
            }
            likes {
                id
                username
                createdAt
            }
            likeCount
            commentCount
        }
    }
`

const SinglePost = (props) => {
    const postId = props.match.params.postId;

    console.log(postId);

    const { data: { getPost }} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    let postMarkup;

    return (
        <div>

        </div>
    );
}

export default SinglePost;
