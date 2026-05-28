import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendLeadNotification = async (contactData) => {
  try {
    const { name, email, phone, business, message, capabilities } = contactData;
    const capabilityTags = capabilities && capabilities.length > 0 ? capabilities.join(', ') : 'None selected';
    const timestamp = new Date().toLocaleString();

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 10px; overflow: hidden; background-color: #ffffff;">
        <div style="background-color: #7c3aed; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0;">🚀 New WebSol Lead Received</h2>
        </div>
        <div style="padding: 20px; color: #333333;">
          <p style="font-size: 16px; line-height: 1.5;">A new contact form submission has been captured.</p>
          <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; width: 130px; color: #666666;">Name</td>
              <td style="padding: 10px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #666666;">Email</td>
              <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #7c3aed;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #666666;">Phone</td>
              <td style="padding: 10px 0;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #666666;">Business</td>
              <td style="padding: 10px 0;">${business}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #666666;">Capabilities</td>
              <td style="padding: 10px 0;">
                <span style="background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #374151;">
                  ${capabilityTags}
                </span>
              </td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-left: 4px solid #7c3aed; border-radius: 4px;">
            <p style="margin: 0; font-style: italic; color: #4b5563;">"${message}"</p>
          </div>
          
          <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p style="font-size: 12px; color: #9ca3af; text-align: center;">
            Submitted on: ${timestamp}
          </p>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: 'WebSol Agency <onboarding@resend.dev>', // Update this to a verified domain in production
      to: ['linksvardha1@gmail.com'], // Your email where you want to receive leads
      subject: '🚀 New WebSol Lead Received',
      html: htmlContent,
    });

    if (error) {
      console.error(`❌ Email Sending Failed: ${error.message}`);
      return false;
    }

    console.log(`✅ Email Sent Successfully (ID: ${data.id})`);
    return true;
  } catch (error) {
    console.error(`❌ Email Sending Exception: ${error.message}`);
    return false;
  }
};

export const sendAutoReplyEmail = async (contactData) => {
  try {
    const { name, email, capabilities } = contactData;
    const capabilityTags = capabilities && capabilities.length > 0 ? capabilities.join(', ') : 'None selected';
    const currentYear = new Date().getFullYear();

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 10px; overflow: hidden; background-color: #ffffff;">
        <div style="background-color: #0f172a; padding: 30px; text-align: center; border-bottom: 3px solid #7c3aed;">
          <h2 style="color: #ffffff; margin: 0; font-weight: 900; letter-spacing: 1px;">VARDHA LINKS</h2>
        </div>
        <div style="padding: 30px; color: #333333;">
          <h3 style="font-size: 20px; color: #111827;">Hello ${name},</h3>
          <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
            Thank you for reaching out to <strong>Vardha Links</strong>. We have successfully received your request and our engineering and design team is currently reviewing it.
          </p>
          
          <div style="margin: 25px 0; padding: 20px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #7c3aed;">
            <p style="margin: 0; font-size: 14px; color: #6b7280; font-weight: bold; text-transform: uppercase;">Requested Capabilities:</p>
            <p style="margin: 8px 0 0 0; font-size: 15px; color: #111827; font-weight: 600;">${capabilityTags}</p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
            We aim to deliver premium, scalable digital solutions. One of our experts will get back to you shortly to discuss your project parameters in detail.
          </p>

          <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin-top: 30px;">
            Best Regards,<br />
            <strong>The Vardha Links Team</strong>
          </p>
        </div>
        <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #eaeaea;">
          <p style="margin: 0; font-size: 12px; color: #9ca3af;">
            &copy; ${currentYear} Vardha Links. All rights reserved.
          </p>
        </div>
      </div>
    `;

    console.log(`\n--- AUTO REPLY DEBUG LOG ---`);
    console.log(`[1] Recipient Email (To): ${email}`);
    console.log(`[2] Sender Email (From): Vardha Links <onboarding@resend.dev>`);
    
    const { data, error } = await resend.emails.send({
      from: 'Vardha Links <onboarding@resend.dev>', // Update this to a verified domain in production
      to: [email],
      subject: '🚀 We Received Your Request | Vardha Links',
      html: htmlContent,
    });

    console.log(`[3] Resend API Response:`, JSON.stringify({ data, error }, null, 2));

    if (error) {
      console.error(`❌ Auto Reply Email Failed: ${error.message}`);
      return false;
    }

    console.log(`✅ Auto Reply Email Sent Successfully (ID: ${data.id})\n----------------------------\n`);
    return true;
  } catch (error) {
    console.error(`❌ Auto Reply Email Exception: ${error.message}`);
    return false;
  }
};
