document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            fetch('n8n.webhook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => {
                if (response.ok) {
                    alert('Besked sendt!');
                    contactForm.reset();
                } else {
                    alert('Der opstod en fejl. Prøv igen.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Der opstod en fejl. Prøv igen.');
            });
        });
    }
});
