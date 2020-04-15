var ig_parser= (function(){
	let is_ig=RegExp(/https:\/\/www\.instagram\.com\//)
	if (!is_ig.test(location.href)) {
		//alert('not ig')
		return
	}
	let get_the_email = () => {
		let rows=$("header").text().split(" ");
		let email=""
		//some/every/forEach都是疊代器
		//some和every可用return 跳出
		rows.some(row => {
			email=row.match(/[A-Za-z0-9_.]*@[A-Za-z0-9]*\.[A-Za-z0-9]*/)
			if(email){
				return true
			}
		});
		return (email) ? email[0] : ""
	};

	let get_the_fans_qty=()=>{
		let s=$("header section ul li span[title]").attr("title").replace(/,/g,"")
		return (s) ? s : "找不到"
	}
	get_the_fans_qty();
	return{
		title:$("h1.rhpdm").text(),
		email:get_the_email(),
		fans_qty:get_the_fans_qty(),
		ig_url:location.href
	}

})()


chrome.runtime.sendMessage({parser:ig_parser},function(response){})

console.log("content_page已注入")






