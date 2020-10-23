import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Grid, Container } from 'semantic-ui-react';
import PostCard from '../components/PostCard';

const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
            id
            body
            createdAt
            username
            comments{
                id
                body
                username
                createdAt
            }
            likes{
                id
                username
                createdAt
            }
            likeCount
            commentCount
        }
    }
`;

const Home = () => {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);

    return (
        <Grid columns={3}>
            <Grid.Row >
                <Container textAlign='center'><h1>Recent Posts</h1></Container>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h1>Loading...</h1>
                ) : (
                        data.getPosts && data.getPosts.map(post => (
                            <Grid.Column key={post.id} style={{ marginBottom: "20px" }}>
                                <PostCard post={post}></PostCard>
                            </Grid.Column>
                        ))
                    )}
            </Grid.Row>
        </Grid>

    );
};

export default Home;