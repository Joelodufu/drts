const fs = require('fs');
const csv = require('csv-parser');

const csvFilePath = '../aproved.csv'; // Replace with the path to your CSV file
const jsonFilePath = 'output.json'; // Replace with the desired JSON output file path

const jsonData = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    jsonData.push(row);
  })
  .on('end', () => {
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
    console.log(`CSV file "${csvFilePath}" has been converted to JSON file "${jsonFilePath}"`);
  });
