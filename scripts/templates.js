function getListingItemTemplate(itemData, speciesData, indexFull) {
    let itemID = itemData.id;
    let itemName = firstLetterUppercase(itemData.name);
    let itemImg = itemData.sprites.front_default;
    let itemColor = speciesData.color.name;

    return `
        <div class="item-card pos-relative p-card" onclick="openItemModal(${indexFull})">
            <div class="item-card-bg bg-${itemColor} pos-absolute expand" style="background-color: ${itemColor}"></div>    
            <div class="img-wrapper flex-col pos-relative">
                <img src="${itemImg}" alt="" class="img-contain expand xpos-absolute">
            </div>
            <div class="content-wrapper flex-col align-center gap">
                <h3 class="title">#${itemID}&ensp;${itemName}</h3>
                <div id="cardItemTypesWrapper-${indexFull}" class="types-wrapper flex-row gap-05 mb-05"></div>
            </div>
        </div>
    `;
}

function getModalInnerTemplate(i, itemData, speciesData, iLast) {
    let itemID = itemData.id;
    let itemName = firstLetterUppercase(itemData.name);
    let itemDescription = speciesData.flavor_text_entries[0].flavor_text;
    let itemImg = itemData.sprites.front_default;
    let itemColor = speciesData.color.name;
    itemHeight = itemData.height;
    itemWeight = itemData.weight;
    itemExperience = itemData.base_experience;
    itemSpecies = itemData.species.name;
    itemAbilites = itemData.abilities;

    return `
        <button id="itemModalClose" class="modal-close pos-absolute" onclick="closeItemModal()">
            <img src="assets/icons/google-close-white.svg" alt="close-icon" title="close modal">
        </button>

        <div id="ModalItem" class="modal-item bg-${itemColor}" style="background-color: ${itemColor}" onclick="stopPropagation(event)">
            <div class="img-wrapper flex-col pos-relative">
                <img src="${itemImg}" alt="" class="img-contain expand xpos-absolute">
            </div>
            <div class="content-wrapper flex-col align-center text-center overflow-hidden">
                <h3 class="title">#${itemID}&emsp;${itemName}</h3>
                <p class="description mb-0">${itemDescription}</p>
                <ul class="props-wrapper flex-row gap mt-05 mb">
                    <li>Height: ${itemHeight}</li>
                    <li>Weight: ${itemWeight}</li>
                    <li>Base Experience: ${itemExperience}</li>
                </ul>
                <h5 class"moves-title">Moves:</h5> 
                <div id="modalItemMovesWrapper" class="x-scrolling-wrapper mt-05">
                    <ul id="modalItemMovesListing-${i}" class="moves-listing x-scrolling-items"></ul>
                    <ul id="modalItemMovesListing-${i}-Dupl" class="moves-listing x-scrolling-items" aria-hidden="true"></ul>
                </div>
                <div id="modalItemTypesWrapper-${i}" class="types-wrapper flex-row gap-05 mt mb"></div>
            </div>

        <div class="modal-nav-wrapper flex-row gap-30 center mt-05">
            <button id="previousModalItem" class="modal-nav modal-prev" onclick="previousModalItem(event, ${i}, ${iLast})" title="previous Pokemon">
                <img src="assets/icons/google-arrow-back-ios-white.svg" alt="previous-icon">
            </button>
            <button id="nextModalItem" class="modal-nav modal-next" onclick="nextModalItem(event, ${i}, ${iLast})" title="next Pokemon">
                <img src="assets/icons/google-arrow-forward-ios-white.svg" alt="next-icon">
            </button>
        </div>

        </div>

    `;
}

function getTypesTemplate(typesData) {
    let typeName = typesData.name;
    let typeIcon = 'assets/icons-pokemon/' + typeName + '.svg';
    let typeIndex = typeColors.findIndex(type => type.type == typeName);
    typeName = firstLetterUppercase(typeName);
    let typeColor = typeColors[typeIndex].color;
    return `
        <div class="type bg-${typeColor}" style="background-color: #${typeColor};">
            <img src="${typeIcon}" alt="" class="type-icon expand" title="${typeName} Type">
        </div>
    `;
}

function getMovesTemplate(movesData, i) {
    let moveName = movesData.name;
    return `
        <li class="move x-scrolling-item">${moveName}</li>
    `;
}
