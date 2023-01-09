
var mainContainer = document.getElementById("mainContainer");

function getData() {
    fetch('https://api.hypixel.net/skyblock/bazaar').then((response)=>{

        return response.json();

    }).then(data=>{

        const {success, lastUpdate, products} = data;

        const entries = Object.entries(products);

        entries.forEach(([key, value]) => {
            
            let sellPrice = value.quick_status.sellPrice;
            let buyPrice = value.quick_status.buyPrice;

            addItemListing(key, sellPrice, buyPrice);

        })

    })
};

getData();

function addItemListing(itemName, itemPrice, itemSell) {
    let itemDiv = document.createElement("div");
    itemDiv.className = "itemListing";
    
    let itemText = document.createElement("h1");
    itemText.textContent = itemName;
    itemDiv.appendChild(itemText);

    let itemPriceText = document.createElement("p");
    itemPriceText.textContent = itemPrice;
    itemDiv.appendChild(itemPriceText);

    let itemSellText = document.createElement("p");
    itemSellText.textContent = itemSell;
    itemDiv.appendChild(itemSellText);

    mainContainer.appendChild(itemDiv);
}
