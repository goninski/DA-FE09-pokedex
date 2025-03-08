// let fetchedData = {};
let items = [];
let itemsData = {};
let itemUrl = '';
let itemData = {};
let itemName = '';
let itemID = 0;
let itemImg = '';
let itemExperience = 0;
let itemHeight = 0;
let itemWeight = 0;
let itemSpecies = '';
let itemTypes = [];
let itemAbilites = [];
let itemColor = '';

const fetchBaseUrl = "https://pokeapi.co/api/v2/pokemon";
let fetchPath = '';
let fetchUrl = '';

function init() {
    fetchItems(16);
}

async function fetchDataFromUrl(fetchUrl) {
    let response = await fetch(fetchUrl);
    let fetchedData = await response.json();
    // console.log(fetchedData);
    return fetchedData;
}

async function renderListing(items) {
    let listingRef = document.getElementById('listing');
    listingRef.innerHTML = '';
    if(items) {
        for (let i = 0; i < items.length; i++) {
            fetchUrl = items[i].url;
            itemData = await fetchItemData(fetchUrl);
            let speciesData = await fetchSpeciesData(itemData.species.url);
            listingRef.innerHTML += getListingItemTemplate(i, itemData, speciesData);
            renderTypes(i, itemData.types);
        }
    }
}

async function renderTypes(i, types) {
    let typesWrapperRef = document.getElementById('typesWrapper-' + i);
    typesWrapperRef.innerHTML = '';
    if(types) {
        for (let i = 0; i < types.length; i++) {
            fetchUrl = types[i].type.url;
            let typesData = await fetchItemData(fetchUrl);
            typesWrapperRef.innerHTML += getTypesTemplate(i, typesData);
        }
    }
}



async function fetchItems(renderQty) {
    fetchPath = '/?limit=' + renderQty + '&offset=0'
    fetchUrl = fetchBaseUrl + fetchPath;
    let fetchedData = await fetchDataFromUrl(fetchUrl);
    if(fetchedData) {
        items = fetchedData.results;
        // console.log(items);
    }
    renderListing(items);
}

async function fetchItemData(fetchUrl) {
    let fetchedData = await fetchDataFromUrl(fetchUrl);
    if(fetchedData) {
        return fetchedData;
    }
}

async function fetchSpeciesData(fetchUrl) {
    let fetchedData = await fetchDataFromUrl(fetchUrl);
    if(fetchedData) {
        return fetchedData;
    }
}

async function fetchTypesData(fetchUrl) {
    let fetchedData = await fetchDataFromUrl(fetchUrl);
    if(fetchedData) {
        return fetchedData;
    }
}

function firstLetterUppercase(word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
}