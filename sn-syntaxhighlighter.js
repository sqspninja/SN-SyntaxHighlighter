/*
 * This project uses Prism.js for syntax highlighting.
 * Prism.js is a lightweight, extensible syntax highlighter, built with modern web standards in mind.
 * https://prismjs.com/
 */

(function() {
    const cssUrls = [
        "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/toolbar/prism-toolbar.min.css"
    ];

    const scriptUrls = [
        "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/toolbar/prism-toolbar.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/show-language/prism-show-language.min.js"
    ];

    function loadCSS(url) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
        });
    }

    function loadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    Promise.all(cssUrls.map(loadCSS))
        .then(() => Promise.all(scriptUrls.map(loadScript)))
        .then(initializePrism)
        .catch(err => console.error('Error loading resources:', err));

    function initializePrism() {
        Prism.plugins.toolbar.registerButton('copy-to-clipboard', function (env) {
            var button = document.createElement('button');
            button.textContent = 'Copy';
            button.addEventListener('click', function () {
                var code = env.element;
                navigator.clipboard.writeText(code.textContent).then(function () {
                    button.textContent = 'Copied';
                    setTimeout(function () {
                        button.textContent = 'Copy';
                    }, 2000);
                }, function () {
                    button.textContent = 'Failed';
                });
            });
            return button;
        });

        Prism.plugins.toolbar.registerButton('show-language', function (env) {
            var pre = env.element.parentNode;
            if (!pre || !/pre/i.test(pre.nodeName)) {
                return;
            }
            var language = env.language;
            if (!language) {
                return;
            }
            var label = document.createElement('span');
            label.textContent = language.toUpperCase();
            return label;
        });

        Prism.highlightAll();

        // Run the escapeHTML function after Prism.js has finished highlighting
        escapeHTML();
    }

    function escapeHTML() {
        document.querySelectorAll('.sqs-block-code pre code').forEach((element) => {
            let html = element.innerHTML;
            let escapedHTML = html
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
            element.innerHTML = escapedHTML;
        });
    }
})();