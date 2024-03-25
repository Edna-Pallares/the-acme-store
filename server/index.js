const {
  client,
  createTables,
  createProduct,
  createUser,
  fetchUsers,
  fetchProducts,
  fetchFavorites,
  createFavorite,
  destroyFavorite,
} = require("./db");
const express = require("express");
const app = express();
app.use(express.json());

const init = async () => {
  await client.connect();
  console.log("connected to database");
  await createTables();
  console.log("tables created");
  const [ean, tom, lee, chips, books, drinks, pens] = await Promise.all([
    createUser({ username: "ean", password: "s3cr3t" }),
    createUser({ username: "tom", password: "s3cr3t!!" }),
    createUser({ username: "lee", password: "shhh" }),
    createProduct({ name: "chips" }),
    createProduct({ name: "books" }),
    createProduct({ name: "drinks" }),
    createProduct({ name: "pens" }),
  ]);
  const users = await fetchUsers();
  console.log(users);

  const products = await fetchProducts();
  console.log(products);

  const Favorites = await Promise.all([
    createFavorite({ user_id: ean.id, product_id: chips.id }),
    createFavorite({ user_id: ean.id, product_id: books.id }),
    createFavorite({ user_id: tom.id, product_id: drinks.id }),
    createFavorite({ user_id: lee.id, product_id: pens.id }),
  ]);

  console.log(await fetchFavorites(moe.id));
};

init();
