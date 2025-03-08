const FETCH_URL = "https://goninski-test-default-rtdb.europe-west1.firebasedatabase.app/";

let path = "/food";

function initData() {
    loadData(path);
    // putData(path, {"name": "Apple", "type": "fruit"});
    // putData(path, {"name": "Banana", "type": "fruit"});
    // putData(path, {"name": "Lemon", "type": "fruit"});
}

async function loadData(path) {
    let response = await fetch(FETCH_URL + path + ".json");
    dataObj = await response.json();
    console.log(dataObj);    
}

async function putData(path, data={}) {
    let response = await fetch(FETCH_URL + path + ".json",{
        method: "PUT",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    dataObj = await response.json();
    console.log(dataObj);    
}

async function postData(path, data={}) {
    let response = await fetch(FETCH_URL + path + ".json",{
        method: "POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    let responseToJson = await response.json();
    console.log(responseToJson);    
}

async function deleteData(path="x") {
    let response = await fetch(FETCH_URL + path + ".json",{
        method: "DELETE",
    });
    dataObj = await response.json();
}

function deleteAllData(path="") {
    deleteData(path);
}
