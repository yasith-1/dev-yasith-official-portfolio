// lib/whatsapp.ts
import fs from 'fs';
import { execSync } from 'child_process';

// Extend the global object to store the client across HMR reloads
declare global {
    var whatsappClient: any;
    var whatsappIsReady: boolean | undefined;
    var whatsappQR: string | undefined;
}

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

const findBrowserPath = () => {
    // 1. Check if user provided a path
    if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;

    // 2. Try to find it in the Nix store (Most likely for Railway)
    try {
        const nixPath = execSync('find /nix/store -name chromium -type f -executable | head -n 1').toString().trim();
        if (nixPath) {
            console.log(`📡 [WHATSAPP] Found Nix binary at: ${nixPath}`);
            return nixPath;
        }
    } catch (e) {
        console.log("📡 [WHATSAPP] Nix store scan skipped/failed");
    }

    // 3. Try standard "which" command
    try {
        const path = execSync('which chromium || which google-chrome-stable').toString().trim();
        if (path) {
            console.log(`📡 [WHATSAPP] "which" found browser at: ${path}`);
            return path;
        }
    } catch (e) { }

    // 4. Manual Fallbacks
    const fallbacks = ['/usr/bin/chromium', '/usr/bin/google-chrome-stable', '/usr/bin/google-chrome'];
    for (const f of fallbacks) {
        if (fs.existsSync(f)) return f;
    }

    return undefined;
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

        const executablePath = findBrowserPath();

        if (!executablePath) {
            console.warn("⚠️ [WHATSAPP] No browser path resolved. Attempting default launch...");
        } else {
            console.log(`✅ [WHATSAPP] Launching with: ${executablePath}`);
        }

        global.whatsappClient = new Client({
            authStrategy: new LocalAuth(),
            puppeteer: {
                handleSIGINT: false,
                executablePath: executablePath,
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
        } catch (err: any) {
            console.error("❌ [WHATSAPP] Critical Error:", err.message);
        }
    }

    return {
        client: global.whatsappClient,
        qrCodeValue: global.whatsappQR || "",
        isReady: global.whatsappIsReady || false
    };
};
