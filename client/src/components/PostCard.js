import React, { useState, useContext } from 'react';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const PostCard = ({ post: { id, body, createdAt, username, comments, likes, likeCount, commentCount } }) => {

    const { user } = useContext(AuthContext);

    const likePost = () => {
        console.log("likePost");
    }

    const deletePost = () => {
        console.log("deletePost");
    }

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button as='div' labelPosition='right' onClick={likePost}>
                    <Button color='red' basic>
                        <Icon name='thumbs up' />
                    </Button>
                    <Label basic color='red' pointing='left'>
                        {likeCount}
                    </Label>
                </Button>
                <Button as='div' labelPosition='right' as={Link} to={`/posts/${id}`}>
                    <Button color='orange' basic>
                        <Icon name='comments' />
                    </Button>
                    <Label basic color='orange' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
                {user && user.username === username && (
                    <Button as='div' floated='right' icon onClick={deletePost}>
                        <Icon name='trash' />
                    </Button>
                )}
            </Card.Content>
        </Card>
    );
};


export default PostCard;