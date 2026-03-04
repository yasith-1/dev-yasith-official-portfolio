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
    console.log(`📡 [WHATSAPP] Checking PUPPETEER_EXECUTABLE_PATH: ${process.env.PUPPETEER_EXECUTABLE_PATH || 'not set'}`);
    if (process.env.PUPPETEER_EXECUTABLE_PATH) {
        const envPath = process.env.PUPPETEER_EXECUTABLE_PATH;
        if (fs.existsSync(envPath)) {
            console.log(`📡 [WHATSAPP] Using environment path (absolute): ${envPath}`);
            return envPath;
        } else {
            // Try to see if it's a command in PATH
            try {
                const resolvedPath = execSync(`which ${envPath} 2>/dev/null`).toString().trim();
                if (resolvedPath && fs.existsSync(resolvedPath)) {
                    console.log(`📡 [WHATSAPP] Using environment path (resolved via which): ${resolvedPath}`);
                    return resolvedPath;
                }
            } catch (e) { }
            console.warn(`⚠️ [WHATSAPP] Could not resolve PUPPETEER_EXECUTABLE_PATH: ${envPath}`);
        }
    }

    // 2. Try standard "which" command for common names
    const commonNames = ['chromium', 'chromium-browser', 'google-chrome-stable', 'google-chrome', 'chrome'];
    for (const name of commonNames) {
        try {
            const path = execSync(`which ${name} 2>/dev/null`).toString().trim();
            if (path && fs.existsSync(path)) {
                console.log(`📡 [WHATSAPP] Found via which (${name}): ${path}`);
                return path;
            }
        } catch (e) { }
    }

    // 3. Try Nix-specific and common Linux paths
    const fallbacks = [
        '/usr/bin/chromium',
        '/usr/bin/chromium-browser',
        '/usr/bin/google-chrome-stable',
        '/usr/bin/google-chrome',
        '/usr/bin/chrome',
        '/usr/local/bin/chromium',
        '/nix/var/nix/profiles/default/bin/chromium',
        '/nix/var/nix/profiles/default/bin/google-chrome',
        '/nix/var/nix/profiles/per-user/root/channels/nixpkgs/bin/chromium'
    ];

    for (const f of fallbacks) {
        if (fs.existsSync(f)) {
            console.log(`📡 [WHATSAPP] Found via fallback path: ${f}`);
            return f;
        }
    }

    // 4. More aggressive Nix store search
    try {
        if (fs.existsSync('/nix/store')) {
            const nixPath = execSync('find /nix/store -maxdepth 4 -name chromium -type f -executable 2>/dev/null | head -n 1').toString().trim();
            if (nixPath) {
                console.log(`📡 [WHATSAPP] Found via Nix store scan: ${nixPath}`);
                return nixPath;
            }
        }
    } catch (e) {
        console.log("📡 [WHATSAPP] Nix store scan failed/skipped");
    }

    // 5. Final fallback to hope it's in PATH
    console.log("📡 [WHATSAPP] Returning final fallback: chromium");
    return 'chromium';
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
            console.log("🚦 Starting WhatsApp client initialization...");
            await global.whatsappClient.initialize();
        } catch (err: any) {
            console.error("❌ [WHATSAPP] Critical Error during initialization:", err);
            if (err.message && err.message.includes('launch')) {
                console.error("💡 TIP: This usually means a browser dependency is missing or the path is incorrect.");
            }
        }
    }

    return {
        client: global.whatsappClient,
        qrCodeValue: global.whatsappQR || "",
        isReady: global.whatsappIsReady || false
    };
};
