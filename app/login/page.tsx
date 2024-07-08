// pages/signin.js
import React from 'react';

const SignInPage = () => {

  return (
    <>
      <form>
        <input type="text" id="id" placeholder="id" />
        <input type="text" id="pw" placeholder="pw" />
        <button id="login" type="submit">Login</button>
      </form>
      <button id="sign">
        create user account
      </button>
    </>
  );
};

export default SignInPage;