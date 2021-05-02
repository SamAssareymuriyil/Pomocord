chrome.storage.local.get('enabled', data => {
    if (data.enabled) {
        location.replace("https://pomocord.netlify.app/blockedsites")
    } 
});