/*
 * This project uses Prism.js for syntax highlighting.
 * Prism.js is a lightweight, extensible syntax highlighter, built with modern web standards in mind.
 * https://prismjs.com/
 */

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
document.addEventListener('DOMContentLoaded', escapeHTML);
(function() {
    const scriptUrls = [
        "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/toolbar/prism-toolbar.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/show-language/prism-show-language.min.js"
    ];
    scriptUrls.forEach((url) => {
        const script = document.createElement('script');
        script.src = url;
        document.head.appendChild(script);
    });
    window.addEventListener('load', () => {
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
    });
})();