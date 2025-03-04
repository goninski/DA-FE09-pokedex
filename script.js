function init() {
    // setHomeURL();
}


function setHomeURL() {
    let url = new URL(window.location.href);
    let homeURL = setCondHomeURL(url);
    let homeLinksRef = document.querySelectorAll('.js-set-home-url');
    for (let i=0; i < homeLinksRef.length; i++) {
        homeLinksRef[i].href = homeURL;
    }
}

function setCondHomeURL(url) {
    if(url.hostname == "127.0.0.1") {
        return url.origin + '/' + url.pathname.split("/")[1];
    }
    if(url.pathname.split("/")[1] == "projekte") {
        return url.origin + '/' + url.pathname.split("/")[1] + '/' + url.pathname.split("/")[2];
    }
    return '/';
}