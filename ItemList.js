class ItemList {
    // a sort of enum javascript like no typescript here :(
    static sortOptions = {
        Price: 'Price',
        TimedProfit: 'Timed Profit',
        TimeTaken: 'Time Taken',
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


    sort = (selectedIndex) => {

        let itemListCopy = this.itemList.copyWithin(-1, 0);

        let listOut = [];

        this.clear();

        let choice = sortOptions[selectedIndex].text;

        itemListCopy.forEach((listing)=> {
            
            let max = 0;
            let selected;

            itemListCopy.forEach((listingb)=> {

                if (choice == "Price") {

                }

                if (choice == "Profit") {

                    if (listingb.getProfit(parseFloat(document.getElementById("currentMoney").value)) > max) {
                        max = listingb.getProfit(parseFloat(document.getElementById("currentMoney").value));
                        console.log(max);
                        selected = listingb;
                    }
                ;}

            });

            listOut.push(selected);

        });


        this.display();
    }
}