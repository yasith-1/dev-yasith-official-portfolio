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
    // If user provided a path in environment, priority 1
    if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;

    // Check system via "which" command (Priority 2)
    try {
        const path = execSync('which chromium || which google-chrome-stable || which google-chrome').toString().trim();
        if (path) {
            console.log(`📡 [WHATSAPP] System found browser at: ${path}`);
            return path;
        }
    } catch (e) {
        // "which" failed, continue to manual check
    }

    // Common paths for Chrome/Chromium (Priority 3)
    const paths = [
        '/usr/bin/chromium',
        '/usr/bin/google-chrome-stable',
        '/usr/bin/google-chrome',
        '/nix/var/nix/profiles/default/bin/chromium',
        '/nix/var/nix/profiles/default/bin/google-chrome-stable'
    ];

    for (const path of paths) {
        if (fs.existsSync(path)) {
            console.log(`📡 [WHATSAPP] Manual scan found browser at: ${path}`);
            return path;
        }
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
            console.error("❌ [WHATSAPP] CRITICAL: No browser browser found. Bot cannot start.");
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
            console.error("❌ [WHATSAPP] Initialization Error:", err.message);
        }
    }

    return {
        client: global.whatsappClient,
        qrCodeValue: global.whatsappQR || "",
        isReady: global.whatsappIsReady || false
    };
};
