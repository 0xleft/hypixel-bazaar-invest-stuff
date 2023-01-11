class ItemList {
    // a sort of enum javascript like no typescript here :(
    static sortOptions = {
        TimedProfit: 'Timed Profit',
        TimeTaken: 'Time Taken',
        Profit: 'Profit'
    };

    constructor() {
        this.divList = [];
        this.mainContainer = document.getElementById("mainContainer");
        this.loading = false;
    }

    addListing = (listing) => {
        this.divList.push(listing);
    }

    clear = () => {
        // clear the page
        while (document.getElementById("mainContainer").firstChild) {
            document.getElementById("mainContainer").removeChild(document.getElementById("mainContainer").firstChild);
        }

        this.divList = [];
    }

    display = () => {
        this.divList.forEach((listing) => {
            if (listing.getDiv() != null) {
                this.mainContainer.appendChild(listing.getDiv());
            }
        });
    }


    sort = (selectedIndex) => {

        this.loading = true;

        let choice = sortOptions[selectedIndex].text;
        let swaps = 0;
        let tempItemList = this.divList;

        this.clear();

        while (true) {
            for (let i = 0; i < tempItemList.length-1; i++) {

                if (isNaN(tempItemList[i].getProfit(parseFloat(document.getElementById("currentMoney").value))) ||
                    isNaN(tempItemList[i].getTimedProfit(parseFloat(document.getElementById("currentMoney").value))) ||
                    isNaN(tempItemList[i].getTotalTransatcionTime(parseFloat(document.getElementById("currentMoney").value)))) {
                    tempItemList.splice(i, 1);
                    continue;
                }


                // ------------------- choices here

                if (choice == "Profit") {
                    if (tempItemList[i].getProfit(parseFloat(document.getElementById("currentMoney").value)) < tempItemList[i+1].getProfit(parseFloat(document.getElementById("currentMoney").value))) {
                        let temp = tempItemList[i];
                        tempItemList[i] = tempItemList[i+1];
                        tempItemList[i+1] = temp;
                        swaps +=1
                    }
                }

                if (choice == "Timed Profit") {
                    if (tempItemList[i].getTimedProfit(parseFloat(document.getElementById("currentMoney").value)) < tempItemList[i+1].getTimedProfit(parseFloat(document.getElementById("currentMoney").value))) {
                        let temp = tempItemList[i];
                        tempItemList[i] = tempItemList[i+1];
                        tempItemList[i+1] = temp;
                        swaps +=1
                    }
                }

                if (choice == "Timed Taken") {
                    if (tempItemList[i].getTotalTransatcionTime(parseFloat(document.getElementById("currentMoney").value)) < tempItemList[i+1].getTotalTransatcionTime(parseFloat(document.getElementById("currentMoney").value))) {
                        let temp = tempItemList[i];
                        tempItemList[i] = tempItemList[i+1];
                        tempItemList[i+1] = temp;
                        swaps +=1
                    }
                }
                
                // -------------------
            }

            if (swaps == 0) {
                break;
            }

            swaps = 0;
        }

        this.divList = tempItemList;
        this.display();
        this.loading = false;
    }
}