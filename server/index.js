const { 
    client,
    createTables,
    createProduct,
    createUser,
    fetchUsers,
    fetchProducts,
    fetchFavorites,
    createFavorites,
    destroyFavorite
 } = require('./db');
const express = require('express');
const app = express();
app.use(express.json());

const init = async()=> {
  await client.connect();
  console.log('connected to database');
  await createTables();
  console.log('tables created');
};

init();