const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  id: { type: GraphQLString },
  firstName: { type: GraphQLString },
  age: { type: GraphQLInt },
});


const RootQuery = new GraphQLObjectType({
  name : 'RootQueryType',
  fields: {
    
  }
})