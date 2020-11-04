import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar';
import { Container, Segment, Divider, Image, List } from 'semantic-ui-react';
import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';
import SinglePost from './pages/SinglePost';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar></MenuBar>
          <Route exact path="/" component={Home}></Route>
          <AuthRoute exact path="/login" component={Login}></AuthRoute>
          <AuthRoute exact path="/register" component={Register}></AuthRoute>
          <Route exact path="/posts/:postId" component={SinglePost}></Route>
          <Segment textAlign="center" style={{ margin: '5em 0em 0em', padding: '5em 0em' }} vertical>
            <Divider section />
            <Image centered size='small' src='./instagraphql_banner.png'/>
            <List horizontal divided link size='small'>
              <List.Item as='a' href='#'>
                Github repository
              </List.Item>
              <List.Item as='a' href='#'>
                About the developer
              </List.Item>
            </List>
          </Segment>
        </Container>
      </Router>
    </AuthProvider>

  );
}

export default App;
