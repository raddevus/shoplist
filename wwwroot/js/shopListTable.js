const saveItem = "ListItem/Save"

const ShopListTable = function(listItems){

    console.log(listItems[0]);
    
     let allItems = [];

    for (let x=0; x < listItems.length;x++){
        console.log(`journalEntries[${x}].note: ${listItems[x].note}`);
        let currentId = listItems[x].id;
        allItems.push( React.createElement("tr",{key:x, id:listItems[x].id},
        
            React.createElement("td",{id:`checkbox-${currentId}`}, 
                React.createElement("input", {type:"checkbox"})),
            React.createElement("td",{width:"150px",id:`desc-${currentId}`}, listItems[x].description),
            )
       );
    }
    return allItems.reverse();
}

function handleSaveClick(e){
    
    var entryId = 0;
    if (e.target.type == undefined){
        console.log(`e: ${e.target.parentElement.id}`);
        entryId = e.target.parentElement.id;
        return;
    }
    else{
        console.log(`e: ${e.target.parentElement.parentElement.id}`);
        entryId = e.target.parentElement.parentElement.id;
    }
    console.log(`entryId: ${entryId}`);
    var currentTitleText = document.querySelector(`#title-${entryId}`).textContent;
    var titleText = prompt("Please enter a title for the Journal Entry", currentTitleText);
    
    if (titleText != null){
        console.log(`I got that thing: ${titleText}`);
        document.querySelector(`#title-${entryId}`).textContent = titleText;
    }

    console.log(`entryId : ${entryId}`);

    // Do you want to save a completed date?

    var formData = new FormData();
//06-17    formData.append(uuid,{"uuid":currentUuid});
    formData.append("uuid",currentUuid);

    
    let noteText = document.querySelector(`#note-${entryId}`).value;
    let createdDate = document.querySelector(`#created-${entryId}`).textContent;
    
    console.log(`noteText: ${noteText}`);

    var jentry = {
        Id:entryId,
        Title: titleText,
        Note: noteText,
        Created: createdDate,
        Updated: null
    };

    console.log(`${JSON.stringify(jentry)}`);
    
    for (var key in jentry) {
        formData.append(key, jentry[key]);
    }
  
    console.log(`finalURL: ${baseUrl}${saveItem}`);

    fetch(`${baseUrl}${saveItem}`,
	{
    	method: 'POST',
    	body:formData,
        
	
        }).then(response => response.json())
        .then(data => {
            console.log(data);
                if (data.success == false){
                    alert("## ERROR! ##\nYour data couldn't be saved.\nPlease make sure you've registered your UUID.");
                    return;
                }
                else{
                    
                    console.log(`updated: ${data.jentry.updated} : ${data.jentry.note}`);
                    if (data.jentry.updated != undefined && data.jentry.updated != null && data.jentry.updated != ""){
                        document.querySelector(`#updated-${entryId}`).textContent = data.jentry.updated;
                    }
                }
                localStorage.setItem("shouldDispalySaveMsg",true);
                window.location.reload();
                
            });


    global_e = e; // global_e used for debugging
}