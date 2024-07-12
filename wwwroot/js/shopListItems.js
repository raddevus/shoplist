let localListItems = [];

function addListItems(){

    let at = document.querySelector("#itemListTable");

    let utasks = document.querySelector("#listitems");
    if (utasks != null) {utasks.remove();}
    
    let elx = document.createElement("tbody");
    elx.setAttribute("id","listItems");
    at.append(elx);
    
    // let postData = new FormData();
    // postData.append("uuid", currentUuid);
    // fetch(`${baseUrl}JournalEntry/GetAll`, {
    //     method: 'POST',
    //     body: postData,
    //     })
    //     .then(response => response.json())
    //     .then(allListItems => {
    //         localListItems = allListItems;            
    //         displayUserTaskTable(allListItems, "##listItems");
    //     });
    fakeData = [];
    fakeData.push({description:"test one",id:5});
    displayUserTaskTable(fakeData, "#listItems");
}

function addListItem(){
    if (currentUuid == undefined || currentUuid == null || currentUuid == ""){
        alert("You need to register a UUID to create and save data.");
        return;
    }
    // checking to make sure we don't delete existing entries
    if (localListItems.length == undefined){ localListItems=[];}
    var desc = document.querySelector("#itemInput").value;
    if (desc == undefined || desc == ""){
        alert("Please type a description for your item & try again.");
        return;
    }
    document.querySelector("#itemInput").value = "";
    document.querySelector("#itemInput").focus();
    localListItems.push({id:0,description:desc});
    
    displayUserTaskTable(localListItems, "#listItems");
}

function displayUserTaskTable(listItems, rootElement){
    console.log(`listItems ${JSON.stringify(listItems)}`);
    //initUserTaskTable();
    ReactDOM.render(
        // We are passing in just the tasks - not the outer object 
        // which includes the success property
        ShopListTable (listItems),
        document.querySelector(rootElement),
        hideWaitCursor("#history-spinner")
    );
}


function hideWaitCursor(waitCursorId){
    document.querySelector(waitCursorId).classList.add("k-hidden");
}