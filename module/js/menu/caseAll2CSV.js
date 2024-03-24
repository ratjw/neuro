
import { sqlCaseAll } from "../model/sqlCaseAll.js"
import { Alert } from "../util/util.js"
import { pagination } from "../view/pagination.js"

export function caseAll2CSV() {
  sqlCaseAll().then(response => {
    typeof response === "object"
    ? pagination($("#dialogAll"), $("#alltbl"), response, "All Saved Cases")
    : Alert("caseAll", response)
	}).catch(error => alert(error.stack))
}

function downloadJSONAsCSV(endpoint) {
    // Fetch JSON data from the endpoint
    fetch(endpoint)
        .then(response => response.json())
        .then(jsonData => {
            // Convert JSON data to CSV
            let csvData = jsonToCsv(jsonData.items.data); // Add .items.data
            // Create a CSV file and allow the user to download it
            let blob = new Blob([csvData], { type: 'text/csv' });
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = 'data.csv';
            document.body.appendChild(a);
            a.click();
        })
        .catch(error => console.error(error));
}
function jsonToCsv(jsonData) {
    let csv = '';
    // Get the headers
    let headers = Object.keys(jsonData[0]);
    csv += headers.join(',') + '\n';
    // Add the data
    jsonData.forEach(function (row) {
        let data = headers.map(header => JSON.stringify(row[header])).join(','); // Add JSON.stringify statement
        csv += data + '\n';
    });
    return csv;
}

function jsonToCsv(items) {
  const header = Object.keys(items[0]);
  const headerString = header.join(',');
  // handle null or undefined values here
  const replacer = (key, value) => value ?? '';
  const rowItems = items.map((row) =>
    header
      .map((fieldName) => JSON.stringify(row[fieldName], replacer))
      .join(',')
  );
  // join header and body, and break into separate lines
  const csv = [headerString, ...rowItems].join('\r\n');
  return csv;
}
const obj = [
  { color: 'red', maxSpeed: 120, age: 2 },
  { color: 'blue', maxSpeed: 100, age: 3 },
  { color: 'green', maxSpeed: 130, age: 2 },
];
const csv = jsonToCsv(obj);
console.log(csv);
