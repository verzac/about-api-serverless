import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { craftErrorResponse } from "./helpers/lambda.helper";
import { ContactForm } from "./interfaces/contact-form.interface";
import { sendContactForm } from "./services/mail.service";

export async function postContactForm(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
        let contactForm: ContactForm = JSON.parse(event.body as string);
        await sendContactForm(contactForm);
        return {
            statusCode: 204,
            body: "",
        }
    } catch (e) {
        return craftErrorResponse(e, event);
    }
}
