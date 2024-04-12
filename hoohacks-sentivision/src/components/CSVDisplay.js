// Importing React hooks, csv-parser for parsing CSV files, and fs for file system operations
import React, { useEffect, useState } from 'react';
import csv from 'csv-parser';
import fs from 'fs';

// CSVReader component for reading and displaying data from a CSV file
function CSVReader() {
  // State for storing the parsed data and the current index
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  // Effect hook to cycle through data rows every 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      // Increment index if it's less than the length of the data array
      if (index < data.length - 1) {
        setIndex(index + 1);
      }
    }, 500);
    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [index, data]);

  // Effect hook to read and parse the CSV file on component mount
  useEffect(() => {
    const results = []; // Temporary array to store the parsed data
    fs.createReadStream('data.csv') // Create a readable stream from the CSV file
      .pipe(csv()) // Pipe the stream through the csv-parser
      .on('data', (data) => results.push(data)) // Push each row of data to the results array
      .on('end', () => {
        setData(results); // Update the state with the parsed data
      });
  }, []);

  // Render the CSV data in a list
  return (
    <div>
      <h2>CSV Reader</h2>
      <p>{`Row ${index + 1} of ${data.length}`}</p>
      <ul>
        {/* Map over the keys of the current data object and render them in a list */}
        {Object.keys(data[index] || {}).map((key) => (
          <li key={key}>{`${key}: ${data[index][key]}`}</li>
        ))}
      </ul>
    </div>
  );
}

// Export the CSVReader component
export default CSVReader;
