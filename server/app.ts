import express from "express";
import moveController from "./modules/move/moveController";

const app = express();

app.get('/', (req, res) => res.send('Express + TypeScript Server working properly'));
app.get('/move', (req, res) => res.send(moveController(req, res)));


export default app