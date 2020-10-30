import React from 'react';
import App from './App';
import { ApolloProvider, createHttpLink, InMemoryCache, ApolloClient } from '@apollo/client';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: "http://localhost:5000"
}); 

const authLink = setContext(() => {
    const token = localStorage.getItem("jwtToken");
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ""
        }
    }
})

console.log(authLink);

const client = new ApolloClient({
    connectToDevTools: true,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

console.log(client);

export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)