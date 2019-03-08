'use strict';

import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";

export async function craftErrorResponse(err: Error, event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    console.error('Encountered error:', err);
    return {
        statusCode: 500,
        body: JSON.stringify({
            error: err
        })
    };
};