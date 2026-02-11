interface OTPEmailTemplateProps {
  name: string
  otp: string
}

export function otpVerificationEmailTemplate({ name, otp }: OTPEmailTemplateProps): string {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Código de Verificação OTP</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
          background-color: #09090b;
          color: #fafafa;
          line-height: 1.6;
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #09090b;
        }

        .email-wrapper {
          background-color: #18181b;
          border: 1px solid #27272a;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        .header {
          text-align: center;
          margin-bottom: 30px;
        }

        .logo {
          font-size: 28px;
          font-weight: 700;
          color: #e4e4e7;
          text-decoration: none;
        }

        .content {
          margin-bottom: 30px;
        }

        .greeting {
          font-size: 18px;
          font-weight: 600;
          color: #f4f4f5;
          margin-bottom: 20px;
        }

        .message {
          font-size: 15px;
          color: #a1a1a6;
          margin-bottom: 30px;
          line-height: 1.8;
        }

        .otp-section {
          background: linear-gradient(135deg, #27272a 0%, #1f1f23 100%);
          border: 1px solid #3f3f46;
          border-radius: 10px;
          padding: 30px;
          text-align: center;
          margin: 30px 0;
        }

        .otp-label {
          font-size: 13px;
          color: #71717a;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 15px;
          display: block;
        }

        .otp-code {
          font-size: 32px;
          font-weight: 700;
          color: #e4e4e7;
          letter-spacing: 6px;
          font-family: 'Courier New', monospace;
          word-break: break-all;
          background-color: #0a0a0b;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #3f3f46;
        }

        .expiry-warning {
          font-size: 13px;
          color: #a1a1a6;
          text-align: center;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #27272a;
        }

        .warning-text {
          color: #fca5a5;
          font-weight: 500;
        }

        .footer-message {
          font-size: 14px;
          color: #71717a;
          margin-bottom: 30px;
          padding: 20px;
          background-color: #0a0a0b;
          border-left: 3px solid #3f3f46;
          border-radius: 4px;
          line-height: 1.8;
        }

        .divider {
          height: 1px;
          background-color: #27272a;
          margin: 30px 0;
        }

        .footer {
          text-align: center;
          color: #71717a;
          font-size: 12px;
        }

        .security-note {
          background-color: #1f1f23;
          border-left: 3px solid #52525b;
          padding: 15px;
          margin-top: 20px;
          border-radius: 4px;
          font-size: 13px;
          color: #a1a1a6;
          line-height: 1.6;
        }

        .security-note strong {
          color: #e4e4e7;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="email-wrapper">
          <!-- Header -->
          <div class="header">
            <span class="logo">Petz</span>
          </div>

          <!-- Content -->
          <div class="content">
            <p class="greeting">Olá, ${name}!</p>
            
            <p class="message">
              Recebemos uma solicitação de verificação para sua conta. Use o código abaixo para completar o processo:
            </p>

            <!-- OTP Section -->
            <div class="otp-section">
              <span class="otp-label">Seu Código de Verificação</span>
              <div class="otp-code">${otp}</div>
              <div class="expiry-warning">
                Este código expira em <span class="warning-text">15 minutos</span>
              </div>
            </div>

            <!-- Footer Message -->
            <div class="footer-message">
              <strong>💡 Dica:</strong> Se você não solicitou este código, ignore este email. Sua conta permanecerá segura.
            </div>

            <!-- Security Note -->
            <div class="security-note">
              <strong>⚠️ Aviso de Segurança:</strong> Nunca compartilhe este código com ninguém. A equipe Petz nunca pedirá seu código OTP por email, telefone ou mensagem.
            </div>
          </div>

          <!-- Divider -->
          <div class="divider"></div>

          <!-- Footer -->
          <div class="footer">
            <p>
              © 2026 Petz. Todos os direitos reservados.<br>
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}
