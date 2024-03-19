document.addEventListener('DOMContentLoaded', function() {
    // Fetch and inject the navigation bar HTML
    fetch('navbar.jsp')
        .then(response => response.text())
        .then(html => {
            // Insert the navigation bar after the header element
            const headerElement = document.querySelector('header');
            if (headerElement) {
                headerElement.insertAdjacentHTML('afterend', html);
            } else {
                // If there's no header, insert after the body's beginning
                document.querySelector('body').insertAdjacentHTML('afterbegin', html);
            }
        });

    // Link the CSS file dynamically
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'style1.css';
    document.head.appendChild(link);
});


