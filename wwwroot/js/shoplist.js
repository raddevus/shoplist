let saveShopListUrl = "ShopList/Save";

function addList(){

	// Add UUID to formdata
	var formData = new FormData();
	formData.append("uuid",currentUuid);

	// Create new JSON shoplist
	var shopList = {
        Id:0,
        Title: document.querySelector("#listTitle").value,
        Created: new Date().yyyymmdd()
    };

    console.log(`${JSON.stringify(shopList)}`);
    
	// Add the new shoplist to the formdat
    for (var key in shopList) {
        formData.append(key, shopList[key]);
    }


	fetch(`${baseUrl}${saveShopListUrl}`,
		{
			method: 'POST',
			body:formData,
		
			}).then(response => response.json())
			.then(data => {
				console.log(data);
				if (data.success == true){
					addItemToLocalShopList();
				}
			});
}

function addItemToLocalShopList(){
	var title = document.querySelector("#listTitle").value;
    var localOption = new Option(title, title, false, true);
		document.querySelector("#shopListCtrl").add(localOption);
		document.querySelector("#listTitle").value = "";
		document.querySelector("#SiteListCtrl").value = clearTextItemKey;
}