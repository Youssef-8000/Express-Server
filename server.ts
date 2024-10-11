import express, { Request, Response } from "express";
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

const cardRouter = require("./routes/Cards");

app.use("/cards", cardRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
