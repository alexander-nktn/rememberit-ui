import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink, Observable } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const GRAPHQL_URI = 'http://localhost:8080/graphql'; // Backend GraphQL endpoint

// List of operations that do not require authentication
const PUBLIC_OPERATIONS = ['SignIn', 'SignUp'];

// Helper to check if the operation requires authentication
const isAuthRequired = (operationName: string | undefined): boolean => {
  return operationName ? !PUBLIC_OPERATIONS.includes(operationName) : true;
};

// HTTP Link to connect with the GraphQL endpoint
const httpLink = createHttpLink({
  uri: GRAPHQL_URI,
});

// Link to prevent the request if no token is available
const skipIfNoAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('authToken');

  if (!token && isAuthRequired(operation.operationName)) {
    console.warn(`Skipping request for ${operation.operationName} due to missing token.`);
    return new Observable((observer) => {
      // Immediately terminate the request with a completion
      observer.complete();
    });
  }

  return forward(operation);
});

// Auth Link to add Authorization header if token exists
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('authToken');

  return {
    headers: {
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
});

// Apollo Client instance
const client = new ApolloClient({
  link: ApolloLink.from([skipIfNoAuthLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
