CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
  product_id INTEGER,
    quantity INTEGER,
    user_id INTEGER,
    status VARCHAR(15),
    FOREIGN KEY (user_id)  REFERENCES users(id),
       FOREIGN KEY (product_id) REFERENCES products(id)
);