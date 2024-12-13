# dezpax-backend

# Project Name

Dezpax-backend

## Start Command

npm start

## PORT

8000

## API

- **GET /products**
- **GET /products/:id**
- **POST /products**
- **PUT /products/:id**
- **DELETE /products/:id**

## API TEST

- **GET /products**
  ```bash
  curl -X GET http://localhost:8000/products
  ```
- **GET /products/:id**
  ```bash
  curl -X GET http://localhost:8000/products/3
  ```
- **POST /products**
  ```bash
  curl -X POST http://localhost:8000/products \
  -H "Content-Type: application/json" \
  -d '{
    "sku": "SKU003",
    "name": "Add NEW",
    "image": "/images/01.jpeg",
    "price": 300,
    "description": "Description of Product 3",
    "size": "Small",
    "weight": "500g"
  }'
  ```
- **PUT /products/:id**
  ```bash
  curl -X PUT http://localhost:8000/products/6 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated"}'
  ```
- **DELETE /products/:id**
  ```bash
  curl -X DELETE http://localhost:8000/products/8
  ```
