'use strict';

import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { BadRequestError } from "../commons/errors";

export async function craftErrorResponse(err: Error, event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    console.error('Encountered error:', err);
    let statusCode: number;
    if (err instanceof BadRequestError) {
        statusCode = 400;
    } else {
        statusCode = 500;
    }
    return {
        statusCode: statusCode,
        body: JSON.stringify({
            error: extractErrorMessage(err)
        })
    };
};

function extractErrorMessage(error: Error): string {
    if (error instanceof Error) {
        return error.message;
    } else {
        return error;
    }
}