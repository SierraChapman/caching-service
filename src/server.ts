import express from "express";
import Cache from "./cache";

const app: express.Application = express();
const PORT: number = 3000;
const cache: Cache = new Cache();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    if (typeof req.query.name === "string") {
        res.send(cache.fetch(req.query.name));
    } else {
        res.status(400).send({
            message: "This method requires the query parameter \"name\""
        });
    }
});

app.post("/", function (req, res) {
    cache.add(req.body.name, req.body.value);
    res.sendStatus(200);
});

app.delete("/", function (req, res) {
    if (typeof req.query.name === "string") {
        cache.remove(req.query.name);
        res.sendStatus(200);
    } else {
        res.status(400).send({
            message: "This method requires the query parameter \"name\""
        });
    }
});

app.listen(PORT, function () {
    console.log(`Caching service running on port ${PORT}`);
});
