import { ApolloServer, gql } from "apollo-server"
import { loadSchema } from "@graphql-tools/load"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const startServer = async () => {
    const typeDefs = await loadSchema('./src/schema/*.graphql', {
        loaders: [
            new GraphQLFileLoader()
        ]
    });
    const resolvers = {
        Query: {
            books: () => books,
        },
    };
    const server = new ApolloServer({ typeDefs, resolvers });
    // The `listen` method launches a web server.
    server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
};

startServer();
