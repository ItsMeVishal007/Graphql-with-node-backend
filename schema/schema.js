const graphql = require("graphql");
const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLString },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then((response) => response.data);
      },
    },
  }),
});

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${parentValue.id}/users`)
          .then((resp) => resp.data);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then((resp) => resp.data);
      },
    },
    Company: {
      type: CompanyType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${args.id}`)
          .then((response) => response.data);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLString) },
        companyId: { type: GraphQLString },
      },
      resolve(parentValue, { firstName, age }) {
        return axios
          .post(`http://localhost:3000/users`, { firstName, age })
          .then((resp) => resp.data);
      },
    },

    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return axios
          .delete(`http://localhost:3000/users/${args.id}`)
          .then((resp) => resp.data);
      },
    },

    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return axios
          .patch(`http://localhost:3000/users/${args.id}`, {
            firstName: args.firstName,
            age: args.age,
          })
          .then((resp) => resp.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
