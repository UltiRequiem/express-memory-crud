import express from "express";

const itemsRouter = new express.Router();

let orderIdCounter = 1;

function createItem(title, completed = false, date = new Date()) {
  orderIdCounter++;

  return { title, completed, date, id: orderIdCounter };
}

function findItemById(id) {
  return data.find((item) => item.id === id);
}

const data = [
  createItem("Aprender Express", true),
  createItem("Escribir un libro", false),
  createItem("Vender el libro", false),
];

itemsRouter.get("/", (_request, response) => {
  response.json(data);
});

itemsRouter.get("/:id", (request, response) => {
  const desiredId = parseInt(request.params.id);

  const found = findItemById(desiredId);

  if (!found) {
    response.sendStatus(404);
  }

  response.json(found);
});

itemsRouter.post("/", (request, response) => {
  const title = request.body.title;

  if (!title) {
    response.json({ error: "No title provided" });
  }

  const newItem = createItem(title);

  data.push(newItem);

  response.status(201).json(newItem);
});

itemsRouter.put("/:id", (request, response) => {
  const id = parseInt(request.params.id);

  const found = findItemById(id);

  if (!found) {
    response.sendStatus(404);
  }

  const updated = {
    ...found,
    title: request.params.title,
    completed: request.params.completed,
  };

  const targetIndex = data.indexOf(found);

  data.splice(targetIndex, 1, updated);

  response.status(204).json(updated);
});

itemsRouter.delete("/:id", (request, response) => {
  const id = parseInt(request.params.id);

  const found = findItemById(id);

  if (!found) {
    response.sendStatus(404);
  }

  const targetIndex = data.indexOf(found);

  data.splice(targetIndex, 1);
});

export default itemsRouter;
