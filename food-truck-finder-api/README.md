Food Truck Finder API - Deployment Guide (Node.js)
# Overview:
This service provides an API to find food trucks near a specific location using San Francisco's Open Data API. It's built with AWS Lambda (Node.js 20.x) and API Gateway for serverless deployment.

# Architecture:
API Gateway: Handles HTTP requests and CORS
AWS Lambda (Node.js): Processes requests and fetches food truck data
SF Open Data API: Data source for food truck locations

## Prerequisites:
AWS CLI configured with appropriate permissions
AWS account with Lambda and API Gateway access

# Deployment Steps:

1. Deploy using CloudFormation
bash
## Deploy to dev environment
aws cloudformation create-stack \
  --stack-name food-truck-api-dev \
  --template-body file://cloudformation-template.yaml \
  --parameters ParameterKey=Environment,ParameterValue=dev \
  --capabilities CAPABILITY_NAMED_IAM

## Check deployment status

aws cloudformation describe-stacks --stack-name food-truck-api-dev

2. Get the API URL
bash
aws cloudformation describe-stacks \
  --stack-name food-truck-api-dev \
  --query 'Stacks[0].Outputs[?OutputKey==`ApiUrl`].OutputValue' \
  --output text

3. Alternative: Deploy using AWS SAM (Optional)
Create template.yaml:

# yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31

Parameters:
  Environment:
    Type: String
    Default: dev

Resources:
  FoodTruckFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: src/
      Handler: index.handler
      Runtime: nodejs18.x
      Timeout: 30
      Events:
        Api:
          Type: Api
          Properties:
            Path: /food-trucks
            Method: get
Create src/package.json:

json
{
  "name": "food-truck-finder",
  "version": "1.0.0",
  "description": "Food truck finder Lambda function",
  "main": "index.js",
  "scripts": {
    "test": "jest"
  },
  "dependencies": {},
  "devDependencies": {
    "jest": "^29.0.0"
  }
}
Deploy with:

bash
sam build
sam deploy --guided
API Usage
Endpoint
GET /food-trucks
Required Parameters
lat (float): Latitude of the search location
lon (float): Longitude of the search location
Optional Parameters
radius (float): Search radius in miles (default: 1.0)
limit (int): Maximum number of results (default: 20)
Example Requests
Find food trucks near downtown San Francisco
bash
curl "https://your-api-id.execute-api.region.amazonaws.com/dev/food-trucks?lat=37.7749&lon=-122.4194"
Find food trucks within 2 miles, limit to 10 results
bash
curl "https://your-api-id.execute-api.region.amazonaws.com/dev/food-trucks?lat=37.7749&lon=-122.4194&radius=2&limit=10"
Example Response
json
{
  "location": {
    "latitude": 37.7749,
    "longitude": -122.4194,
    "search_radius_miles": 1.0
  },
  "total_found": 5,
  "food_trucks": [
    {
      "applicant": "Treats by the Bay LLC",
      "facility_type": "Truck",
      "location_description": "MARKET ST: 02ND ST to 03RD ST (100 - 199)",
      "address": "145 MARKET ST",
      "food_items": "Ice cream, candy, soft drinks",
      "latitude": 37.794331,
      "longitude": -122.398658,
      "distance_miles": 0.23,
      "status": "APPROVED",
      "permit": "23MFF-00001",
      "schedule": "Mo-Su:10AM-6PM"
    }
  ]
}
Error Responses
Missing Parameters (400)
json
{
  "error": "Missing required parameters: lat and lon"
}
Invalid Parameters (400)
json
{
  "error": "Invalid parameter format. lat, lon, and radius must be numbers"
}
Data Source Error (502)
json
{
  "error": "Failed to fetch food truck data",
  "details": "Connection timeout"
}
Testing the API
Using Node.js
javascript
const https = require('https');
const { URL } = require('url');

const apiUrl = 'https://your-api-id.execute-api.region.amazonaws.com/dev/food-trucks';
const params = new URLSearchParams({
    lat: '37.7749',
    lon: '-122.4194',
    radius: '1.5',
    limit: '10'
});

const url = new URL(`${apiUrl}?${params}`);

https.get(url, (response) => {
    let data = '';
    
    response.on('data', (chunk) => {
        data += chunk;
    });
    
    response.on('end', () => {
        const result = JSON.parse(data);
        console.log(`Found ${result.total_found} food trucks`);
        result.food_trucks.forEach(truck => {
            console.log(`${truck.applicant}: ${truck.food_items} (${truck.distance_miles} miles)`);
        });
    });
}).on('error', (error) => {
    console.error('Error:', error);
});
Using JavaScript (Browser/Frontend)
javascript
const apiUrl = 'https://your-api-id.execute-api.region.amazonaws.com/dev/food-trucks';
const params = new URLSearchParams({
    lat: '37.7749',
    lon: '-122.4194',
    radius: '1.5',
    limit: '10'
});

fetch(`${apiUrl}?${params}`)
    .then(response => response.json())
    .then(data => {
        console.log(`Found ${data.total_found} food trucks`);
        data.food_trucks.forEach(truck => {
            console.log(`${truck.applicant}: ${truck.food_items} (${truck.distance_miles} miles)`);
        });
    })
    .catch(error => console.error('Error:', error));
Monitoring and Logs
View Lambda Logs
bash
aws logs describe-log-groups --log-group-name-prefix "/aws/lambda/food-truck-finder"

# Tail logs
aws logs tail /aws/lambda/food-truck-finder-dev --follow
CloudWatch Metrics
Lambda duration
Lambda errors
API Gateway 4xx/5xx errors
API Gateway request count
Cost Optimization
Expected Costs (approximate)
Lambda: $0.000000208 per 100ms + $0.0000002 per request
API Gateway: $3.50 per million requests
CloudWatch Logs: $0.50 per GB ingested
Optimization Tips
Adjust Lambda memory based on performance testing
Implement caching for SF data (optional enhancement)
Set up API Gateway caching for frequent requests
Use shorter log retention periods
Security Considerations
Rate Limiting: Add API Gateway throttling
API Keys: Consider requiring API keys for production
CORS: Currently allows all origins - restrict in production
Input Validation: Lambda validates coordinates and numeric inputs
Troubleshooting
Common Issues
CORS Errors: Ensure OPTIONS method is deployed
Lambda Timeout: Increase timeout if SF API is slow
No Results: Check if coordinates are within SF area
502 Errors: Usually SF Open Data API connectivity issues
Debug Steps
Check CloudWatch logs for detailed error messages
Test Lambda function directly in AWS Console
Verify API Gateway integration configuration
Test SF Open Data API directly: curl "https://data.sfgov.org/resource/jjew-r69b.json?$limit=5"
Future Enhancements
Caching: Add Redis/ElastiCache for SF data
Database: Store frequently accessed data in DynamoDB
Authentication: Add Cognito or API key authentication
Multiple Cities: Extend to support other cities' open data
Real-time Updates: WebSocket support for live locations
Filtering: Add filters for food type, price range, ratings
