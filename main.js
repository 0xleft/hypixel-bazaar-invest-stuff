let mainContainer = document.getElementById("mainContainer");

function getData(money) {
    fetch('https://api.hypixel.net/skyblock/bazaar').then((response)=>{

        return response.json();

    }).then(data=>{

        const {success, lastUpdate, products} = data;

        document.getElementById("lastUpdate").innerHTML = "Last update: "+lastUpdate;

        const entries = Object.entries(products);

        entries.forEach(([key, value]) => {
            
            let sellPrice = parseFloat(value.quick_status.sellPrice);
            let buyPrice = parseFloat(value.quick_status.buyPrice);

            let buyAmount = money/sellPrice;
            
            let resellProfit;

            if (buyAmount > 1) {
                resellProfit = buyPrice*buyAmount - sellPrice*buyAmount;

                let buyVolume = parseFloat(value.quick_status.buyVolume);
                let sellVolume = parseFloat(value.quick_status.sellVolume);

                let movingWeek = parseFloat(value.quick_status.buyMovingWeek);

                let expectedSellTime = buyAmount/movingWeek/7*(sellVolume/buyVolume);

                addItemListing(key, sellPrice, buyPrice, resellProfit, buyVolume, expectedSellTime);          
            }
        })

    })
};

function addItemListing(itemName, sellPrice, buyPrice, resellProfit, buyVolume, expectedSellTime) {
    let itemDiv = document.createElement("div");
    itemDiv.className = "itemListing";
    let x = resellProfit;
    
    let itemText = document.createElement("h1");
    itemText.textContent = itemName;
    itemDiv.appendChild(itemText);

    let itemPriceText = document.createElement("p");
    itemPriceText.textContent = "Instant buy:: "+buyPrice;
    itemDiv.appendChild(itemPriceText);

    let itemSellText = document.createElement("p");
    itemSellText.textContent = "Instant sell: "+sellPrice;
    itemDiv.appendChild(itemSellText);
    
    let itemBuyVolume = document.createElement("p");
    itemBuyVolume.textContent = "Buy volume: "+buyVolume;
    itemDiv.appendChild(itemBuyVolume);

    let resellProfitText = document.createElement("p");
    resellProfitText.textContent = "Expected resell profit: "+resellProfit;
    itemDiv.appendChild(resellProfitText);

    let expectedSellTimeText = document.createElement("p");
    expectedSellTimeText.textContent = "Expected sell time: "+expectedSellTime;
    itemDiv.appendChild(expectedSellTimeText);

    mainContainer.appendChild(itemDiv);
}

document.getElementById("checkButton").addEventListener("click", ()=> {
    document.getElementById("lastUpdate").innerHTML = "Last update: ";

    let money = parseFloat(document.getElementById("currentMoney").value);

    getData(money);
});