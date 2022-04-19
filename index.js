const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer, gql } = require("apollo-server");
const neo4j = require("neo4j-driver");

const typeDefs = gql`
    type Employee {
        name: String!
        emp_id: Int!
    }

    type CreateEmployeeMutationResponse {
    employees: [Employee!]!
    }

    type Mutation {
        createEmployees(input: [EmployeeCreateInput!]!): CreateEmployeeMutationResponse!
    }
`;

const AURA_ENDPOINT = 'neo4j+s://98627160.databases.neo4j.io';
const USERNAME = 'neo4j';
const PASSWORD = '26241002sWG*';

const driver = neo4j.driver(
    AURA_ENDPOINT,
    neo4j.auth.basic(USERNAME, PASSWORD)
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });


neoSchema.getSchema().then((schema) => {
    const server = new ApolloServer({
        schema,
    });
  
    server.listen().then(({ url }) => {
        console.log(`Server ready at ${url}`);
    });
  })