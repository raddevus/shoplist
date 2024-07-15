const saveItem = "ListItem/Save"

const ShopListTable = function(listItems){

    console.log(listItems[0]);
    
     let allItems = [];

    for (let x=0; x < listItems.length;x++){
        console.log(`journalEntries[${x}].note: ${listItems[x].note}`);
        let currentId = listItems[x].id;
        allItems.push( React.createElement("tr",{key:x, id:listItems[x].id},
        
            React.createElement("td","", 
                React.createElement("input", {type:"checkbox",id:`checkbox-${currentId}`, onClick: this.handleCompletedClick.bind(this)})),
            React.createElement("td","",
                React.createElement("label",{id:`desc-${currentId}`,for:`checkbox-${currentId}`}, listItems[x].description)),
            )
       );
    }
    return allItems.reverse();
}

function handleCompletedClick(e){
    
    var itemId = 0;
    if (e.target.type == undefined){
        console.log(`e: ${e.target.parentElement.id}`);
        itemId = e.target.parentElement.id;
        return;
    }
    else{
        console.log(`e: ${e.target.parentElement.parentElement.id}`);
        itemId = e.target.parentElement.parentElement.id;
    }
    
    console.log(`entryId: ${itemId}`);
    if (document.querySelector(`#checkbox-${itemId}`).checked){
        document.querySelector(`#desc-${itemId}`).classList.add("strike-out");
    }
    else{
        document.querySelector(`#desc-${itemId}`).classList.remove("strike-out");
    }
    
    var title = document.querySelector("#shopListCtrl").value;

    var formData = new FormData();
    formData.append("uuid",currentUuid);
    formData.append("itemId",itemId);
    formData.append("title",title);

    fetch(`${baseUrl}ShopList/SetListItemComplete`, {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => console.log(data));
    
}