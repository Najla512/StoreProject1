CREATE TABLE orders_producte (
    id SERIAL PRIMARY KEY,
    product_id INTEGER  NOT NULL,
    order_id INTEGER  NOT NULL,
    quantity INTEGER
);