import { corsLambdaHandler } from './helpers/lambda.helper';
import { APIGatewayProxyHandler } from 'aws-lambda';
export const corsHandler: APIGatewayProxyHandler = corsLambdaHandler;