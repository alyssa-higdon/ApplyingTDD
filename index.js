
function typeCheck_TickerAmountOfShares(ticker, amount_of_shares){
    if (typeof(ticker) != "string" || typeof(amount_of_shares) != "number"  ||
        (typeof(amount_of_shares) === "number" && amount_of_shares % 1 !=0)){
            throw new Error("Bad input: ticker must be a string, amount of shares must be an int")
        }
    return 0;
};

class Portfolio{
    constructor(){
        this.portfolio = new Map();
    }

    size1(){
        if (this.portfolio === new Map()){
            return 0;
        }
        return this.portfolio.size;
    }
    
    purchase(ticker, amount_of_shares){
        typeCheck_TickerAmountOfShares(ticker, amount_of_shares);

        var shares = 0;
        if (this.portfolio.has(ticker)){
            shares = this.portfolio.get(ticker);
        }
        this.portfolio.set(ticker, shares + amount_of_shares);
    }

    sell(ticker, amount_of_shares){
        typeCheck_TickerAmountOfShares(ticker, amount_of_shares);

        const shares = this.portfolio.get(ticker) - amount_of_shares;
        if (shares == 0){
            this.portfolio.delete(ticker);
        }
        if (shares < 0){
            throw new Error("ShareSaleException");
        }
        else{
            this.portfolio.set(ticker, shares);
        }
    }

    numberOfShares(ticker){
        typeCheck_TickerAmountOfShares(ticker, 0);

        if (this.portfolio.has(ticker)){
            return this.portfolio.get(ticker);
        }
        else{
            return 0;
        }
    }
};

module.exports = {Portfolio};

