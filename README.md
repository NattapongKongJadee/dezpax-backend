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
- **GET /products/:id**  
  ```bash
  curl -X GET http://localhost:8000/products/4
- **POST /products**
  ```bash
  curl -X POST http://localhost:8000/products \
  -H "Content-Type: application/json" \
  -d '{
    "sku": "SKU003",
    "name": "Add new product",
    "image": "/images/product3.jpg",
    "price": 300,
    "description": "Description of Product 3",
    "size": "Small",
    "weight": "500g"
  }'
- **PUT /products/:id**  
  ```bash
  curl -X PUT http://localhost:8000/products/6 \
  -H "Content-Type: application/json" \
  -d '{"sku":"SKU003","name":"Updated product","image":"/images/product3.jpg","price":350,"description":"Updated description of Product 3","size":"Medium","weight":"550g"}'
- **DELETE /products/:id**
  ```bash  
  curl -X DELETE http://localhost:8000/products/8
