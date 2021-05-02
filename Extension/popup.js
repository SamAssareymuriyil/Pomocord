window.onload = function () {
    document.getElementById("redirect").onclick = function() {
        window.open("https://pomocord.netlify.app/", '_blank');
    };
}

var enabled = false;
var onOff = document.getElementById('toggle');

var  a = document.getElementById("toggle")

chrome.storage.local.get('enabled', data => {
    enabled = !!data.enabled;
    onOff.textContent = enabled ? 'Website blocking is enabled.' : 'Start a Study Session!';
    
});

onOff.onclick = () => {
    enabled = !enabled;
    onOff.textContent = enabled ? 'Website blocking is enabled.' : 'Start a Study Session!';
    chrome.storage.local.set({enabled:enabled});
    var condition = document.getElementById("toggle").textContent
    if (condition == 'Website blocking is enabled.') {
        a.setAttribute("class", "toggleOff");

    } else {
        a.setAttribute("class", "toggleOn");

    }
};