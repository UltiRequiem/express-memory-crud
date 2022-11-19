import express from "express";

import itemsRouter from "./routes.js";

const app = express();

app.use(express.json());

app.use("/items", itemsRouter);

app.use("/", (_request, response) => {
  response.send("Hello, world!");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
