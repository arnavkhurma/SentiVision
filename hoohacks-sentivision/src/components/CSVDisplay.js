import React, { useEffect, useState } from 'react'
import csv from 'csv-parser'
import fs from 'fs'

function CSVReader () {
  const [data, setData] = useState([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < data.length - 1) {
        setIndex(index + 1)
      }
    }, 500)
    return () => clearInterval(interval)
  }, [index, data])

  useEffect(() => {
    const results = []
    fs.createReadStream('data.csv')
      .pipe(csv())
      .on('data', data => results.push(data))
      .on('end', () => {
        setData(results)
      })
  }, [])

  return (
    <div>
      <h2>CSV Reader</h2>
      <p>{`Row ${index + 1} of ${data.length}`}</p>
      <ul>
        {Object.keys(data[index] || {}).map(key => (
          <li key={key}>{`${key}: ${data[index][key]}`}</li>
        ))}
      </ul>
    </div>
  )
}

export default CSVReader
