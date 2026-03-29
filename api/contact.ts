export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.warn('RESEND_API_KEY not found. Simulating successful send.');
      return new Response(JSON.stringify({ success: true, simulated: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: 'vidhey.bhogadi2003@gmail.com', // Sending to yourself
        subject: subject || \`New message from \${name}\`,
        html: \`
          <h3>New Contact Flow Transmission</h3>
          <p><strong>Name:</strong> \${name}</p>
          <p><strong>Email:</strong> \${email}</p>
          <p><strong>Subject:</strong> \${subject}</p>
          <p><strong>Message:</strong></p>
          <p>\${message}</p>
        \`,
        reply_to: email,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return new Response(JSON.stringify({ success: true, data }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      const errorData = await res.json();
      return new Response(JSON.stringify({ error: errorData }), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
