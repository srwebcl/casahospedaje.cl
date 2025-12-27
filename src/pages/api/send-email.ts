import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const name = data.get("name");
    const email = data.get("email");
    const subject = data.get("subject");
    const message = data.get("message");

    if (!name || !email || !subject || !message) {
        return new Response(
            JSON.stringify({
                message: "Faltan campos requeridos",
            }),
            { status: 400 }
        );
    }

    try {
        const sendRes = await resend.emails.send({
            from: "Casa Hospedaje Web <noreply@casahospedaje.cl>", // Assumes domain is verified. If not, fallback to onboarding@resend.dev locally
            to: ["contacto@casahospedaje.cl"],
            replyTo: email as string,
            subject: `Nuevo Lead Web: ${subject}`,
            html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #1e3a8a; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
                .header h2 { color: white; margin: 0; }
                .content { background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
                .field { margin-bottom: 20px; }
                .label { font-weight: bold; color: #4b5563; font-size: 0.875rem; text-transform: uppercase; margin-bottom: 5px; display: block; }
                .value { background: white; padding: 12px; border-radius: 6px; border: 1px solid #e5e7eb; }
                .footer { text-align: center; margin-top: 30px; font-size: 0.75rem; color: #9ca3af; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>Nuevo Cliente Potencial</h2>
                </div>
                <div class="content">
                    <div class="field">
                        <span class="label">Nombre</span>
                        <div class="value">${name}</div>
                    </div>
                    <div class="field">
                        <span class="label">Email</span>
                        <div class="value"><a href="mailto:${email}" style="color: #1e3a8a; text-decoration: none;">${email}</a></div>
                    </div>
                    <div class="field">
                        <span class="label">Asunto</span>
                        <div class="value">${subject}</div>
                    </div>
                    <div class="field">
                        <span class="label">Mensaje</span>
                        <div class="value" style="white-space: pre-wrap;">${message}</div>
                    </div>
                </div>
                <div class="footer">
                    <p>Este mensaje fue enviado desde el formulario de contacto de casahospedaje.cl</p>
                </div>
            </div>
        </body>
        </html>
      `,
        });

        if (sendRes.error) {
            console.error("Resend Error:", sendRes.error);
            return new Response(
                JSON.stringify({
                    message: "Error al enviar el correo: " + sendRes.error.message,
                }),
                { status: 500 }
            );
        }

        return new Response(
            JSON.stringify({
                message: "Email enviado exitosamente",
            }),
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Server Error:", error);
        return new Response(
            JSON.stringify({
                message: error.message || "Error interno del servidor",
            }),
            { status: 500 }
        );
    }
};
