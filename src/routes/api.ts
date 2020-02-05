import express from "express";
import sourcesRouter from "./sources";

const apiRouter = express.Router();

apiRouter.use("/sources", sourcesRouter);

export default apiRouter;
