
export function downloadJSONasCSV(jsonData, filename) {
  let csvData = jsonToCSV(jsonData);
  let blob = new Blob([csvData], { type: 'text/csv' });
  let url = window.URL.createObjectURL(blob);
  let a = document.createElement('a');

  a.href = url;
  a.download = 'data.csv';
  document.body.appendChild(a);
  a.click();
}

function jsonToCSV(jsonData) {
  let csv = '';

  // Get the headers
  let headers = Object.keys(jsonData[0]);

  csv += headers.join(',') + '\n';
  jsonData.forEach(function (row) {
    let data = headers.map(header => JSON.stringify(row[header])).join(',')
    csv += data + '\n'
  })

  return csv;
}
