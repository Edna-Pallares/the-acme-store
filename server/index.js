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
    const [ean, tom, lee, chips, books, drinks, pens] = await Promise.all([
      createUser({ username: 'ean', password: 's3cr3t' }),
      createUser({ username: 'tom', password: 's3cr3t!!' }),
      createUser({ username: 'lee', password: 'shhh' }),
      createProduct({ name: 'chips'}),
      createProduct({ name: 'books'}),
      createProduct({ name: 'drinks'}),
      createProduct({ name: 'pens'}),
    ]);
    console.log(ean.id);
    console.log(pens.id)
  
  };
  
  init();
  