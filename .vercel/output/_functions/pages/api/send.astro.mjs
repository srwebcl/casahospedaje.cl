import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const resend = new Resend(undefined                              );
const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, subject, message } = data;
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({
        message: "Faltan campos requeridos"
      }), { status: 400 });
    }
    const send = await resend.emails.send({
      from: "Casa Hospedaje <onboarding@resend.dev>",
      // Or verified domain if available
      to: ["gonzalez.sergomar@gmail.com"],
      replyTo: email,
      // Allow reply to the user
      subject: `Nuevo contacto: ${subject}`,
      html: `
        <h2>Nuevo mensaje de contacto desde la web</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `
    });
    if (send.error) {
      console.error(send.error);
      return new Response(JSON.stringify({
        message: send.error.message
      }), { status: 500 });
    }
    return new Response(JSON.stringify({
      message: "Correo enviado exitosamente"
    }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({
      message: "Error interno del servidor"
    }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
