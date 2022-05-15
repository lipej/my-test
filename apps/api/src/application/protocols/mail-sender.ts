export interface MailSender {
  send(to: string, subject: string, body: string): Promise<void>;
}
