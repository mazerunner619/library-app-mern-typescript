import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Express, Request, Response } from "express";
import { expressMiddleware } from "@apollo/server/express4";
import resolvers from "./resolvers";
import typeDefs from "./typedefs";
import { GraphQLError } from "graphql";

export interface Context {
  req: Request;
  res: Response;
}

export const commonError = new GraphQLError("something went wrong!", {
  extensions: {
    code: "NOT FOUND",
    status: 500,
  },
});

export const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error: any) => {
    return {
      message: error.message,
      code: error.extensions?.code || "INTERNAL_SERVER_ERROR",
      status: error.extensions?.status || 500,
    };
  },
});

async function registerGraphQlRoute(app: Express) {
  await graphqlServer.start();
  app.use(
    "/graphql",
    expressMiddleware(graphqlServer, {
      context: async ({ req, res }): Promise<Context> => {
        return { req, res };
      },
    })
  );
}

export default registerGraphQlRoute;
