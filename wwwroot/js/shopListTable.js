const saveItem = "ListItem/Save"

const ShopListTable = function(listItems){
     let allItems = [];

    for (let x=0; x < listItems.length;x++){
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
    
    console.log(`itemId: ${itemId}`);
    var isCompleted = document.querySelector(`#checkbox-${itemId}`).checked;
    setCompletedStyle(itemId,isCompleted);
    
    var title = document.querySelector("#shopListCtrl").value;

    // toggles the completed value
    var completed = document.querySelector(`#checkbox-${itemId}`).checked;
    console.log(`completed: ${completed}`);

    var formData = new FormData();
    formData.append("uuid",currentUuid);
    formData.append("itemId",itemId);
    formData.append("completed", completed);
    formData.append("title",title);

    

    fetch(`${baseUrl}ShopList/SetListItemComplete`, {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .then(data => {
            console.log("Invoking...");
            // title is the title of the list aka listName
            connection.invoke("SendCompletedItem", currentUuid, title, String(itemId),completed);
        });
    
}

function setAsCompleted(itemId){
    document.querySelector(`#checkbox-${itemId}`).checked = true;
    document.querySelector(`#desc-${itemId}`).classList.add("strike-out");
}

function setCompletedStyle(itemId, isCompleted){
    if (isCompleted){
        document.querySelector(`#desc-${itemId}`).classList.add("strike-out");
        document.querySelector(`#checkbox-${itemId}`).checked = true;
    }
    else{
        document.querySelector(`#desc-${itemId}`).classList.remove("strike-out");
        document.querySelector(`#checkbox-${itemId}`).checked = false;
    }
}