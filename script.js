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

function init() {
    fetchItems(6);
}

async function fetchItems(renderQty) {
    fetchPath = '/?limit=' + renderQty + '&offset=0'
    let response = await fetch(fetchBaseUrl + fetchPath);
    let fetchedData = await response.json();
    if(fetchedData) {
        items = fetchedData.results;
        console.log(items);
    }
    renderListing();
}

async function renderListing() {
    let listingRef = document.getElementById('listing');
    listingRef.innerHTML = '';
    if(items) {
        for (let i = 0; i < items.length; i++) {
            itemUrl = items[i].url;
            // console.log(itemUrl);
            await fetchItemData(itemUrl);
            // console.log(itemName);
            listingRef.innerHTML += getListingItemTemplate();
        }
    }
}

async function fetchItemData(itemUrl) {
    let response = await fetch(itemUrl);
    let fetchedData = await response.json();
    // console.log(fetchedData);
    if(fetchedData) {
        itemData = fetchedData;
        setItemProps(itemData);
    }
}

async function setItemProps(itemData) {
    itemID = itemData.id;
    itemName = itemData.name;
    itemImg = itemData.sprites.front_default;
    itemHeight = itemData.height;
    itemWeight = itemData.weight;
    itemExperience = itemData.base_experience;
    itemSpecies = itemData.species.name;
    itemTypes = itemData.types;
    itemAbilites = itemData.abilities;
    itemColor = '';
}
