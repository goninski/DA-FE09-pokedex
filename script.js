const fetchBaseUrl = "https://pokeapi.co/api/v2/pokemon";
let fetchUrl = '';
let fetchQtyMax = 20;
let fetchQty = 0;
let fetchIndexStart = 0;
let fetchIndexEnd = 0;
let renderCall = 1;
let renderType = 'all';
let buttonStyle = 'display: none;';

let allItems = [];
let filteredItems = [];
let itemPool = [];
let renderedItems = [];
let items = [];
let totalPoolItems = 0;

async function init() {
    await fetchAllItems(9999);
    renderListing();
}

async function fetchAllItems(renderQty) {
    fetchUrl = fetchBaseUrl + '/?limit=' + renderQty + '&offset=0';
    allItems = await fetchData(fetchUrl, 'results');
}

async function fetchData(fetchUrl, objProp = null) {
    try{
        let response = await fetch(fetchUrl);
        if(! response.ok) {
            throw new Error("Fetching not possible! (Status: " + response.status + ")");
        }
        let fetchedData = await response.json();
        // console.log(fetchedData);
        if(objProp) {
            return fetchedData[objProp];
        }
        return fetchedData;
    }
    catch(error) {
        console.error(error);
    }
}

function liveSearch() {
    let searchInputRef = document.getElementById('searchInput');
    let searchVal = searchInputRef.value;
    if(searchVal.length >= 3) {
        renderCall = 0;
        renderType = 'search';
        renderListing(searchVal);
    }
    else if(searchVal == '') {
        renderType = 'all';
        renderListing();
    }
}

function loadMoreItems() {
    let searchInputRef = document.getElementById('searchInput');
    let searchVal = searchInputRef.value;
    renderCall++;
    if(searchVal) {
        renderType = 'search';
        renderListing(searchVal);
    } else {
        renderType = 'all';
        renderListing();
    }
}

async function renderListing(searchVal=null) {
    let listingRef = document.getElementById('listing');
    let loadMoreBtnRef = document.getElementById('loadMore');
    loadMoreBtnRef.style = buttonStyle;
    setItemPool(searchVal);
    setIndexStart(listingRef);
    setIndexEnd();
    // console.log('b): ' + fetchIndexStart + ' / ' + fetchIndexEnd + ' / ' + fetchQty);
    renderedItems = itemPool.slice(0, fetchIndexEnd + 1);
    items = renderedItems.slice(fetchIndexStart, fetchIndexEnd + 1);
    await renderItems(listingRef, items, fetchQty, fetchIndexStart - 1);
    loadMoreBtnRef.style = buttonStyle;
}

async function setItemPool(searchVal) {
    itemPool = allItems;
    totalPoolItems = itemPool.length;
    if(renderType == 'search') {
        filteredItems = allItems.filter(item => item.name.includes(searchVal));
        itemPool = filteredItems;
    }
}

async function setRenderPresets(searchVal=null) {
    itemPool = allItems;
    if(renderType == 'search') {
        filteredItems = allItems.filter(item => item.name.includes(searchVal));
        itemPool = filteredItems;
    }
    await renderListing();
}

function setIndexStart(listingRef) {
    fetchQty = fetchQtyMax;
    if(totalPoolItems <= 0) {
        listingRef.innerHTML = '';
        fetchIndexStart = 0;
        fetchQty = 0;
    } else if(renderCall <= 1) {
        listingRef.innerHTML = '';
        fetchIndexStart = 0;
    } else {
        fetchIndexStart = fetchIndexEnd + 1;
    }
}

function setIndexEnd() {
    fetchIndexEnd = fetchIndexStart + fetchQty - 1;
    if(totalPoolItems <= 0) {
        fetchIndexEnd = 0;
    } else if(fetchIndexEnd >= totalPoolItems - 1) {
        fetchIndexEnd = totalPoolItems - 1;
        buttonStyle = 'display: none;'
        fetchQty = fetchIndexEnd - fetchIndexStart + 1;
    } else {
        buttonStyle = '';
    }
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

async function renderModalItem(i) {
    console.log('current i: ' + i);
    itemData = await fetchData(renderedItems[i].url);
    let speciesData = await fetchData(itemData.species.url);
    document.getElementById('itemModal').style = '';
    document.getElementById('itemModalInner').innerHTML = getModalInnerTemplate(i, itemData, speciesData, renderedItems.length - 1);
    document.body.style = 'overflow: hidden;';
    renderItemTypes(itemData.types, 'modalItemTypesWrapper-' + i);
}

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

function closeItemModal() {
    document.getElementById('itemModal').style = 'display: none';
    document.getElementById('itemModalInner').innerHTML = '';
    document.body.style = '';
}

function firstLetterUppercase(word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
}