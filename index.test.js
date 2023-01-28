//const { beforeEach } = require('node:test');
const myFunc = require('./index.js');

const port123 = null;


// THIS DOESN'T WORK, IDK WHY
// beforeEach(() => {
//     const port123 = new myFunc.Portfolio();
//     return port123;
// });

test('Creattion of portfolio -- success', () => {
    const port = new myFunc.Portfolio();
    expect(port.size1()).toBe(0);
});

test('Size of portfolio -- success', () => {
    const port = new myFunc.Portfolio();
    port.portfolio.set("GME", 5);
    port.portfolio.set("ABC", 6);

    expect(port.size1()).toBe(2);
});

test("typeCheck_TickerAmountOfShares -- error", () => {
    const port = new myFunc.Portfolio();
    expect(() => port.purchase(4, 4)).toThrow("Bad input: ticker must be a string, amount of shares must be an int");
    expect(() => port.purchase("GME", 3.2)).toThrow("Bad input: ticker must be a string, amount of shares must be an int");
    expect(() => port.purchase("GME", "as")).toThrow("Bad input: ticker must be a string, amount of shares must be an int");

    //expect(myFunc.typeCheck_TickerAmountOfShares(4, 4)).toThrow("Bad input: ticker must be a string, amount of shares must be an int");
})


test("Purchase shares -- success", () => {
    const port = new myFunc.Portfolio();
    port.purchase("GME", 4);
    expect(port.portfolio.get("GME")).toBe(4);
    port.purchase("GME", 4);
    expect(port.portfolio.get("GME")).toBe(8);
})

test("Sell shares -- success", () =>{
    const port = new myFunc.Portfolio();
    port.portfolio.set("GME", 5);
    port.sell("GME", 2);
    expect(port.portfolio.get("GME")).toBe(3);
})

test("Sell shares (sell all shares of a kind) -- success", () => {
    const port = new myFunc.Portfolio();
    port.purchase("GME", 9);
    expect(port.numberOfShares("GME")).toBe(9);
    port.sell("GME", 9);
    expect(port.numberOfShares("GME")).toBe(0);
})

test("Sell shares (shares that you don't have) -- success", () => {
    const port = new myFunc.Portfolio();
    port.purchase("GME", 9);

    expect(() => port.sell("GM", 9)).toThrow("ShareSaleException");
})

test("Sell shares (sell more shares than you have) -- exception", () => {
    const port = new myFunc.Portfolio();
    port.purchase("GME", 5);
    expect(() => port.sell("GME", 10)).toThrow("ShareSaleException")
})


test("Amount of Shares -- success", () => {
    const port = new myFunc.Portfolio();
    port.purchase("GME", 9);
    expect(port.numberOfShares("GME")).toBe(9);
})

test("Amount of Shares (no shares that you're looking for) -- success", () => {
    const port = new myFunc.Portfolio();
    expect(port.numberOfShares("GME")).toBe(0);
})