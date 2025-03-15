const fetchBaseUrl = "https://pokeapi.co/api/v2/pokemon";
let fetchUrl = '';
let fetchQtyMax = 20;
let fetchQty = 0;
let fetchIndexStart = 0;
let fetchIndexEnd = 0;
let renderCall = 1;
let loadMoreStyle = '';

let fetchedItems = [];
let filteredItems = [];
let itemPool = [];
let renderedItems = [];
let itemsToRender = [];
let totalPoolItems = 0;

async function init() {
    await fetchItems(9999);
    loadListing();
}

async function fetchItems(renderQty) {
    fetchUrl = fetchBaseUrl + '/?limit=' + renderQty + '&offset=0';
    fetchedItems = await fetchData(fetchUrl, 'results');
}

async function fetchData(fetchUrl, objProp = null) {
    try{
        let response = await fetch(fetchUrl);
        if(! response.ok) {
            throw new Error("Fetching not possible! (Status: " + response.status + ")");
        }
        let fetchedData = await response.json();
        if(objProp) {
            return fetchedData[objProp];
        }
        return fetchedData;
    }
    catch(error) {
        console.error(error);
    }
}

function getSearchInput() {
    let searchInputRef = document.getElementById('searchInput');
    return searchVal = searchInputRef.value.toLowerCase();
}

async function validateSearchInput(event) {
    let searchVal = getSearchInput();
    renderCall = 1;
    if(searchVal.length >= 3) {
        return await loadListing('search');
    }
    if(searchVal.length > 0) {
        document.getElementById('listing').innerHTML = '';
        document.getElementById('loadMore').style = 'display: none;';
        return;
    }
    return await loadListing();
}

async function loadListing(source='initial') {
    let searchVal = getSearchInput();
    switch(source) {
        case "search":
            break;
        case "load-more":
            renderCall++;
            if(searchVal.length >= 3) {
                source = 'search';
            }
            break;
    }
    await renderListing(source, searchVal);
}

async function renderListing(source, searchVal) {
    let listingRef = document.getElementById('listing');
    setItemPool(source, searchVal);
    setIndexStart(listingRef);
    setIndexEnd();
    renderedItems = itemPool.slice(0, fetchIndexEnd + 1);
    itemsToRender = renderedItems.slice(fetchIndexStart, fetchIndexEnd + 1);
    setLoadingAnim('before');
    await renderItems(listingRef, itemsToRender, fetchQty, fetchIndexStart - 1);
    setLoadingAnim('after');
}

function setItemPool(source, searchVal) {
    itemPool = fetchedItems;
    if(source == 'search') {
        filteredItems = fetchedItems.filter(item => item.name.includes(searchVal));
        itemPool = filteredItems;
    }
    totalPoolItems = itemPool.length;
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
        loadMoreStyle = 'display: none;'
    } else if(fetchIndexEnd >= totalPoolItems - 1) {
        fetchIndexEnd = totalPoolItems - 1;
        loadMoreStyle = 'display: none;'
        fetchQty = fetchIndexEnd - fetchIndexStart + 1;
    } else {
        loadMoreStyle = '';
    }
}

function setLoadingAnim(moment) {
    let loadMoreBtnRef = document.getElementById('loadMore');
    let spinnerRef = document.getElementById('spinnerWrapper');
    loadMoreBtnRef.style = loadMoreStyle;
    if(moment == 'before') {
        loadMoreBtnRef.disabled = true;
        spinnerRef.style = '';
    } else {
        loadMoreBtnRef.disabled = false;
        spinnerRef.style = 'display: none;';
        scrollToNewLoaded();
    }
}

function scrollToNewLoaded() {
    if(renderCall > 1) {
        window.scrollBy(0, window.innerHeight - 580);
    }
}

async function renderItems(listingRef, items, fetchQty, indexFull) {
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

async function renderModalItem(i) {
    itemData = await fetchData(renderedItems[i].url);
    let speciesData = await fetchData(itemData.species.url);
    document.getElementById('itemModal').style = '';
    document.getElementById('itemModalInner').innerHTML = getModalInnerTemplate(i, itemData, speciesData, renderedItems.length - 1);
    document.body.style = 'overflow: hidden;';
    await renderItemMoves(itemData.moves, 'modalItemMovesListing-' + i);
    await renderItemTypes(itemData.types, 'modalItemTypesWrapper-' + i);
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

async function renderItemMoves(moves, element) {
    let movesWrapperRef = document.getElementById(element);
    movesWrapperRef.innerHTML = '';
    if(moves) {
        for (let i = 0; i < moves.length; i++) {
            let movesData = moves[i].move;
            movesWrapperRef.innerHTML += getMovesTemplate(movesData, i);
        }
    }
    document.getElementById(element + '-Dupl').innerHTML = movesWrapperRef.innerHTML;
    let animSpeed = (movesWrapperRef.offsetWidth / 40) + 's';
    document.getElementById('modalItemMovesWrapper').style = '--anim-speed: ' + animSpeed + ';';
}

function openItemModal(i) {
    renderModalItem(i);
}

function previousModalItem(event, i, iLast) {
    if(i <= 0) {
        i = iLast;
    } else {
        i--;
    }
    renderModalItem(i);
    event.stopPropagation();
}

function nextModalItem(event, i, iLast) {
    if(i == iLast) {
        i = 0;
    } else {
        i++;
    }
    event.stopPropagation();
    renderModalItem(i);
}

function closeItemModal() {
    document.getElementById('itemModal').style = 'display: none';
    document.getElementById('itemModalInner').innerHTML = '';
    document.body.style = '';
}

function stopPropagation(event) {
    event.stopPropagation();
}

function firstLetterUppercase(word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
}
