
 chrome.browserAction.onClicked.addListener(function(tab) {
 console.log("browseraction click")
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });
});