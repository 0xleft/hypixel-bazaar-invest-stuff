class ItemListing {
    constructor(name, buyPrice, sellPrice, buyVolume, sellVolume, buyMovingWeek, sellMovingWeek) {
        this.name = name;
        this.buyPrice = parseFloat(buyPrice).toPrecision(5);
        this.sellPrice = parseFloat(sellPrice).toPrecision(5);
        this.buyVolume = parseFloat(buyVolume).toPrecision(5);
        this.sellVolume = parseFloat(sellVolume).toPrecision(5);
        // moving week
        this.buyMovingWeek = buyMovingWeek;
        this.sellMovingWeek = sellMovingWeek;
        this.update();
    }

    getDiv = () => {
        this.update();
        return this.itemDiv;
    }

    update = () => {
        let money = parseFloat(document.getElementById("currentMoney").value);
        this.itemDiv = this.createListingDiv(money);
    }

    getProfit = (money) => {
        return (this.buyPrice - this.sellPrice) * this.getBuyAmount(money);
    }

    getBuyAmount = (money) => {
        return parseInt(money/this.sellPrice);
    }

    getExpectedSellTime = (money) => {
        return Math.fround(this.getBuyAmount(money)/(this.sellMovingWeek/7/24)).toPrecision(4);
    }

    getExpectedBuyTime = (money) => {
        return Math.fround(this.getBuyAmount(money)/(this.buyMovingWeek/7/24)).toPrecision(4);
    }

    getTotalTransatcionTime = (money) => {
        return (parseFloat(this.getExpectedBuyTime(money))+parseFloat(this.getExpectedSellTime(money))).toPrecision(4);
    }

    getTimedProfit = (money) => {
        this.timedProfit = this.getProfit(money)/this.getTotalTransatcionTime(money);
        return this.timedProfit;
    }

    getFormatedMoney = (money) => {
        let moneyString = "";
        let tempMoney = parseFloat(money);
        
        if ((tempMoney - (tempMoney % 1000000000))/1000000000 > 0) {
            moneyString += (tempMoney - (tempMoney % 1000000000))/1000000000+"b ";
            tempMoney -= tempMoney - (tempMoney % 1000000000);
        }

        if ((tempMoney - (tempMoney % 1000000))/1000000 > 0) {
            moneyString += (tempMoney - (tempMoney % 1000000))/1000000+"m ";
            tempMoney -= tempMoney - (tempMoney % 1000000);
        }

        if ((tempMoney - (tempMoney % 1000))/1000 > 0) {
            moneyString += (tempMoney - (tempMoney % 1000))/1000+"k ";
            tempMoney -= tempMoney - (tempMoney % 1000);
        }

        if (tempMoney > 0) {
            moneyString += Math.fround(tempMoney).toPrecision(4);
        }

        return moneyString;
    }

    createListingDiv = (money) => {

        // if we cannot buy this item or the price of the item is 0 that means no supply or demand
        if (this.getBuyAmount(money) < 1 || this.getBuyAmount(money).toString() == "Infinity" || money == 0) {
            return null;
        }

        let itemDiv = document.createElement("div");
        itemDiv.className = "itemListing";
        
        let itemText = document.createElement("h1");
        itemText.textContent = this.name;
        itemDiv.appendChild(itemText);
    
        let itemPriceText = document.createElement("p");
        itemPriceText.innerHTML = 'Instant buy: <span class="highlight">'+this.getFormatedMoney(this.buyPrice)+"</span>";
        itemDiv.appendChild(itemPriceText);
    
        let itemSellText = document.createElement("p");
        itemSellText.innerHTML = 'Instant sell: <span class="highlight">'+this.getFormatedMoney(this.sellPrice)+"</span>";
        itemDiv.appendChild(itemSellText);
    
        let buyAmountText = document.createElement("p");
        buyAmountText.innerHTML = 'Buy amount: <span class="highlight">'+this.getFormatedMoney(this.getBuyAmount(money))+"</span>";
        itemDiv.appendChild(buyAmountText);

        let itemProfitText = document.createElement("p");
        itemProfitText.innerHTML = 'Profit: <span class="highlight">'+this.getFormatedMoney(this.getProfit(money))+"</span>";
        itemDiv.appendChild(itemProfitText);

        let sellTimeText = document.createElement("p");
        sellTimeText.innerHTML = 'Expected resell time: <span class="highlight">'+this.getExpectedSellTime(money)+"</span>hrs";
        itemDiv.appendChild(sellTimeText);

        let buyTimeText = document.createElement("p");
        buyTimeText.innerHTML = 'Expected buy time: <span class="highlight">'+this.getExpectedBuyTime(money)+"</span>hrs";
        itemDiv.appendChild(buyTimeText);

        let totalTransactionTimeText = document.createElement("p");
        totalTransactionTimeText.innerHTML = 'Expected time taken for return: <span class="highlight">'+this.getTotalTransatcionTime(money)+"</span>hrs";
        itemDiv.appendChild(totalTransactionTimeText);

        let timedProfitText = document.createElement("p");
        timedProfitText.innerHTML = 'Timed profit: <span class="highlight">'+this.getFormatedMoney(this.getTimedProfit(money))+"</span> per hour";
        itemDiv.appendChild(timedProfitText);

        return itemDiv;
    }
}