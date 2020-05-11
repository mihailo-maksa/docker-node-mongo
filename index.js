const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
(async function connectDB() {
  try {
    await mongoose.connect(
      'your_mongoDB_connection_string',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})();

const Item = require('./models/Item');

app.get('/', async (req, res) => {
  try {
    const items = await Item.find();

    if (!items) {
      return res.status(404).json({ msg: 'No Items Found' });
    }

    res.render('index', { items });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});

app.post('/item/add', async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
    });

    await newItem.save();

    res.redirect('/');
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});

const port = 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
