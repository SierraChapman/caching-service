import express, { query } from "express";
import Cache from "./cache";

const app: express.Application = express();
const PORT: number = 3000;
const cache: Cache = new Cache(5);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    if (typeof req.query.name !== "string") {
        res.status(400).json({
            message: "This method requires the query parameter 'name'"
        });
        return;
    }

    const value = cache.fetch(req.query.name);
    
    if (value === undefined) {
        res.status(404).json({
            message: "No value associated with that name"
        });
    } else {
        res.status(200).json({ value });
        cache.print();
    }
});

app.post("/", function (req, res) {
    cache.add(req.body.name, req.body.value);
    res.sendStatus(200);

    cache.print();
});

app.delete("/", function (req, res) {
    if (typeof req.query.name !== "string") {
        res.status(400).json({
            message: "This method requires the query parameter 'name'"
        });
        return;
    }

    const removed = cache.remove(req.query.name);
    
    if (removed) {
        res.sendStatus(200);
        cache.print();
    } else {
        res.status(404).json({
            message: "No value associated with that name"
        });
    }
});

app.listen(PORT, function () {
    console.log(`Caching service running on port ${PORT}`);
});
