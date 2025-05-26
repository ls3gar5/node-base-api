import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'crypto';



const REGION = 'us-east-1'; // e.g. "us-east-1"
const ddbClient = new DynamoDBClient({ region: REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);
const TABLE_NAME = 'books'; // Replace with your DynamoDB table name

export const handler = async (event) => {
  //console.log('Received event:', JSON.stringify(event, null, 2));

  const book = JSON.parse(event.body);

  if (!book?.title || !book?.author) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing required fields' }),
    };
  }

  const newBook = {
    ...book,
    id: randomUUID(),
  };

  try {
    await ddbDocClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: newBook,
      })
    );

    return {
      statusCode: 201,
      body: JSON.stringify(newBook),
    };
  } catch (error) {
    console.error('Error saving book:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error saving book', error: error.message }),
    };
  }
};

