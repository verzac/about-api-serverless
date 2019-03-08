import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { craftErrorResponse } from "./helpers/lambda.helper";

export async function lambdaHandler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    try {
        return {
            statusCode: 200,
            body: JSON.stringify({
                text: 'Why hello there!'
            })
        }
    } catch (err) {
        return craftErrorResponse(err, event);
    }

};