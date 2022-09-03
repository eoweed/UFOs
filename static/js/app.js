// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
};

// 1. Create a variable to keep track of all the filters as an object.
filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {
    // 4a. Save the element that was changed as a variable.
    let changedInput = d3.select(this);
    // 4b. Save the value that was changed as a variable.
    let changedInputValue = changedInput.property("value");
    // 4c. Save the id of the filter that was changed as a variable.
    let changedInputID = changedInput.attr("id");
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (changedInputValue) {filters[changedInputID] = changedInputValue;}
    else {delete filters[changedInputID];}
    // console.log("filters Object: ", filters);
  
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  };
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    let filteredData = tableData
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
  
    // ------------------------    1st Attempt ------------------------
    // if (filters.datetime) {
    //   filteredData = filteredData.filter(row => row.datetime === filters.datetime);
    // };
    // if (filters.city) {
    //   filteredData = filteredData.filter(row => row.city === filters.city);
    // };
    // if (filters.state) {
    //   filteredData = filteredData.filter(row => row.state === filters.state);
    // };
    // if (filters.country) {
    //   filteredData = filteredData.filter(row => row.country === filters.country);
    // };
    // if (filters.shape) {
    //   filteredData = filteredData.filter(row => row.shape === filters.shape);
    // };

    // ------------------------    2nd Attempt (forEach loop) ------------------------
    Object.keys(filters).forEach(key=> {

        filteredData = filteredData.filter(row => row[key] === filters[key]);
      
      // console.log("key", key)
    }) 


    // console.log("filteredData", filteredData);


    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);

  };
  
  // 2. Attach an event to listen for changes to each filter
  d3.selectAll("input").on("change", updateFilters);
  
  // Build the table when the page loads
  buildTable(tableData);
