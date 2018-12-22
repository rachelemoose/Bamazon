//dependencies - mysql and inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");

// create connection for sql database
var connection = mysql.createConnection({
  host: "localhost",

  // port
  port: 3306,

  // username
  user: "root",

  // password
  password: "",
  database: "bamazon"
});

// test connection
connection.connect(function(err) {
    if (err) throw err;
    // check to make sure we are connected to mySQL database correctly
    console.log("connected as id " + connection.threadId + "\n");
    // call next function below
    showProducts();
  });

  // First display all of the items available for sale
  function showProducts() {
    console.log("Showing all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Loop through all products and log all results of the SELECT statement
      for (i = 0; i < res.length; i++) {
        console.log(" - - - - - - - - - - - - - - - ");
        // item id number, auto increments
        console.log("Item Number: " + res[i].item_id);
        // product name
        console.log("Item Name: " + res[i].product_name);
        // department of product
        console.log("Department: " + res[i].department_name);
        // price of time in dollars
        console.log("Price: $" + res[i].price);
        // stock quantity of item
        console.log("Number Left: " + res[i].stock_quantity);
    }
      // call next function or end connection (connection.end()) below;
      purchaseProduct();
  });
}

// inquirer function to decide what product to buy and how many
function purchaseProduct () {
  inquirer.prompt([{
    type: "input",
    name: "item_id",
    message: "Please provide the item number of the product you would like to buy:",
    filter: Number
},
{
    type: "input",
    name: "quantity",
    message: "How many units of this item would you like to purchase?",
    filter: Number
}
])
.then(function (answer){
  // new varibale for the item id the user wants
  var item = answer.item_id;
  // new variable for the quantity the user wants
  var quantity = answer.quantity;
  // connect answers with sql database
  connection.query('SELECT * FROM products WHERE ?', { item_id: item }, function(err, res) {
    if (err) throw err;

    // error handler for invalid item ID - if no products are returned, 
    // give error message then show products again
    if (res.length === 0) {
        console.log("ERROR: Invalid Item Number. Please select a valid Item Number.");
        showProducts();
    } else {
      // set the results to the variable of productInfo
      var productInfo = res[0];

      // if the product quantity is less than or equal to the stock quantity, the order is placed!
      if (quantity <= productInfo.stock_quantity) {
        console.log(productInfo.product_name + " is in stock! Placing your order now.");
        
        // write variable to wpdate the sql database with lower stock quantity
        var updateQuery = "UPDATE products SET stock_quantity = " + (productInfo.stock_quantity - quantity) + " WHERE item_id = " + item;
        // Update the product's inventory
        connection.query(updateQuery, function(err, data) {
          if (err) throw err;
          console.log("Your order has been placed!");
          console.log("Your total due is $" + productInfo.price * quantity);
          console.log("Thank you for shopping with bamazon!");
          console.log(" - - - - - - - - - - - - - - - ");
          console.log("To continue shopping with us please input 'node bamazonCustomer.js' into your command line again.");
          console.log("\n");
          // End the database connection and close the app
          connection.end();
        });
      } else {
        console.log("Sorry, there are not enough " + productInfo.product_name + " in stock.");
        console.log("Please modify your order amount or select another item.");
        console.log("\n");
        // After 3 seconds display the inventory again so that the customer can make a new selection.
        setTimeout(function() {showProducts();}, 3000);
        }


    }
});


});
}

  