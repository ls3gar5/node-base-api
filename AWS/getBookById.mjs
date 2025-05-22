import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const ddbDocClient = DynamoDBDocumentClient.from(
    new DynamoDBClient({ region: 'us-east-1'})
);
const TABLE_NAME = 'books';

export const handler = async (event) => {
    try {

        const id = event.pathParameters?.author;

        if(!id) {
            return {
                statusCode: 400,
                body: JSON.stringify( { message: 'Missing required files', id })
            };
        }

        const command =  new GetCommand({
                    TableName: TABLE_NAME,
                    Key: {
                        id,
                    }
            });

        const { Item } =  await ddbDocClient.send(command);

        if (!Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Book not found', TABLE_NAME, id }),
            };
        }
        
        return {
            statusCode: 200,
            body: JSON.stringify(Item),
        };
    } 
    catch (error) {
        console.error('Error fetching book:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching book', error: error.message, id }),
        };
    }
};