import express, { Request, Response } from "express";
const fs = require("fs");

type Card = {
  title: string,
  priceRange: {
    first: number,
    second?: number
  },
  image: string,
  hot: boolean,
  discount: number,
  sale: boolean,
  new: boolean,
  id?: string
}

const isValidCard = (data: any): data is Card => {
  return (
    typeof data.title === "string" &&
    typeof data.priceRange?.first === "number" &&
    (data.priceRange.second === undefined || typeof data.priceRange.second === "number") &&
    typeof data.image === "string" &&
    typeof data.hot === "boolean" &&
    typeof data.discount === "number" &&
    typeof data.sale === "boolean" &&
    typeof data.new === "boolean"
  );
};

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  var data = fs.readFileSync("./routes/CardsData.json");
  var Cards = JSON.parse(data);
  res.json(Cards);
});

router.post("/add", (req: Request, res: Response) => {
  const incomingData = req.body;

  if (!isValidCard(incomingData)) {
    res.status(400).send("Invalid card data");
    return;
  }

  var dataFromFile = fs.readFileSync("./routes/CardsData.json");
  var Cards: Card[] = JSON.parse(dataFromFile);

  Cards.push({ ...incomingData, id: `${Cards.length + 1}` });

  var updatedData = JSON.stringify(Cards);
  fs.writeFile("./routes/CardsData.json", updatedData, (err: any) => {
    if (err) {
      res.send("POST request failure");
      throw err;
    }
    res.send("POST request Success");
  });
});

module.exports = router;
