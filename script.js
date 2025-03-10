// let fetchedData = {};
let items = [];
// let itemsData = {};
// let itemUrl = '';
// let itemData = {};
// let itemName = '';
// let itemID = 0;
// let itemImg = '';
// let itemExperience = 0;
// let itemHeight = 0;
// let itemWeight = 0;
// let itemSpecies = '';
// let itemTypes = [];
// let itemAbilites = [];
// let itemColor = '';

const fetchBaseUrl = "https://pokeapi.co/api/v2/pokemon";
let fetchPath = '';
let fetchUrl = '';

function init() {
    renderListing(16);
}

async function renderListing(renderQty) {
    items = await fetchItems(renderQty);
    let listingRef = document.getElementById('listing');
    listingRef.innerHTML = '';
    if(items) {
        for (let i = 0; i < items.length; i++) {
            itemData = await fetchData(items[i].url);
            let speciesData = await fetchData(itemData.species.url);
            listingRef.innerHTML += getListingItemTemplate(i, itemData, speciesData, items.length);
            renderTypes(i, itemData.types, 'cardItemTypesWrapper-' + i);
        }
    }
}

async function renderTypes(i, types, element) {
    let typesWrapperRef = document.getElementById(element);
    typesWrapperRef.innerHTML = '';
    if(types) {
        for (let i = 0; i < types.length; i++) {
            fetchUrl = types[i].type.url;
            let typesData = await fetchData(fetchUrl);
            typesWrapperRef.innerHTML += getTypesTemplate(i, typesData);
        }
    }
}

function openItemModal(i) {
    renderModalItem(i);
}

function previousModalItem(i, iLast) {
    if(i == 0) {
        i = iLast;
    }
    renderModalItem(i - 1);
}

function nextModalItem(i, iLast) {
    if(i == iLast - 1) {
        i = 0;
    }
    renderModalItem(i + 1);
}

async function renderModalItem(i) {
    itemData = await fetchData(items[i].url);
    let speciesData = await fetchData(itemData.species.url);
    document.getElementById('itemModal').style = '';
    document.getElementById('itemModalInner').innerHTML = getModalInnerTemplate(i, itemData, speciesData);
    document.body.style = 'overflow: hidden;';
    renderTypes(i, itemData.types, 'modalItemTypesWrapper-' + i);
}

function closeItemModal() {
    document.getElementById('itemModal').style = 'display: none';
    document.getElementById('itemModalInner').innerHTML = '';
    document.body.style = '';
}

function fetchItems(renderQty) {
    fetchPath = '/?limit=' + renderQty + '&offset=0'
    fetchUrl = fetchBaseUrl + fetchPath;
    return items = fetchData(fetchUrl, 'results');
}

async function fetchData(fetchUrl, objProp = null) {
    let response = await fetch(fetchUrl);
    let fetchedData = await response.json();
    // console.log(fetchedData);
    if(objProp) {
        return fetchedData[objProp];
    }
    return fetchedData;
}

function firstLetterUppercase(word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
}