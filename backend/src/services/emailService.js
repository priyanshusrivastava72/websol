import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

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
