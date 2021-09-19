const CoffeeShop = require('./coffeeShop.js')
const menu = require('./menu.json')

const bs = new CoffeeShop("BarStucks", menu, ["Lemonade"]);
bs.test()