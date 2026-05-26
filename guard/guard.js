
(function () {
    const allowed = 'https://app.mybintang.co.id';

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

    const isIframe = window.self !== window.top;
    const ref = document.referrer;

    if (!isIframe || !ref) {
        deny();
        return;
    }

    try {
        const origin = new URL(ref).origin;

        if (origin !== allowed) {
            deny();
            return;
        }

        document.documentElement.style.visibility = 'visible';

    } catch (e) {
        deny();
    }
})();