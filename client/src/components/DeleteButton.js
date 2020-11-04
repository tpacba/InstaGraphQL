import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Icon, Button, Confirm } from 'semantic-ui-react';

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`

const DeleteButton = ({ postId }) => {
    const [ confirmOpen, setConfirmOpen ] = useState(false);

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update() {
            setConfirmOpen(false);
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
