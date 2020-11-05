import React, { useContext, useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Dimmer, Loader, Grid, Image, Card, Button, Icon, Label, Form } from "semantic-ui-react";
import moment from 'moment';
import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

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

const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($postId: ID!, $body: String!) {
        createComment(postId: $postId, body: $body) {
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
    const { user } = useContext(AuthContext);
    const postId = props.match.params.postId;
    console.log(postId);

    const [comment, setComment] = useState("");

    const { loading, data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
        update() {
            setComment("");
        },
        variables: {
            postId,
            body: comment
        }
    })

    const deletePostCallback = () => {
        window.location = "/";
    }

    let postMarkup;
    console.log(data);
    if (loading) {
        postMarkup = (
            <Dimmer active inverted>
                <Loader inverted content='Loading' />
            </Dimmer>
        );
    } else {
        console.log(data.getPost)
        const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = data.getPost;
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            floated='right'
                            size='small'
                            src='https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png'
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <LikeButton user={user} post={{ id, likes, likeCount }} />
                                <Button as="div" labelPosition="right" onClick={() => console.log("comment attempt")}>
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
                        {user && (
                            <Card fluid>
                                <Form>
                                    <div className="ui action input fluid">
                                        <input
                                            type="text"
                                            placeholder="Comment..."
                                            name="comment"
                                            value={comment}
                                            onChange={event => setComment(event.target.value)}
                                        ></input>
                                        <button
                                            type="submit"
                                            className="ui button orange"
                                            disabled={comment.trim() === ""}
                                            onClick={createComment}
                                        >Submit</button>
                                    </div>
                                </Form>
                            </Card>
                        )}
                        {comments.map(comment => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {user && user.username === comment.username && (
                                        <DeleteButton postId={id} commentId={comment.id}></DeleteButton>
                                    )}
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    return postMarkup;
}

export default SinglePost;
