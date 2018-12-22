# Bamazon
An Amazon-like storefront with MySQL. The app takes in orders from customers and depletes stock from the store's inventory. As a bonus task, you can program your app to track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.

# Instructions and Tools
MySQL Database called bamazon.
Contains a Table inside bamazon called products.
The products table have each of the following columns:

1. item_id (unique id for each product)

2. product_name (Name of product)

3. department_name

4. price (cost to customer)

5. stock_quantity (how much of the product is available in stores)

This database has around 10 different products.

# Node Application 
Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

The app then prompts users with two messages.

The first asks them "What is the ID of the product you would like to buy?"
The second message asks "How many units of the product you would like to buy?"

Once the customer has placed the order, the application will check if the store has enough of the product to meet the customer's request.
If not, the app will log a phrase like "Insufficient quantity!", and then prevent the order from going through.

However, if the store does have enough of the product, the customer's order will be fulfilled.

This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase.

[![Bamazon In Progress](https://img.youtu.be/tme-p7Um5VI.jpeg)](https://www.youtube.com/watch?v=tme-p7Um5VI&feature=youtu.be "Bamazon")
