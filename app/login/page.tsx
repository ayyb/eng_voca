// pages/signin.js
import Head from 'next/head';
import React from 'react';

const SignInPage = () => {

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </Head>
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