import { NextResponse } from 'next/server';
import { getWhatsAppClient } from '@/lib/whatsapp';

export async function GET() {
    try {
        const { qrCodeValue, isReady } = await getWhatsAppClient();

        if (!isReady && qrCodeValue) {
            return NextResponse.json({
                authenticated: false,
                qr: qrCodeValue,
                instruction: "Scan this QR code in your WhatsApp Linked Devices to enable the portfolio bot feature."
            });
        }

        if (!isReady) {
            return NextResponse.json({
                authenticated: false,
                message: "Bot is initializing or disconnected. Please wait or check terminal."
            });
        }

        return NextResponse.json({
            authenticated: true,
            message: "WhatsApp client is active and ready."
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
