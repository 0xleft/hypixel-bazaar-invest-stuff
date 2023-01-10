class ItemList {
    // a sort of enum javascript like no typescript here :(
    static sortOptions = {
        Price: 'Price',
        TimedProfit: 'TimedProfit',
        TimeTaken: 'TimeTaken',
        Profit: 'Profit'
    };

    constructor() {
        this.itemList = [];
        this.mainContainer = document.getElementById("mainContainer");
    }

    addListing = (listing) => {
        this.itemList.push(listing);
    }

    clear = () => {
        // clear the page
        mainContainer.childNodes.forEach(child => {
            mainContainer.removeChild(child);
        });

        this.itemList = [];
    }

    display = () => {
        this.itemList.forEach((listing) => {
            if (listing.getDiv() != null) {
                this.mainContainer.appendChild(listing.getDiv());
            }
        });
    }

    

    sort = () => {

        

    }
}