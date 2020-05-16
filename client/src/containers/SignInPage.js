import React from 'react';
import SignIn from '../components/auth/SignIn';

const SignInPage = props => {
    return <SignIn history={props.history} />;
}

export default SignInPage;