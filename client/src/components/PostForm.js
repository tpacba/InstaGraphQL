import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useForm } from '../util/hooks';
import { gql, useMutation } from '@apollo/client';

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
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
`;

function PostForm() {
    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: ""
    });

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        update(_, result) {
            console.log(result);
            values.body = "";
        },
        variables: values
    });

    function createPostCallback() {
        createPost();
    }

    return (
        <Form onSubmit={onSubmit}>
            <h2>Create a Post</h2>
            <Form.Field>
                <Form.Input
                    placeholder="Hello"
                    name="body"
                    onChange={onChange}
                    value={values.body}
                ></Form.Input>
                <Button
                    type="submit"
                    color="orange"
                >Submit</Button>
            </Form.Field>
        </Form>
    );
}


export default PostForm;
