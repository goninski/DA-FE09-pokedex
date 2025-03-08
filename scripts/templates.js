function getListingItemTemplate() {
    return `
        <div class="card-wrapper card-landscape">
            <div class="card-img-wrapper flex-col pos-relative">
                <img src="${itemImg}" alt="" class="img-cover pos-absolute">
            </div>
            <div class="card-content-wrapper flex-col p-card">
                <a href="#" class="card-link"><h3 class="card-title">${itemName}</h3></a>
                <p class="card-teaser">...</p>
            </div>
        </div>
    `;
}


