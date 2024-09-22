// auth.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessages = document.querySelectorAll('.error');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Clear any previous errors
        clearErrors();

        // Basic front-end validation
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            displayError('Please fill out both fields.');
            return;
        }

        try {
            const response = await loginUser(email, password);
            if (response.ok) {
                window.location.href = '/dashboard'; // Redirect to dashboard on success
            } else {
                const result = await response.json();
                displayError(result.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            displayError('An error occurred. Please try again later.');
        }
    });

    function clearErrors() {
        errorMessages.forEach(error => error.style.display = 'none');
    }

    function displayError(message) {
        const error = document.querySelector('.error');
        error.textContent = message;
        error.style.display = 'block';
    }

    async function loginUser(email, password) {
        return await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
    }
});
