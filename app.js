import { createHandler } from "graphql-http/lib/use/express";
import express from 'express';
import { GraphQLSchema } from 'graphql'
import queryType from './graphql/rootTypes/queryType.js'
import mutationType from './graphql/rootTypes/mutationType.js'
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "./constants.js";

const app = express();

const schema = new GraphQLSchema({ 
    query: queryType,
    mutation: mutationType 
})


const jwtMiddleware = (req, res, next) => {
    console.log('Inside MIDDLEWARE!!');
    const token = req.headers.authorization?.replace("Bearer ", "");

    console.log("Received token:", token);

    if(!token) {
        next();
        return;
    }

    try {
        const decodedPayload = jwt.verify(token, JWT_SECRET);
        console.log('decodedPayload', decodedPayload);
        req.user_id = decodedPayload.user_id;
        next();
    } catch(e) {
        console.log("Invalid Token", e);
        next();
    }
}

app.get((req, res) => {
    res.send("ok");
})

app.all(
    "/graphql",
    jwtMiddleware,
    createHandler({
        schema: schema,
        context: (req) => {
            return {
                user_id: req.raw.user_id,
            }
        }
    })
)

export default app;