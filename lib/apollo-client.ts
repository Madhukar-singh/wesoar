import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "accept-version": process.env.NEXT_PUBLIC_ACCEPT_VERSION,
      access: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
      "auth-mode": process.env.NEXT_PUBLIC_AUTH_MODE,
      authorization: process.env.NEXT_PUBLIC_AUTHORIZATION_TOKEN,
      clientid: process.env.NEXT_PUBLIC_CLIENT_ID,
      domain: process.env.NEXT_PUBLIC_DOMAIN,
      uid: process.env.NEXT_PUBLIC_UID,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
