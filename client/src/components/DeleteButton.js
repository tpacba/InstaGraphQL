import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Icon, Button, Confirm } from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from '../util/graphql';

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
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

const DeleteButton = ({ postId, commentId, callback }) => {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [deletePostOrComment] = useMutation(mutation, {
        update(proxy) {
            setConfirmOpen(false);

            if (!commentId) {
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                });

                const newData = { getPosts: [] }
                newData.getPosts = data.getPosts.filter(post => post.id !== postId);

                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    newData
                })
            }

            window.location.reload(false);

            if (callback) {
                callback();
            }
        },
        variables: {
            postId,
            commentId
        }
    });

    return (
        <>
            <Button as='div' floated='right' icon onClick={() => setConfirmOpen(true)}>
                <Icon name='trash' />
            </Button>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePostOrComment}
            ></Confirm>
        </>
    );
};

export default DeleteButton;
