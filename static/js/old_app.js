// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody"); 

function buildTable(data) {
    // clear data that's already in the table
    tbody.html("");

    // create forEach loop to add UFO data to the table
    data.forEach((dataRow) => {
        // create <tr> tag for each row
        // <tr> refers to "table row"
        let row = tbody.append("tr");

        // grab values for each row and add the text to the table cell
        // add <td> tag to refer to each table cell
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);

        }); 

    });
}

// add filters to table if there is a click on the webpage
function handleClick() {
    // filter by date
    //select value inside UFO data that has #datetime id
    let date = d3.select("#datetime").property("value");
    let filteredData = tableData;

    // if user filters by date, display data from only that date
    if (date) {
        filteredData = filteredData.filter(row => row.datetime === date);
    };

    // rebuild the table using only the filtered data
    // if no date was entered, then original table will be displayed
    buildTable(filteredData);
};

// listen for a click on the webpage
// if user clicks the '#filter-btn', then run the function above
d3.selectAll("#filter-btn").on("click", handleClick);

// make sure the full table is displayed when webpage first loads
buildTable(tableData);