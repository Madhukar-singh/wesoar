import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Your GraphQL endpoint
const httpLink = createHttpLink({
  uri: "https://rakeezaapi.fa.gov.sa/graphql",
});

// Set custom headers including authorization
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "accept-version": "3.0.25",
      access: "",
      "auth-mode": "",
      authorization: "",
      clientid: "b942a680-f209-4f6d-b328-030623921e9a",
      domain: "demo.wesoar.app",
      uid: "61ec5a7da292c106d6f6146d",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
