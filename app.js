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
    const token = req.headers.authorization?.replace("Bearer ", "");

    const account_context = req.headers.accountcontext;
    const budget_context = req.headers.budgetcontext;
    const group_context = req.headers.groupcontext;
    const group_budget_context = req.headers.groupbudgetcontext;

    if (account_context) req.account_id = account_context;
    if (budget_context) req.budget_id = budget_context;
    if (group_context) req.group_id = group_context;
    if (group_budget_context) req.group_budget_id = group_budget_context;

    if(!token) {
        next();
        return;
    }

    try {
        const decodedPayload = jwt.verify(token, JWT_SECRET);
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
                account_id: req.raw.account_id,
                budget_id: req.raw.budget_id,
                group_id: req.raw.group_id,
                group_budget_id: req.raw.group_budget_id,
            }
        }
    })
)

export default app;