
let currentTable = "";
let columns = [];

function loadTable(table){

    currentTable = table;

    fetch(`/view/${table}`)
    .then(res => res.json())
    .then(data => {

        columns = data.columns;

        document.getElementById("title").innerText = table;

        // CREATE FORM
        let formHTML = "";

        columns.forEach(col => {
            formHTML += `
                <input id="${col}" placeholder="${col}">
            `;
        });

        document.getElementById("form").innerHTML = formHTML;

        // CREATE TABLE
        let tableHTML = "<table><tr>";

        columns.forEach(col => {
            tableHTML += `<th>${col}</th>`;
        });

        tableHTML += "</tr>";

        data.data.forEach(row => {
            tableHTML += "<tr>";
            row.forEach(cell => {
                tableHTML += `<td>${cell}</td>`;
            });
            tableHTML += "</tr>";
        });

        tableHTML += "</table>";

        document.getElementById("table").innerHTML = tableHTML;

    });

}


// INSERT DATA
function insertData(){

    let data = {};

    columns.forEach(col => {
        data[col] = document.getElementById(col).value;
    });

    fetch(`/insert/${currentTable}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        alert("Inserted Successfully!");
        loadTable(currentTable);
    });

}