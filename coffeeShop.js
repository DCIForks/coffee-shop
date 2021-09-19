class CoffeeShop {
  constructor(name, menu, orders=[]) {
    this.name = name
    this.menu = menu
    this.orders = orders
  }

  addOrder(item) {
    let items = Object.values(arguments)
    const itemCount = items.length

    if (itemCount === 1) {
      let menuItem = this.menu
                        .find((menuObject) => menuObject.name === item)
      if (menuItem !== undefined) {
        this.orders.push(item)
        return `Your order for ${item} has been added.`

      } else {
        return `Sorry: ${item} is currently unavailable.`
      }

    } else if (itemCount) {
      items = items.map( item => this.addOrder(item))
      return items
    }
  }

  listOrders() {
    return this.orders
  }

  fulfillOrder() {
    const item = this.orders.shift()
    const result = item
                 ? `Your ${item} is ready`
                 : "All orders have been fulfilled"
    return result
  }

  dueAmount () {
    const amount = this.orders.reduce((sum, itemName) => {
      const details = this.menu
                          .find( menuItem => menuItem.name === itemName)
      const price = details.price
      return sum + price
    }, 0)

    return Math.round(amount * 100) / 100
  }

  cheapestItem () {
    const cheapestItem = this.menu.reduce(( cheapest, current ) => {
      if (cheapest.price < current.price) {
        return cheapest
      } else {
        return current
      }
    }, this.menu[0])

    return cheapestItem.name
  }

  filterByType(type) {
    return this.menu.filter( menuItem => menuItem.type === type)
                    .map( menuItem => menuItem.name )
  }

  drinksOnly() {
    return this.filterByType("drink")
  }

  foodOnly() {
    return this.filterByType("food")
  }

  ///// UTILITY METHODS //// UTILITY METHODS //// UTILITY METHODS /////

  show() {
    let [command, ...parameters] = Object.values(arguments)

    if (this[command]) {
      // This class has a method with the name <command>. Call it...
      const result = this[command].apply(this, parameters)
      // ... and log the command and its result
      parameters = parameters.map(param => `"${param}"`).join(", ")
      console.log(`${command}(${parameters}):`, result)

    } else {
      console.log(`Sorry. This coffee shop doesn't do ${command}`)
    }
  }

  test() {
    const greeting = `Welcome to ${this.name}!`
    console.log("—".repeat(greeting.length))
    console.log(greeting)
    console.log("=".repeat(greeting.length))

    // Provide some fun facts about the menu
    this.show("foodOnly")
    this.show("drinksOnly")
    this.show("cheapestItem")

    // Order four items, one of which is not on the menu
    this.show("addOrder", "Toast", "Sandwich", "Bread", "Coffee")
    // Calculate the cost
    this.show("dueAmount")

    // Prepare each of the items in the order
    // (including those sent to the constructor)
    while(this.orders.length) {
      this.show("fulfillOrder")
    }
    // Show that there are no orders left
    this.show("fulfillOrder")

    // Test a non-existant method
    this.show("payBill")
  }
}


module.exports = CoffeeShop