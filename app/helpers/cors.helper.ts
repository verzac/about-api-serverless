'use strict';

import { APIGatewayProxyEvent } from "aws-lambda";

const allowedOrigins = [
    /* LOCAL */ /localhost/,
    /about.benjamintanone.com/
];

export function extractOriginFromEvent(event: APIGatewayProxyEvent): string | null {
    if (event && event.headers) {
        return event.headers.Origin || event.headers.origin || null;
    } else {
        return null;
    }
}

export function isOriginAllowed(originString: string | null): boolean {
    let isAllowed = false;
    if (originString) {
        for (let i = 0; i < allowedOrigins.length; i++) {
            let allowedOrigin = allowedOrigins[i];
            if (originString.match(allowedOrigin)) {
                isAllowed = true;
            }
        }
    }
    return isAllowed;
};