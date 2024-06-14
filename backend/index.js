const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Investment = require('./models/Investment');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://danielsalazarhanna:ivdajomasa4@cluster0.xx7ciq8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Get all investments
app.get('/api/investments', async (req, res) => {
  try {
    const investments = await Investment.find();
    res.json(investments);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Create a new investment
app.post('/api/investments', async (req, res) => {
  try {
    const newInvestment = new Investment(req.body);
    await newInvestment.save();
    res.status(201).send(newInvestment);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update an investment
app.put('/api/investments/:id', async (req, res) => {
  try {
    const updatedInvestment = await Investment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(updatedInvestment);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete an investment
app.delete('/api/investments/:id', async (req, res) => {
  try {
    await Investment.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
