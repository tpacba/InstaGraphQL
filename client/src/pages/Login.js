import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
            username: $username
            password: $password
        ) {
            id
            email
            token
            username
            createdAt
        }
    }
`

const Login = (props) => {
    const context = useContext(AuthContext);

    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: "",
        password: "",
    })

    const [ loginUser, { loading } ] = useMutation(LOGIN_USER, {
        update(_, result) {
            console.log(result);
            context.login(result.data.login);
            props.history.push("/");
        },
        onError(err) {
            console.log(err);
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })

    function loginUserCallback() {
        loginUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={ loading ? "loading" : ""}>
                <h1>Login</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                ></Form.Input>
                <Form.Input
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                ></Form.Input>
                <Button type="submit" color="red">
                    Login
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(item => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Login;