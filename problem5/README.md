# Project structure
src/
├── config/
│   └── database.ts
├── controllers/
│   └── resourceController.ts
├── models/
│   └── Resource.ts
├── routes/
│   └── resourceRoutes.ts
├── types/
│   └── index.ts
└── app.ts
├── Dockerfile
├── package.json
├── tsconfig.json


# How to run

A RESTful API for managing game resources built with Express, TypeScript, and SQLite.

## Prerequisites

- Node.js v18.20.8
- npm v10.8.2

## Installation

1. Clone the repository:
git clone <repository-url> cd problem5


2. Install dependencies:
npm install


3. Running the application:

Development mode:
npm run dev


Production mode:
npm run build npm start


## API Endpoints

### Resources

 **Create Resource**

 POST `/api/resources`

 Body: `{ "name": "Gold", "description": "In-game currency", "type": "currency" }`

 **List Resources**

 GET `/api/resources`

 Query parameters:
  
  `name`: Filter by name (partial match)

  `type`: Filter by type (exact match)

  `isActive`: Filter by active status (true/false)

 **Get Resource Details**

 GET `/api/resources/:id`

 **Update Resource**

 PUT `/api/resources/:id`

 Body: `{ "name": "Premium Gold", "description": "Premium in-game currency" }`


 **Delete Resource**

 DELETE `/api/resources/:id`


### cURL command:

#### Create Resource

curl -X POST http://localhost:3000/api/resources \
  -H "Content-Type: application/json" \
  -d '{"name": "Gold", "description": "In-game currency - gold", "type": "currency"}'

curl -X POST http://localhost:3000/api/resources \
  -H "Content-Type: application/json" \
  -d '{"name": "Silver", "description": "In-game currency - silver ", "type": "currency", "isActive" : false}'


curl -X POST http://localhost:3000/api/resources \
  -H "Content-Type: application/json" \
  -d '{"name": "Medal", "description": "award - medal ", "type": "award", "isActive" : false, "additional" : "added"}'


curl -X POST http://localhost:3000/api/resources \
  -H "Content-Type: application/json" \
  -d '{"id" : "1", "name": "Diamond", "description": "award - diamond ", "type": "award", "isActive" : false, "additional" : "added"}'



#### List All Resources

curl -X GET http://localhost:3000/api/resources

List Resources with Filters


####  Filter by name (partial match)
curl -X GET "http://localhost:3000/api/resources?name=gold"

####  Filter by type (exact match)
curl -X GET "http://localhost:3000/api/resources?type=currency"

####  Filter by active status
curl -X GET "http://localhost:3000/api/resources?isActive=true"

####  Multiple filters
curl -X GET "http://localhost:3000/api/resources?name=gold&isActive=true"


Get Resource Details

####  Replace 1 with the actual resource ID
curl -X GET http://localhost:3000/api/resources/1

Update Resource

####  Replace 1 with the actual resource ID
curl -X PUT http://localhost:3000/api/resources/7 \
  -H "Content-Type: application/json" \
  -d '{"id":9, "name": "Super medal", "description": "Super currency"}'

Delete Resource

####  Replace 1 with the actual resource ID
curl -X DELETE http://localhost:3000/api/resources/1



## Database

The application uses SQLite for data persistence. The database file will be created automatically at runtime.





This implementation provides a complete solution for the coding challenge with all the required CRUD operations, database integration, filtering capabilities, and proper error handling.







## Docker Instructions

Build Docker Image
```bash
docker build -t game-resource-api:latest .
```
Run Docker Container
```
docker run -p 3000:3000 -v $(pwd)/data:/app/data game-resource-api:latest
```

## Kubernetes Deployment Instructions
Apply the Kubernetes configurations
### Create persistent volume claim
kubectl apply -f k8s/pvc.yaml

### Deploy the application
kubectl apply -f k8s/deployment.yaml

### Create the service
kubectl apply -f k8s/service.yaml

### (Optional) Create ingress for external access
```
kubectl apply -f k8s/ingress.yaml
```
Check deployment status
```
kubectl get pods
kubectl get services
kubectl get pvc
```


Access the application
The application will be available:

Within the cluster: http://game-resource-api/api/resources 
With Ingress (if configured): https://api.yourgame.com/api/resources 

## Additional Considerations

1. **Production database**: For a production environment, consider replacing SQLite with a more robust database like PostgreSQL or MySQL, and use a managed database service (AWS RDS Postgres).

2. **Environment variables**: Use Kubernetes ConfigMaps and Secrets for configuration instead of hardcoding values.

3. **Horizontal scaling**: Note that SQLite is file-based and doesn't support multiple concurrent writers well. If you need to scale horizontally, switch to a client-server database.

4. **CI/CD Pipeline**: Consider setting up a CI/CD pipeline to automatically build, test, and deploy your application.
