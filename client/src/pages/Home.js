import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Container, Dimmer, Loader } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../util/graphql";

const Home = () => {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);

    const { user } = useContext(AuthContext);

    return (
        <Grid columns={3}>
            <Grid.Row>
                <Container textAlign="center">
                    <h1>Recent Posts</h1>
                </Container>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm></PostForm>
                    </Grid.Column>
                )}
                {loading ? (
                    <Dimmer active inverted>
                        <Loader inverted content='Loading' />
                    </Dimmer>
                ) : (
                        data.getPosts &&
                        data.getPosts.map((post) => (
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
