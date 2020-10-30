import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useForm } from '../util/hooks';
import { gql, useMutation } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../util/graphql';

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
        update(proxy, result) {
            console.log(proxy);
            console.log(result);
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });

            console.log(data);

            const newData = {getPosts: []}
            newData.getPosts = [result.data.createPost, ...data.getPosts];
            // data.getPosts.unshift(result.data.createPost);

            console.log(newData);

            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                newData
            })
            
            console.log(proxy)
            values.body = "";
            window.location.reload(false);
        },
        variables: values
    });

    function createPostCallback() {
        createPost();
    }

    return (
        <>
        <Form onSubmit={onSubmit}>
            <h2>Create a Post</h2>
            <Form.Field>
                <Form.Input
                    placeholder="Hello"
                    name="body"
                    onChange={onChange}
                    value={values.body}
                    error={error ? true : false}
                ></Form.Input>
                <Button
                    type="submit"
                    color="orange"
                >Submit</Button>
            </Form.Field>
        </Form>
        {error && (
            <div className="ui error message" style={{marginBottom: "20px"}}>
                <ul className="list">
                    <li>{error.graphQLErrors[0].message}</li>
                </ul>
            </div>
        )}
        </>
    );
}


export default PostForm;
