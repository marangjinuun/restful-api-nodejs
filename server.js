const express = require('express');
const app = express();
const mongoose = require('mongoose');

// include Model
const Product = require('./models/product');
const User = require('./models/user');

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/MongoDB', { useNewUrlParser: true })
mongoose.connection.on('error', err => {
    console.error('MongoDB error', err)
  });

//************************************************************************** */
//      Products
//************************************************************************** */
// mock data
const products = [{}];
const users = [{}];

app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.json(products)
  });
app.get('/products/:id', async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    res.json(product)
  });
app.post('/products', async (req, res) => {
    const payload = req.body
    const product = new Product(payload)
    await product.save()
    res.status(201).end()
  });
app.put('/products/:id', async (req, res) => {
    const payload = req.body
    const { id } = req.params
  
    const product = await Product.findByIdAndUpdate(id, { $set: payload })
    res.json(product)
  });
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params
  
    await Product.findByIdAndDelete(id)
    res.status(204).end()
  });

//************************************************************************** */
//      Users
//************************************************************************** */
app.get('/users', async (req, res) => {
    const users = await User.find({})
    res.json(users)
  });
app.get('/users/:id', async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    res.json(user)
  });
app.post('/users', async (req, res) => {
    const payload = req.body
    const user = new User(payload)
    await user.save()
    res.status(201).end()
  });
app.put('/users/:id', async (req, res) => {
    const payload = req.body
    const { id } = req.params
  
    const user = await User.findByIdAndUpdate(id, { $set: payload })
    res.json(user)
  });
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params
  
    await User.findByIdAndDelete(id)
    res.status(204).end()
  });

//************************************************************************** */
//      Index
//************************************************************************** */
app.get('/', (req, res) => {
  res.json({ message: 'Marangjinuun!' })
});
//************************************************************************** */

app.listen(9000, () => {
  console.log('Application is running on port 9000')
});
