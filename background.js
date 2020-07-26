chrome.runtime.onInstalled.addListener(function() {
    console.log("Mistaken extension is installed!");
});

function logOnBefore(details) {
    const standaardRegExp = /https:\/\/www.standaard\.be.*/;
    if (details.url.match(standaardRegExp)) {
        console.log("This is DS!");
    }
}

chrome.webNavigation.onBeforeNavigate.addListener(logOnBefore);

