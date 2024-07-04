function addList(){

    var title = document.querySelector("#listTitle").value;
    var localOption = new Option(title, title, false, true);
		document.querySelector("#shopListCtrl").add(localOption);
		document.querySelector("#listTitle").value = "";
		document.querySelector("#SiteListCtrl").value = clearTextItemKey;  
}