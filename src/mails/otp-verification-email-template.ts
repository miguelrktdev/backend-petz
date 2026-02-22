type SendOtpEmailParams = {
  userName: string
  otpCode: string
}

export function generateOtpEmailTemplate({ userName, otpCode }: SendOtpEmailParams): {
  subject: string
  html: string
  text: string
} {
  const subject = "Verificação de e-mail - Seu código OTP"

  const html = `
  <!DOCTYPE html>
  <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${subject}</title>
    </head>
    <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f6f8; padding:20px 0;">
        <tr>
          <td align="center">
            <table width="100%" max-width="600" cellpadding="0" cellspacing="0" border="0" 
              style="background:#ffffff; border-radius:8px; padding:40px 30px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">

              <tr>
                <td align="center" style="padding-bottom:20px;">
                  <h1 style="margin:0; font-size:22px; color:#111827;">
                    Verificação de E-mail
                  </h1>
                </td>
              </tr>

              <tr>
                <td style="font-size:16px; color:#374151; line-height:1.6;">
                  Olá <strong>${userName}</strong>,
                  <br /><br />
                  Utilize o código abaixo para verificar seu endereço de e-mail:
                </td>
              </tr>

              <tr>
                <td align="center" style="padding:30px 0;">
                  <div style="
                    display:inline-block;
                    padding:16px 32px;
                    font-size:28px;
                    font-weight:bold;
                    letter-spacing:6px;
                    background:#f3f4f6;
                    color:#111827;
                    border-radius:6px;
                    border:1px solid #e5e7eb;">
                    ${otpCode}
                  </div>
                </td>
              </tr>

              <tr>
                <td style="font-size:14px; color:#6b7280; line-height:1.6;">
                  Este código expira em alguns minutos por motivos de segurança.
                  <br /><br />
                  Se você não solicitou este código, pode ignorar este e-mail.
                </td>
              </tr>

              <tr>
                <td style="padding-top:30px; font-size:12px; color:#9ca3af; text-align:center;">
                  © ${new Date().getFullYear()} Sua Empresa. Todos os direitos reservados.
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `

  const text = `
Olá ${userName},

Seu código de verificação é:

${otpCode}

Este código expira em alguns minutos.

Se você não solicitou este código, ignore este e-mail.
`

  return {
    subject,
    html,
    text,
  }
}
