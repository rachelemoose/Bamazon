CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(50) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blanket", "Home", 29.99, 5), ("Candle", "Home", 11.25, 3), ("Basketball", "Sports", 24.49, 2),
("Lamp", "Home", 40.39, 1), ("Deodorant", "Beauty", 4.99, 4), ("Red Wine", "Groceries", 15.55, 4),
("White Wine", "Groceries", 29.99, 1), ("Suitcase", "Travel", 79.99, 2), ("Duffle Bag", "Travel", 40.99, 1),
("Coasters", "Home", 4.59, 4), ("Plates", "Home", 5.05, 5);

SELECT * FROM products;