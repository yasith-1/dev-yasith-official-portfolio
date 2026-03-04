import { NextResponse } from 'next/server';
import { getWhatsAppClient } from '@/lib/whatsapp';

export async function POST(req: Request) {
    try {
        const { message, to } = await req.json();

        if (!message || !to) {
            return NextResponse.json({ error: 'Missing message or recipient' }, { status: 400 });
        }

        const { client, isReady } = await getWhatsAppClient();

        if (!client || !isReady) {
            return NextResponse.json({
                error: 'WhatsApp bot is not linked or ready.',
                details: 'Scan the QR code at /api/whatsapp/auth to link your device.'
            }, { status: 503 });
        }

        // Format the number for WhatsApp (needs @c.us)
        const formattedNumber = to.includes('@c.us') ? to : `${to}@c.us`;

        // Send the message
        await client.sendMessage(formattedNumber, `🌌 *New Portfolio Transmission*\n\n${message}`);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error sending WhatsApp message:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
