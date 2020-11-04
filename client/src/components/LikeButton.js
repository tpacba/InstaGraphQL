import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Icon, Label, Button } from 'semantic-ui-react';

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id
                username
            }
            likeCount
        }
    }
`

const LikeButton = ({ user, post: { id, likes, likeCount } }) => {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (user && likes.find(like => like.username === user.username)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, likes]);

    const [likePost, {error}] = useMutation(LIKE_POST_MUTATION, {
        onError(err) {
            window.location = "/login";
            return err;
        },
        variables: { postId: id }
    });

    const likeButton = user ? (
        liked ? (
            <Button color='red'>
                <Icon name='thumbs up' />
            </Button>
        ) : (
            <Button color='red' basic>
                <Icon name='thumbs up' />
            </Button>
        )
    ) : (
        <Button as={Link} to={"/"} color='red' basic>
                <Icon name='thumbs up' />
            </Button>
    )

    return (
        <Button as='div' labelPosition='right' onClick={likePost}>
            {likeButton}
            <Label basic color='red' pointing='left'>
                {likeCount}
            </Label>
        </Button>
    );
}

export default LikeButton;
