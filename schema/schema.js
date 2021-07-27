const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const Users = [
  { id: "1", firstName: "Vishal", age: 20 },
  { id: "2", firstName: "Gaurav", age: 28 },
];

const UserType = new GraphQLObjectType({
  name: "User",
  id: { type: GraphQLString },
  firstName: { type: GraphQLString },
  age: { type: GraphQLInt },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return Users.find((d) => d.id === args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
