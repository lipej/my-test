import { MailSender } from '@app/protocols/mail-sender';
import type { MailService } from '@sendgrid/mail';

export class SendgridMailSenderService implements MailSender {
  constructor(private client: MailService, private from: string) {}

  async send(to: string, subject: string, body: string): Promise<void> {
    await this.client.send({
      to,
      from: this.from,
      subject,
      html: body
    });
  }
}
