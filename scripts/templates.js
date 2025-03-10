function getListingItemTemplate(itemData, speciesData, indexFull) {
    let itemID = itemData.id;
    let itemName = firstLetterUppercase(itemData.name);
    let itemDescription = speciesData.flavor_text_entries[0].flavor_text;
    let itemImg = itemData.sprites.front_default;
    let itemColor = speciesData.color.name;

    return `
        <div class="item-card card-landscape bg-${itemColor}" onclick="openItemModal(${indexFull})" style="background-color: ${itemColor}">
            <div class="img-wrapper flex-col pos-relative">
                <img src="${itemImg}" alt="" class="img-contain expand xpos-absolute">
            </div>
            <div class="content-wrapper flex-col p-card">
                <a href="#" class="card-link">
                    <h3 class="title">${itemName}</h3>
                    <span class="id">#${itemID}</span>
                </a>
                <p class="description">${itemDescription}</p>
                <div id="cardItemTypesWrapper-${indexFull}" class="types-wrapper flex-row gap-05"></div>
            </div>
        </div>
    `;
}

function getTypesTemplate(typesData) {
    let typeName = typesData.name;
    let typeIndex = typeColors.findIndex(type => type.type == typeName);
    typeName = firstLetterUppercase(typeName);
    let typeColor = typeColors[typeIndex].color;
    let typeIcon = 'assets/icons-pokemon/' + typeName + '.svg';
    return `
        <div class="type bg-${typeColor}" style="background-color: #${typeColor};">
            <img src="${typeIcon}" alt="" class="type-icon expand" title="${typeName}">
        </div>
    `;
}

function getModalInnerTemplate(i, itemData, speciesData, iLast) {
    let itemID = itemData.id;
    let itemName = firstLetterUppercase(itemData.name);
    let itemDescription = speciesData.flavor_text_entries[0].flavor_text;
    let itemImg = itemData.sprites.front_default;
    let itemColor = speciesData.color.name;
    // itemHeight = itemData.height;
    // itemWeight = itemData.weight;
    // itemExperience = itemData.base_experience;
    // itemSpecies = itemData.species.name;
    // itemTypes = itemData.types;
    // itemAbilites = itemData.abilities;

    return `
        <button id="itemModalClose" class="modal-close pos-absolute" onclick="closeItemModal()">
            <img src="assets/icons/google-close-black.svg" alt="close-icon">
        </button>

        <div class="modal-item bg-${itemColor}" style="background-color: ${itemColor}">
            <div class="img-wrapper flex-col pos-relative">
                <img src="${itemImg}" alt="" class="img-contain expand xpos-absolute">
            </div>
            <div class="content-wrapper flex-col p-card">
                <a href="#" class="card-link">
                    <h3 class="title">${itemName}</h3>
                    <span class="id">#${itemID}</span>
                </a>
                <p class="description">${itemDescription}</p>
                <div id="modalItemTypesWrapper-${i}" class="types-wrapper flex-row gap-05"></div>
            </div>

        <div class="modal-nav-wrapper flex-row gap center">
            <button id="previousModalItem" class="modal-next-prev modal-prev" onclick="previousModalItem(${i}, ${iLast})">
                <img src="assets/icons/google-arrow-back-ios-white.svg" alt="previous-icon">
            </button>
            <button id="nextModalItem" class="modal-next-prev modal-next" onclick="nextModalItem(${i}, ${iLast})">
                <img src="assets/icons/google-arrow-forward-ios-white.svg" alt="next-icon">
            </button>
        </div>

        </div>

    `;
}