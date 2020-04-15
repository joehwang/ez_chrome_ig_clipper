const chrome_api={
	test: x => {
		console.log("test module")
	},
   async get_chrome_storage_data(x){
  	return new Promise(resolve => {
     chrome.storage.sync.get("app_setting",function(items) {
          resolve(items)
      });
    });
   },
   async get_current_tabs_url(){
	  return new Promise(resolve => {
	     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	          resolve(tabs[0].url)
	     });
	   });
   },
   async set_chrome_storage_data(dataobj){
	  return new Promise(resolve => {
	    chrome.storage.sync.set({"app_setting":dataobj},function() {
	          resolve("ok")
	    });
	  });
  },
  async on_message_from_chrome(){
    return new Promise(resolve=>{
      chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          //console.log(sender.tab ? "取得到tab，這是來自內容腳本的訊息：" + sender.tab.url: "沒有tab，這是來自擴充功能內部的訊息");
          resolve(request)
      });
    })
},
 invoke_chrome_content_js_scope(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      console.log(tabs)
      console.log(tabs[0].url)
      chrome.tabs.executeScript(
          tabs[0].id,
          {file: 'content_page.js'});
   });
},
launch_other_tab(newUrl){
 chrome.tabs.create({ url: newUrl });
}


}

export default chrome_api