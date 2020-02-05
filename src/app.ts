import 'dotenv/config';
import express from "express";
import apiRouter from './routes/api';

import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import winston from "winston";

// Create Express server
const app = express();

// Configure mongoose / mongo
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

// Configure logging
const logger = winston.createLogger({
    exitOnError: false,
    level: "info",
    transports: [
        new (winston.transports.Console)(),
    ]
});

class MyStream {
    write(text: string) {
        logger.info(text.substring(0, text.lastIndexOf("\n")));
    }
}

const myStream = new MyStream();

// You can set morgan to log differently depending on your environment
if (app.get("env") == "production") {
    app.use(morgan("common", { stream: myStream }));
} else {
    app.use(morgan("short", { immediate: true, stream: myStream }));
    app.use(morgan("short", { stream: myStream }));
}

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    }).catch(err => {
        console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
        // process.exit();
    });

// Express configuration
app.set("port", process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * API examples routes.
 */
app.use("/api", cors(), apiRouter);

export default app;
