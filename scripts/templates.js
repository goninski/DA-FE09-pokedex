function getListingItemTemplate(i, itemData, speciesData) {
    itemID = itemData.id;
    itemName = firstLetterUppercase(itemData.name);
    itemImg = itemData.sprites.front_default;
    itemHeight = itemData.height;
    itemWeight = itemData.weight;
    itemExperience = itemData.base_experience;
    itemSpecies = itemData.species.name;
    itemTypes = itemData.types;
    itemAbilites = itemData.abilities;
    itemColor = speciesData.color.name;
    itemDescription = speciesData.flavor_text_entries[0].flavor_text;

    return `
        <div class="card card-wrapper card-landscape bg-${itemColor}" style="background-color: ${itemColor}">
            <div class="img-wrapper flex-col pos-relative">
                <img src="${itemImg}" alt="" class="img-contain expand xpos-absolute">
            </div>
            <div class="content-wrapper flex-col p-card">
                <a href="#" class="card-link">
                    <h3 class="title">${itemName}</h3>
                    <span class="id">#${itemID}</span>
                </a>
                <p class="description">${itemDescription}</p>
                <div id="typesWrapper-${i}" class="types-wrapper flex-row gap-05"></div>
            </div>
        </div>
    `;
}

function getTypesTemplate(i, typesData) {
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
