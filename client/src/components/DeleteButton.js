import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Icon, Button, Confirm } from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from '../util/graphql';

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`

const DeleteButton = ({ postId }) => {
    const [ confirmOpen, setConfirmOpen ] = useState(false);

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(proxy) {
            setConfirmOpen(false);

            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });

            const newData = {getPosts: []}
            newData.getPosts = data.getPosts.filter(post => post.id !== postId);

            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                newData
            })

            window.location = "/";
        },
        variables: {
            postId
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
            onConfirm={deletePost}
        ></Confirm>
        </>
    );
};

export default DeleteButton;
