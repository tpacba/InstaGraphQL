import React, { useContext } from 'react';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

const PostCard = ({ post: { id, body, createdAt, username, comments, likes, likeCount, commentCount } }) => {

    const { user } = useContext(AuthContext);

    const deletePostCallback = () => {
        window.location = "/";
    }

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton
                    user={user}
                    post={{ id, likes, likeCount }}
                ></LikeButton>
                <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
                    <Button color='orange' basic>
                        <Icon name='comments' />
                    </Button>
                    <Label basic color='orange' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
                {user && user.username === username && (
                    <DeleteButton postId={id} callback={deletePostCallback}></DeleteButton>
                )}
            </Card.Content>
        </Card>
    );
};


export default PostCard;