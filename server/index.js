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

//Routes
app.get('/api/users', async(req, res, next)=> {
  try {
    res.send(await fetchUsers());
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/products', async(req, res, next)=> {
  try {
    res.send(await fetchProducts());
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/users/:id/favorites', async(req, res, next)=> {
  try {
    res.send(await fetchFavorites(req.params.id));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/users/:id/favorites', async(req, res, next)=> {
  try {
    res.status(201).send(await createFavorite({ user_id: req.params.id, product_id: req.body.product_id}));
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/users/:userId/favorites/:id', async(req, res, next)=> {
  try {
    await destroyFavorite({ id: req.params.id, user_id: req.params.userId });
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

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

  console.log(await fetchFavorites(ean.id));
  await destroyFavorite(userFavorite[0].id);
  console.log(await fetchFavorites(ean.id));

  const port = process.env.PORT || 3000;
  app.listen(port, ()=> console.log(`listening on port ${port}`));
};

init();
