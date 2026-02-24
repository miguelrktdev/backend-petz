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
    <body style="margin:0; padding:0; background-color:#fafafa; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fafafa; padding:40px 0;">
        <tr>
          <td align="center">
            <table width="100%" max-width="600" cellpadding="0" cellspacing="0" border="0" 
              style="background:#ffffff; border-radius:16px; padding:0; box-shadow:0 4px 24px rgba(244, 244, 244, 0.8); border:1px solid #f4f4f5;">

              <!-- Header -->
              <tr>
                <td style="background:linear-gradient(135deg, #f4f4f5 0%, #e4e4e7 100%); border-radius:16px 16px 0 0; padding:32px 40px; text-align:center;">
                  <div style="width:64px; height:64px; background:#ffffff; border-radius:16px; margin:0 auto 16px; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
                    <span style="font-size:32px;">🐾</span>
                  </div>
                  <h1 style="margin:0; font-size:24px; color:#18181b; font-weight:600; letter-spacing:-0.025em;">
                    Bem-vindo ao Petz!
                  </h1>
                  <p style="margin:8px 0 0; font-size:16px; color:#71717a; font-weight:400;">
                    Verifique seu e-mail para continuar
                  </p>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding:40px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="font-size:16px; color:#3f3f46; line-height:1.7; padding-bottom:24px;">
                        Olá <strong style="color:#18181b; font-weight:600;">${userName}</strong>,
                        <br /><br />
                        Estamos felizes em ter você aqui! Para garantir a segurança da sua conta, 
                        utilize o código abaixo para verificar seu endereço de e-mail:
                      </td>
                    </tr>

                    <!-- OTP Code -->
                    <tr>
                      <td align="center" style="padding:32px 0;">
                        <table cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td style="
                              background:linear-gradient(135deg, #fafafa 0%, #f4f4f5 100%);
                              border:2px solid #e4e4e7;
                              border-radius:12px;
                              padding:20px 32px;
                              text-align:center;
                              box-shadow:0 4px 12px rgba(0,0,0,0.02);">
                              <div style="
                                font-size:32px;
                                font-weight:700;
                                letter-spacing:8px;
                                color:#18181b;
                                font-family:'Courier New', monospace;
                                line-height:1;">
                                ${otpCode}
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Instructions -->
                    <tr>
                      <td style="padding-top:24px;">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fafafa; border-radius:12px; padding:20px;">
                          <tr>
                            <td style="font-size:14px; color:#52525b; line-height:1.6;">
                              <div style="display:flex; align-items:center; margin-bottom:12px;">
                                <span style="font-size:16px; margin-right:8px;">⏰</span>
                                <strong>Validade:</strong> Este código expira em 10 minutos
                              </div>
                              <div style="display:flex; align-items:center; margin-bottom:12px;">
                                <span style="font-size:16px; margin-right:8px;">🔒</span>
                                <strong>Segurança:</strong> Nunca compartilhe este código
                              </div>
                              <div style="display:flex; align-items:center;">
                                <span style="font-size:16px; margin-right:8px;">❓</span>
                                <strong style="margin-right:4px;">Não solicitou?</strong> Ignore este e-mail
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background:#fafafa; border-radius:0 0 16px 16px; padding:24px 40px; text-align:center; border-top:1px solid #f4f4f5;">
                  <p style="margin:0 0 12px; font-size:14px; color:#71717a; font-weight:500;">
                    Uma comunidade apaixonada por pets 🐾
                  </p>
                  <p style="margin:0; font-size:12px; color:#a1a1aa; line-height:1.5;">
                    © ${new Date().getFullYear()} Petz. Todos os direitos reservados.<br />
                    Este e-mail foi enviado para ${userName}
                  </p>
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
