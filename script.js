const heroTitle = document.querySelector('#hero-title');

if (heroTitle) {
    const text = heroTitle.textContent;
    const hoverText = 'Welcome to Rose portfolio';

    heroTitle.addEventListener('mouseover', () => {
        heroTitle.textContent = hoverText;
        heroTitle.style.color = 'brown';
    });
    heroTitle.addEventListener('mouseout', () => {
        heroTitle.textContent = text;
        heroTitle.style.color = 'lightcoral';
    })
}

const contactForm = document.querySelector('form');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = contactForm.querySelector('#name');
        const email = contactForm.querySelector('#email');
        const messange = contactForm.querySelector('#message');
        const submitButton = contactForm.querySelector('button[type="submit"]');


        // if (!name.value.trim() || !email.value.trim() || !messange.value.trim()) {
        //     alert('please complete every field before sending any messange');
        //     return;
        // }
        submitButton.disabled = true;
        submitButton.textContent = 'sending....';


        window.setTimeout(() => {
            contactForm.reset();
            submitButton.disabled = false;
            submitButton.textContent = 'Send Messange';

            const successMessange = document.createElement('p');
            successMessange.textContent = 'Thank for contacting us! Your messange issent.';
            successMessange.style.marginTop = '1rem';
            successMessange.style.color = 'white';
            successMessange.style.fontWeight = '700';
            contactForm.appendChild(successMessange);

            window.setTimeout(() => {
                successMessange.remove();
            }, 5000);
        }, 800);
    });
}
