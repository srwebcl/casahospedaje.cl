import type { APIRoute } from "astro";
import { Resend } from "resend";

// const resend = new Resend(import.meta.env.RESEND_API_KEY); // Moved inside handler

export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !phone || !subject || !message) {
        return new Response(
            JSON.stringify({
                message: "Faltan campos requeridos",
            }),
            { status: 400 }
        );
    }

    try {
        const resend = new Resend(import.meta.env.RESEND_API_KEY);

        const { data, error } = await resend.emails.send({
            from: "Casa Hospedaje <noreply@casahospedaje.cl>",
            to: ["contacto@casahospedaje.cl", "gonzalez.sergomar@gmail.com", "giorroel@gmail.com"],
            replyTo: email,
            subject: `Nuevo Mensaje: ${subject}`,
            html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body { margin: 0; padding: 0; font-family: 'Times New Roman', serif; background-color: #f9fafb; color: #1e293b; }
                .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border-radius: 2px; border-top: 4px solid #d97706; overflow: hidden; }
                .header { padding: 40px 20px; text-align: center; background-color: #1e3a8a; color: white; }
                .header h1 { margin: 0; font-size: 24px; font-weight: normal; letter-spacing: 1px; text-transform: uppercase; }
                .header p { margin: 10px 0 0; font-size: 14px; opacity: 0.8; font-family: sans-serif; }
                .content { padding: 40px 30px; }
                .intro { text-align: center; margin-bottom: 30px; font-size: 18px; color: #334155; font-style: italic; }
                .data-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
                .field-group { border-bottom: 1px solid #e2e8f0; padding-bottom: 15px; margin-bottom: 15px; }
                .field-group:last-child { border-bottom: none; }
                .label { display: block; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; font-family: sans-serif; }
                .value { font-size: 16px; color: #0f172a; line-height: 1.5; }
                .message-box { background-color: #f8fafc; padding: 20px; border-left: 3px solid #d97706; margin-top: 20px; font-style: italic; }
                .footer { background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; font-family: sans-serif; }
                a { color: #d97706; text-decoration: none; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Casa Hospedaje</h1>
                    <p>Cerro Los Placeres, Valparaíso</p>
                </div>
                <div class="content">
                    <div class="intro">
                        Ha llegado una nueva solicitud de reserva o consulta.
                    </div>
                    
                    <div class="data-grid">
                        <div class="field-group">
                            <span class="label">Huésped / Interesado</span>
                            <div class="value">${name}</div>
                        </div>
                        
                        <div class="field-group">
                            <span class="label">Contacto</span>
                            <div class="value">
                                <a href="mailto:${email}">${email}</a><br>
                                <a href="tel:${phone}">${phone}</a>
                            </div>
                        </div>

                        <div class="field-group">
                            <span class="label">Asunto</span>
                            <div class="value">${subject}</div>
                        </div>
                        
                        <div class="field-group">
                            <span class="label">Mensaje del Huésped</span>
                            <div class="message-box">
                                "${message}"
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <p>Recibido desde el sitio web oficial casahospedaje.cl</p>
                </div>
            </div>
        </body>
        </html>
      `,
        });

        if (error) {
            console.error("Resend Error:", error);
            return new Response(
                JSON.stringify({
                    message: "Error al enviar el correo: " + error.message,
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
