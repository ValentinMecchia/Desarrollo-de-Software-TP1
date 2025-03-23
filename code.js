document.addEventListener('DOMContentLoaded', function() {
    async function loadSections() {
        const headerResponse = await fetch("./html/header.html");
        const headerHtml = await headerResponse.text();
        document.querySelector("header").innerHTML = headerHtml;

        const footerResponse = await fetch("./html/footer.html");
        const footerHtml = await footerResponse.text();
        document.querySelector("footer").innerHTML = footerHtml;

        setupNavbarScroll();
        setupSwitchListeners();
    }

    function setupNavbarScroll() {
        let lastScrollTop = 0;
        const navbar = document.querySelector('.navbar');
        const threshold = 50;

        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop - lastScrollTop > threshold) {
                navbar.style.top = '-100px';
                lastScrollTop = scrollTop;
            } else if (lastScrollTop - scrollTop > threshold) {
                navbar.style.top = '0';
                lastScrollTop = scrollTop;
            }
        });
    }

    function setupSwitchListeners() {
        document.querySelectorAll(".switch__input").forEach(function(switchInput) {
            switchInput.addEventListener("change", function(event) {
                if (event.target.checked) {
                    document.documentElement.style.setProperty("--main-background-color", "#3c3e37");
                    document.documentElement.style.setProperty("--secondary-background-color", "#6335bf");
                    document.documentElement.style.setProperty("--main-text-color", "#eee");
                    document.documentElement.style.setProperty("--secondary-text-color", "#555");
                    document.documentElement.style.setProperty("--third-text-color", "#2dd017");
                    document.querySelector(".links-container").style.filter = "invert(1)";
                } else {
                    document.documentElement.style.setProperty("--main-background-color", "#f3fae1");
                    document.documentElement.style.setProperty("--secondary-background-color", "#ae89f8");
                    document.documentElement.style.setProperty("--main-text-color", "#333");
                    document.documentElement.style.setProperty("--secondary-text-color", "#fff");
                    document.documentElement.style.setProperty("--third-text-color", "#5743f0");
                    document.querySelector(".links-container").style.filter = "invert(0)";
                }
            });
        });
    }

    loadSections();

    const form = document.getElementById('contact-form');
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert('Mensaje enviado con éxito!');
                form.reset();
            } else {
                alert('Hubo un error al enviar el mensaje.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al enviar el mensaje.');
        }
    });

    document.getElementById("send-button").addEventListener("mousedown", function() {
        document.getElementById("send-button").style.boxShadow = "none";
    });

    document.getElementById("send-button").addEventListener("mouseup", function() {
        document.getElementById("send-button").style.boxShadow = "5px 5px 0 var(--third-text-color)";
    });
});