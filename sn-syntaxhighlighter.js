/*
 * This project uses Prism.js for syntax highlighting.
 * Prism.js is a lightweight, extensible syntax highlighter, built with modern web standards in mind.
 * https://prismjs.com/
 */

(function() {
    const scriptUrls = [
        "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/toolbar/prism-toolbar.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/show-language/prism-show-language.min.js"
    ];

    let scriptsLoaded = 0;

    function scriptLoaded() {
        scriptsLoaded++;
        if (scriptsLoaded === scriptUrls.length) {
            wrapCodeElements(); // Wrap content in <code> elements and add classes
            initializePrism();
        }
    }

    scriptUrls.forEach((url) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = scriptLoaded;
        script.onerror = () => console.error(`Failed to load script: ${url}`);
        document.head.appendChild(script);
    });

    function wrapCodeElements() {
        document.querySelectorAll('.sqs-block-code pre').forEach((preElement) => {
            const codeElement = document.createElement('code');
            codeElement.className = 'language-html'; // Set the appropriate language class

            // Transfer the escaped HTML content to the <code> element
            codeElement.innerHTML = preElement.innerHTML;

            // Clear the <pre> element and append the <code> element inside it
            preElement.innerHTML = '';
            preElement.appendChild(codeElement);
        });
    }

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
    }
})();