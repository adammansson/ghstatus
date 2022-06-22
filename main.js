const request = require('request-promise');

const statusButton = document.querySelector("#statusButton");
const tableBody = document.querySelector("#tableBody");

async function getStatus() {
    return await request('https://www.githubstatus.com/',  { json: true });
};

async function updateTable() {
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.lastChild);
    };

    getStatus().then(value => {
        value.components.forEach(component => {
            if (component["name"] != "Visit www.githubstatus.com for more information") {
                const row = document.createElement("tr");
                ["name", "status"].forEach(element => {
                    const cell = document.createElement("td");
                    cell.textContent = component[element];
                    row.appendChild(cell);
                });
                if (component["status"] == "operational") {
                    row.classList.add("table-success");
                } else {
                    row.classList.add("table-warning");
                }
                tableBody.appendChild(row);
            };
        });
    });
};

window.addEventListener("load", updateTable);
statusButton.addEventListener("click", updateTable);
