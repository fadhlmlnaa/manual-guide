(function () {
    const allowed = 'https://app.mybintang.co.id';

    // ENV detection (clean way)
    const ENV = location.hostname.includes('localhost') || location.hostname === '127.0.0.1' || location.protocol === 'file:'
        ? 'dev'
        : 'prod';

    function allow() {
        document.documentElement.style.visibility = 'visible';
    }

    function deny() {
        document.open();
        document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Access Denied</title>
                <style>
                    html, body {
                        margin: 0;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                        background: #111;
                        color: red;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-family: sans-serif;
                    }
                </style>
            </head>
            <body>
                <h1>Access Denied</h1>
            </body>
            </html>
        `);
        document.close();
        throw new Error("Unauthorized");
    }

    // ✅ DEV MODE: skip semua restriction
    if (ENV === 'dev') {
        allow();
        return;
    }

    // PROD MODE CHECK
    const isIframe = window.self !== window.top;
    const ref = document.referrer;

    if (!isIframe || !ref) {
        deny();
        return;
    }

    try {
        const origin = new URL(ref).origin;

        if (origin !== allowed && origin !== window.location.origin) {
            deny();
            return;
        }

        allow();

    } catch (e) {
        deny();
    }
})();