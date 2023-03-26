// - access csv file through js script
// - repeat the following steps many times, with a 0.5s spacing between each:
//	- read the row of the csv file into a string
//	- split up the string into a list of 17 values
//	- for the top row of the display data table, display elements 10, 11 and 12 (they're all decimal numbers)
//	- for the second row of the display data table, display elements 13, 14, 15 (they're all decimal numbers)
//	- cosine similarity value is just going to be the 16th element in the row (it's going to be a decimal number)
//	- last element in the row (17th element) will be the final classification, and it's a string

function doSetTimeout(i) {
    setTimeout(function() { alert(i); }, 5000*i);
  }
  
  for (var i = 1; i <= 3; ++i)
    doSetTimeout(i);
	