// lib/whatsapp.ts

// Extend the global object to store the client across HMR reloads
declare global {
    var whatsappClient: any;
    var whatsappIsReady: boolean | undefined;
    var whatsappQR: string | undefined;
}

/**
 * We use eval('require') here because it prevents Turbopack/Webpack from 
 * statically analyzing and bundling the heavy whatsapp-web.js library,
 * which is what causes the compilation panic.
 */
const getLibrary = () => {
    try {
        const req = eval('require');
        return {
            Client: req('whatsapp-web.js').Client,
            LocalAuth: req('whatsapp-web.js').LocalAuth,
            qrcode: req('qrcode-terminal')
        };
    } catch (err) {
        console.error("WhatsApp Link Error: Ensure 'whatsapp-web.js' and 'qrcode-terminal' are installed.");
        return null;
    }
};

export const getWhatsAppClient = async () => {
    if (global.whatsappClient && global.whatsappIsReady) {
        return { client: global.whatsappClient, qrCodeValue: global.whatsappQR || "", isReady: true };
    }

    const libs = getLibrary();
    if (!libs) return { client: null, qrCodeValue: "", isReady: false };

    const { Client, LocalAuth, qrcode } = libs;

    if (!global.whatsappClient) {
        console.log("🚀 Initializing WhatsApp Galactic Bridge...");

        global.whatsappClient = new Client({
            authStrategy: new LocalAuth(),
            puppeteer: {
                handleSIGINT: false,
                executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || (process.env.RAILWAY_ENVIRONMENT ? 'chromium' : undefined),
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-gpu',
                    '--no-zygote'
                ],
            }
        });

        global.whatsappClient.on('qr', (qr: string) => {
            console.log('📡 [WHATSAPP] New QR Transmission Received');
            global.whatsappQR = qr;
            global.whatsappIsReady = false;
            if (qrcode && qrcode.generate) {
                qrcode.generate(qr, { small: true });
            }
        });

        global.whatsappClient.on('ready', () => {
            console.log('✅ [WHATSAPP] Galactic Bridge Established!');
            global.whatsappIsReady = true;
            global.whatsappQR = "";
        });

        global.whatsappClient.on('auth_failure', (msg: string) => {
            console.error('❌ [WHATSAPP] Authentication Failed:', msg);
            global.whatsappIsReady = false;
        });

        global.whatsappClient.on('disconnected', () => {
            console.log('⚠️ [WHATSAPP] Bridge Disconnected');
            global.whatsappIsReady = false;
        });

        try {
            await global.whatsappClient.initialize();
        } catch (err) {
            console.error("❌ [WHATSAPP] Failed to initialize bridge", err);
        }
    }

    return {
        client: global.whatsappClient,
        qrCodeValue: global.whatsappQR || "",
        isReady: global.whatsappIsReady || false
    };
};
