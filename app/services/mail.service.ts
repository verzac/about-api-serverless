import { ContactForm } from "../interfaces/contact-form.interface";
import AWS from 'aws-sdk';
import { BadRequestError } from "../commons/errors";

export async function sendContactForm(contactForm: ContactForm) {
    validateContactForm(contactForm);
    const sns = new AWS.SNS();
    let snsTopic: string;
    if (process.env.EMAIL_SNS_TOPIC) {
        snsTopic = process.env.EMAIL_SNS_TOPIC;
    } else if (process.env.EMAIL_SNS_TOPIC_PREDEFINED) {
        snsTopic = process.env.EMAIL_SNS_TOPIC_PREDEFINED;
    } else {
        throw new Error('SNS Topic is not provided!');
    }
    let formText = convertFormToText(contactForm);
    console.log(`Publishing notification to topic: ${snsTopic}`);
    await sns.publish({
        Message: formText,
        TopicArn: snsTopic,
        Subject: `[CONTACT FORM] ${contactForm.lastName}, ${contactForm.firstName}`
    }).promise();
}

function validateContactForm(contactForm: ContactForm) {
    if (!(contactForm.email && contactForm.firstName && contactForm.lastName && contactForm.message && contactForm.reason)) {
        throw new BadRequestError('BAD REQUEST; MISSING FIELDS'); // because i'm lazy
    }
}

function convertFormToText(contactForm: ContactForm): string {
    let output = `
    EMAIL: ${contactForm.email}

    MESSAGE: ${contactForm.message}

    REASON: ${contactForm.reason}

    NAME: ${contactForm.lastName}, ${contactForm.firstName}
    `
    return output;
}