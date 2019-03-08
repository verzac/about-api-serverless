import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export async function postContactForm(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    console.log(event);
    return {
        statusCode: 200,
        body: JSON.stringify({
            hello: 'there'
        }),
        headers: {
            sampleHeader: 'wassup'
        }
    }
}