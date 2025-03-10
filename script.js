let allItems = [];
let totalItems = 0;
let renderedItems = [];
let items = [];
let buttonStyle = '';

const fetchBaseUrl = "https://pokeapi.co/api/v2/pokemon";
let fetchPath = '';
let fetchUrl = '';
let fetchQty = 20;
let fetchIndexStart = 0;
let fetchIndexEnd = 0;
let renderCall = 0;

async function init() {
    await fetchAllItems(100);
    renderListing();
    // let searchInput = document.getElementById('searchInput').value;
    // console.log(searchInput);
    //renderListing(0, 'fsjldfkjs');
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

async function fetchAllItems(renderQty) {
    fetchUrl = fetchBaseUrl + '/?limit=' + renderQty + '&offset=0';
    allItems = await fetchData(fetchUrl, 'results');
    totalItems = allItems.length;
}

async function renderListing() {
    let listingRef = document.getElementById('listing');
    setRenderCallParam(listingRef);
    console.log(fetchIndexStart + ' / ' + fetchIndexEnd + ' / ' + fetchQty);
    renderedItems = allItems.slice(0, fetchIndexEnd + 1);
    items = renderedItems.slice(fetchIndexStart, fetchIndexEnd + 1);
    await renderItems(listingRef, items, fetchQty, fetchIndexStart - 1);
    document.getElementById('loadMore').style = buttonStyle;
}

async function renderItems(listingRef, items, fetchQty, indexFull) {
    document.getElementById('loadMore').style = '';
    if(items) {
        for (let i = 0; i < fetchQty; i++) {
            itemData = await fetchData(items[i].url);
            let speciesData = await fetchData(itemData.species.url);
            indexFull++;
            listingRef.innerHTML += getListingItemTemplate(itemData, speciesData, indexFull);
            renderItemTypes(itemData.types, 'cardItemTypesWrapper-' + indexFull);
        }
    }
}

async function renderItemTypes(types, element) {
    let typesWrapperRef = document.getElementById(element);
    typesWrapperRef.innerHTML = '';
    if(types) {
        for (let i = 0; i < types.length; i++) {
            fetchUrl = types[i].type.url;
            let typesData = await fetchData(fetchUrl);
            typesWrapperRef.innerHTML += getTypesTemplate(typesData);
        }
    }
}

function setRenderCallParam(listingRef) {
    document.getElementById('loadMore').style = buttonStyle;
    renderCall = renderCall + 1;
    if(renderCall <= 1) {
        listingRef.innerHTML = '';
        fetchIndexStart = 0;
    } else {
        fetchIndexStart = fetchIndexEnd + 1;
    }
    fetchIndexEnd = fetchIndexStart + fetchQty - 1;
    if(fetchIndexEnd >= totalItems - 1) {
        fetchIndexEnd = totalItems - 1;
        fetchQty = fetchIndexEnd - fetchIndexStart + 1;
        buttonStyle = 'display: none;'
    } else {
        buttonStyle = '';
    }
}

// function checkSetIndexEnd() {
//     document.getElementById('loadMore').style = '';
//     fetchIndexEnd = fetchIndexStart + fetchQty - 1;
//     if(fetchIndexEnd > totalItems - 1) {
//         fetchQty = fetchIndexEnd - totalItems - 1;
//         fetchIndexEnd = totalItems - 1;
//         document.getElementById('loadMore').style = 'display: none;';
//     }
// }

// async function renderListingSearch(startItem, searchInput=null) {
//     let listingRef = document.getElementById('listing');
//     listingRef.innerHTML = '';
//     if(searchInput) {
//         // items = allItems;
//         items = allItems.filter(item => item.name.includes(searchInput));
//         await renderItems(listingRef, items, fetchIndexStart, fetchIndexEnd);
//     }
// }

function openItemModal(i) {
    renderModalItem(i);
}

function previousModalItem(i, iLast) {
    if(i <= 0) {
        i = iLast;
    } else {
        i = i - 1;
    }
    renderModalItem(i);
}

function nextModalItem(i, iLast) {
    if(i == iLast - 1) {
        i = 0;
    } else {
        i++;
    }
    renderModalItem(i);
}

async function renderModalItem(i) {
    console.log('current i: ' + i);
    itemData = await fetchData(items[i].url);
    let speciesData = await fetchData(itemData.species.url);
    document.getElementById('itemModal').style = '';
    document.getElementById('itemModalInner').innerHTML = getModalInnerTemplate(i, itemData, speciesData, items.length - 1);
    document.body.style = 'overflow: hidden;';
    renderTypes(i, itemData.types, 'modalItemTypesWrapper-' + i);
}

function closeItemModal() {
    document.getElementById('itemModal').style = 'display: none';
    document.getElementById('itemModalInner').innerHTML = '';
    document.body.style = '';
}

function firstLetterUppercase(word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
}