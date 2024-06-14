const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Investment = require('./models/Investment');

function capitalizeName(name) {
  if (!name) return '';
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Connect to MongoDB
mongoose.connect('mongodb+srv://danielsalazarhanna:ivdajomasa4@cluster0.xx7ciq8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Print the current working directory
console.log('Current working directory:', __dirname);

// Read and process JSON file
fs.readFile(path.join(__dirname, 'cleaned_new_data.json'), 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading JSON file:', err);
    return;
  }

  try {
    const items = JSON.parse(data);
    const batchSize = 100;
    let batch = [];

    items.forEach((itemData, index) => {
      const item = new Investment({
        location: capitalizeName(itemData['Location']),
        time: itemData['Time'],
        hospitalStay: parseFloat(itemData['Hospital_Stay']),
        mriUnits: parseFloat(itemData['MRI_Units']),
        ctScanners: parseFloat(itemData['CT_Scanners']),
        hospitalBeds: parseFloat(itemData['Hospital_Beds']),
      });

      batch.push(item);

      if (batch.length === batchSize || index === items.length - 1) {
        Investment.insertMany(batch)
          .then(() => {
            console.log(`Batch of ${batch.length} items imported.`);
          })
          .catch(error => {
            console.error('Error importing batch:', error);
          })
          .finally(() => {
            if (index === items.length - 1) {
              mongoose.connection.close()
                .then(() => console.log('MongoDB connection closed'))
                .catch(err => console.log('Error closing MongoDB connection:', err));
            }
          });

        batch = [];
      }
    });

    console.log('JSON file successfully processed');
  } catch (error) {
    console.error('Error parsing JSON file:', error);
    mongoose.connection.close()
      .then(() => console.log('MongoDB connection closed'))
      .catch(err => console.log('Error closing MongoDB connection:', err));
  }
});
