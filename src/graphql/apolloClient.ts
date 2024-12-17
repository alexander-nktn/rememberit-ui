import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: 'http://localhost:8080/graphql', // Backend GraphQL endpoint
});

// Middleware to add the Authorization header except for signIn and signUp mutations
const authLink = setContext((operation, { headers }) => {
  const token = localStorage.getItem('authToken');
  const { operationName } = operation;

  // Exclude signIn and signUp mutations
  if (operationName === 'signIn' || operationName === 'signUp') {
    return { headers };
  }

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Apollo Client setup with auth middleware
const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
