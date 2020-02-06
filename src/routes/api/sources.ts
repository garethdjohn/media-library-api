import express, {
    Request,
    Response,
    NextFunction
} from "express";
import createError from "http-errors";
import { Source } from "../../models/Source";

const sourcesRouter = express.Router();

async function getSource(req: Request, res: Response, next: NextFunction) {
    try {
        const source = await Source.findById(req.params.sourceId).exec();
        if (source) {
            res.locals.source = source;
            next();
        } else {
            next(createError(404));
        }
    } catch (error) {
        next(createError(500, error));
    }
}

sourcesRouter.get('/', async (req, res, next) => {
    try {
        const sources = await Source.find({}).exec();
        res.status(200).json(sources).end();
    } catch (error) {
        next(createError(500, error))
    }
});

sourcesRouter.get('/:sourceId', getSource, async (req, res, next) => {
    res.status(200).json(res.locals.source).end();
});

sourcesRouter.post('/', async (req, res, next) => {
    try {
        const source = new Source({
            name: req.body.name,
            path: req.body.path
        });
        await source.save();
        res.status(201).json(source).end();
    } catch (error) {
        next(createError(500, error));
    }
});

export default sourcesRouter;
