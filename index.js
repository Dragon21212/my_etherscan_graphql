// Import Apollo Server and schema/resolver utilities
const { ApolloServer } = require("apollo-server"); 
const { importSchema } = require("graphql-import");

// Import custom data source
const EtherDataSource = require("./datasource/ethDatasource");  

// Import GraphQL schema from schema file
const typeDefs = importSchema("./schema.graphql");

// Load environment variables 
require("dotenv").config();

// Define resolvers map
const resolvers = {

  // Resolver map for Query type
  Query: {

    // Resolver for etherBalanceByAddress query
    etherBalanceByAddress: (root, _args, { dataSources }) => 
      dataSources.ethDataSource.etherBalanceByAddress(),

    // Resolver for totalSupplyOfEther query     
    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    // Resolver for latestEthereumPrice query
    latestEthereumPrice: (root, _args, { dataSources }) =>  
      dataSources.ethDataSource.getLatestEthereumPrice(),

    // Resolver for blockConfirmationTime query
    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create Apollo Server instance
const server = new ApolloServer({
  
  // Pass in schema and resolvers
  typeDefs,
  resolvers,

  // Set up data sources
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), 
  }),

});

// Disable timeouts and start server 
server.timeout = 0;
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`); 
});
