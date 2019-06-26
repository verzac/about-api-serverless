'use strict';

import { APIGatewayProxyResult, APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { BadRequestError } from "../commons/errors";
import { isOriginAllowed, extractOriginFromEvent } from "./cors.helper";

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

export function withCors(lambdaHandler: APIGatewayProxyHandler): APIGatewayProxyHandler {
    return async function (event, context, callback): Promise<APIGatewayProxyResult> {
        let response = await lambdaHandler(event, context, callback) as APIGatewayProxyResult;
        let corsOrigin = extractOriginFromEvent(event);
        if (isOriginAllowed(corsOrigin)) {
            if (!response.headers) {
                response.headers = {};
            }
            response.headers['Access-Control-Allow-Methods'] = event.httpMethod.toUpperCase();
            response.headers['Access-Control-Allow-Origin'] = corsOrigin as string;
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token';
        }
        return response;
    }
}

export async function corsLambdaHandler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    console.log('Hello!');
    let headers = {};
    let corsOrigin = extractOriginFromEvent(event);
    if (!isOriginAllowed(corsOrigin)) {
        console.error('Not allowed!');
        return {
            statusCode: 403,
            body: 'Invalid CORS request',
        };
    }
    headers['Access-Control-Allow-Origin'] = corsOrigin as string;
    headers['Access-Control-Allow-Methods'] = event.httpMethod.toUpperCase();
    headers['Access-Control-Allow-Headers'] = 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token';
    console.error('Done!');
    return {
        statusCode: 200,
        body: "",
        headers: headers,
    };
}