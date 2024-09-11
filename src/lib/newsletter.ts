import { Resend } from "resend";

import { config } from "dotenv";

const resend = new Resend(process.env.EMAIL_SERVER_PASSWORD);

export async function subscribeEmail(email: string) {
  const { error } = await resend.contacts.create({
    email,
    unsubscribed: false,
    audienceId: process.env.RESEND_AUDIENCE_ID || "",
  });
  if (error) {
    console.error(error);
    throw error;
  }
}
