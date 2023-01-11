function getData() {
    fetch('https://api.hypixel.net/skyblock/bazaar').then((response)=>{

        return response.json();

    }).then(bazaarData=>{

        itemList.clear();

        const {success, lastUpdated, products} = bazaarData;


        // get all the new entries
        const entries = Object.entries(products);
        entries.forEach(([key, value]) => {
            
            let sellPrice = parseFloat(value.quick_status.sellPrice);
            let buyPrice = parseFloat(value.quick_status.buyPrice);

            let buyVolume = parseFloat(value.quick_status.buyVolume);
            let sellVolume = parseFloat(value.quick_status.sellVolume);

            let buyMovingWeek = parseFloat(value.quick_status.buyMovingWeek);
            let sellMovingWeek = parseFloat(value.quick_status.sellMovingWeek);
            
            if (!(sellPrice == undefined || buyPrice == undefined || buyVolume == undefined || sellVolume == undefined || buyMovingWeek == undefined || sellMovingWeek == undefined)) {
                itemList.addListing(new ItemListing(key, buyPrice, sellPrice, buyVolume, sellVolume, buyMovingWeek, sellMovingWeek));
            }
        });

        document.getElementById("lastUpdate").innerHTML = "Items: "+entries.length;

        itemList.display();
    })
};

let itemList = new ItemList();
getData();

// add the entries to select
Object.entries(ItemList.sortOptions).forEach(([key, value]) => {

    let option = document.createElement("option");
    option.text = value;
    option.value = value;
    
    document.getElementById("sortOptions").appendChild(option);
});

document.getElementById("sortOptions").addEventListener("change", ()=> {
    if (itemList.loading == false) {
        itemList.sort(document.getElementById("sortOptions").selectedIndex);
    }
});

document.getElementById("checkButton").addEventListener("click", ()=> {
    if (itemList.loading == false) {
        getData();
    }
});