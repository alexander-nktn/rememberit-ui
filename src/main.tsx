import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext'; // Import UserProvider

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
