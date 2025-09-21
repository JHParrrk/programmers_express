const express = require("express");
const app = express();
const port = 3000;

let products = {
  1: { name: "Laptop", price: 1000, des: "A high performance laptop" },
  2: { name: "Phone", price: 500, des: "A smartphone with great features" },
  3: { name: "Tablet", price: 300, des: "A lightweight tablet" },
};

app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const product = products[id];
  if (product) {
    res.send(
      `Product id is: ${id}, Name is: ${product.name}, Price is: ${product.price}, Description is: ${product.des}`
    );
  } else {
    res.status(404).send("Product not found");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
