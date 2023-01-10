function getData() {
    fetch('https://api.hypixel.net/skyblock/bazaar').then((response)=>{

        return response.json();

    }).then(bazaarData=>{

        const {success, lastUpdated, products} = bazaarData;

        document.getElementById("lastUpdate").innerHTML = "Last update: "+bazaarData.lastUpdated;

        // get all the new entries
        const entries = Object.entries(products);
        entries.forEach(([key, value]) => {
            
            let sellPrice = parseFloat(value.quick_status.sellPrice);
            let buyPrice = parseFloat(value.quick_status.buyPrice);

            let buyVolume = parseFloat(value.quick_status.buyVolume);
            let sellVolume = parseFloat(value.quick_status.sellVolume);

            let buyMovingWeek = parseFloat(value.quick_status.buyMovingWeek);
            let sellMovingWeek = parseFloat(value.quick_status.sellMovingWeek);
            
            itemList.addListing(new ItemListing(key, buyPrice, sellPrice, buyVolume, sellVolume, buyMovingWeek, sellMovingWeek));
        })

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

    itemList.sort(document.getElementById("sortOptions").selectedIndex);

});