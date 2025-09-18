document.addEventListener('DOMContentLoaded', () => {
    const loginModal = document.getElementById('login-modal');
    const closeBtn = document.querySelector('.close-btn');
    const loginPopupBtn = document.getElementById('login-popup-btn');

    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const loginFormContainer = document.getElementById('login-form-container');
    const signupFormContainer = document.getElementById('signup-form-container');

    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginBtn = document.getElementById('login-btn');

    const openModal = () => {
        loginModal.style.display = 'block';
        document.body.classList.add('modal-open');
    };

    const closeModal = () => {
        loginModal.style.display = 'none';
        document.body.classList.remove('modal-open');
    };

    if (loginPopupBtn) {
        loginPopupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }
    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            closeModal();
        }
    });

    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginFormContainer.style.display = 'none';
        signupFormContainer.style.display = 'block';
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupFormContainer.style.display = 'none';
        loginFormContainer.style.display = 'block';
    });

    loginBtn.addEventListener('click', () => {
        const email = loginForm.email.value;
        const password = loginForm.password.value;

        // Dummy user data
        const users = {
            'user1@test.com': { password: 'password1', dataDir: 'dashboard data/user1_data' },
            'user2@test.com': { password: 'password2', dataDir: 'dashboard data/user2_data' }
        };

        if (users[email] && users[email].password === password) {
            const dataDir = users[email].dataDir;
            const url = `dashboard.html?user=${encodeURIComponent(dataDir)}`;
            window.location.assign(url);
        } else {
            alert('Invalid email or password.');
        }
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Dummy signup process
        const name = signupForm.name.value;
        if (name) {
            alert('Sign up successful! Please log in.');
            signupFormContainer.style.display = 'none';
            loginFormContainer.style.display = 'block';
            signupForm.reset();
        } else {
            alert('Please fill out all fields.');
        }
    });
});
