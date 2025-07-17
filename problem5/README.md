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

- **Create Resource**
- POST `/api/resources`
- Body: `{ "name": "Gold", "description": "In-game currency", "type": "currency" }`

- **List Resources**
- GET `/api/resources`
- Query parameters:
 - `name`: Filter by name (partial match)
 - `type`: Filter by type (exact match)
 - `isActive`: Filter by active status (true/false)

- **Get Resource Details**
- GET `/api/resources/:id`

- **Update Resource**
- PUT `/api/resources/:id`
- Body: `{ "name": "Premium Gold", "description": "Premium in-game currency" }`

- **Delete Resource**
- DELETE `/api/resources/:id`

## Database

The application uses SQLite for data persistence. The database file will be created automatically at runtime.







How to Test the API
After starting the application, you can use tools like Postman or curl to test the API endpoints:

Create a resource:
POST http://localhost:3000/api/resources
Content-Type: application/json

{
  "name": "Gold",
  "description": "In-game currency",
  "type": "currency"
}
Get all resources:
GET http://localhost:3000/api/resources
Get resources with filters:
GET http://localhost:3000/api/resources?name=gold&isActive=true
Get a specific resource:
GET http://localhost:3000/api/resources/1
Update a resource:
PUT http://localhost:3000/api/resources/1
Content-Type: application/json

{
  "name": "Premium Gold",
  "description": "Premium in-game currency"
}
Delete a resource:
DELETE http://localhost:3000/api/resources/1
This implementation provides a complete solution for the coding challenge with all the required CRUD operations, database integration, filtering capabilities, and proper error handling.







## Docker Instructions

### Build Docker Image
```bash
docker build -t game-resource-api:latest .
Run Docker Container
docker run -p 3000:3000 -v $(pwd)/data:/app/data game-resource-api:latest
Kubernetes Deployment Instructions
Apply the Kubernetes configurations
# Create persistent volume claim
kubectl apply -f k8s/pvc.yaml

# Deploy the application
kubectl apply -f k8s/deployment.yaml

# Create the service
kubectl apply -f k8s/service.yaml

# (Optional) Create ingress for external access
kubectl apply -f k8s/ingress.yaml
Check deployment status
kubectl get pods
kubectl get services
kubectl get pvc



Access the application
The application will be available:

Within the cluster: http://game-resource-api/api/resources 
With Ingress (if configured): https://api.yourgame.com/api/resources 

## Step 5: Additional Considerations

1. **Production database**: For a production environment, consider replacing SQLite with a more robust database like PostgreSQL or MySQL, and use a managed database service.

2. **Environment variables**: Use Kubernetes ConfigMaps and Secrets for configuration instead of hardcoding values.

3. **Horizontal scaling**: Note that SQLite is file-based and doesn't support multiple concurrent writers well. If you need to scale horizontally, switch to a client-server database.

4. **CI/CD Pipeline**: Consider setting up a CI/CD pipeline to automatically build, test, and deploy your application.

Example ConfigMap (`k8s/configmap.yaml`) if you decide to use environment variables:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: game-resource-api-config
data:
  PORT: "3000"
  NODE_ENV: "production"
