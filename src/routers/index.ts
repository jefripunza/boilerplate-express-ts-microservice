import { Router } from "express";
const app = Router();

app.get("/", (req, res) => {
    return res.send("welcome...");
});

export default app;
