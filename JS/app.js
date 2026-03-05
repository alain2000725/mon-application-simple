document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html') {
        handleLoginPage();
    } else if (currentPage === 'signup.html') {
        handleSignupPage();
    } else if (currentPage === 'forgot-password.html') {
        handleForgotPasswordPage();
    } else if (currentPage === 'dashboard.html') {
        handleDashboardPage();
    }
});

function handleLoginPage() {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            messageDiv.className = 'message';
            messageDiv.textContent = 'Connexion en cours...';
            
            try {
                const result = await auth.login(email, password);
                messageDiv.className = 'message success';
                messageDiv.textContent = result.message;
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } catch (error) {
                messageDiv.className = 'message error';
                messageDiv.textContent = error.message;
            }
        });
    }
    
    if (auth.checkAuth()) {
        window.location.href = 'dashboard.html';
    }
}

function handleSignupPage() {
    const signupForm = document.getElementById('signupForm');
    const messageDiv = document.getElementById('message');
    
    if (signupForm) {
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            messageDiv.className = 'message';
            messageDiv.textContent = 'Inscription en cours...';
            
            try {
                const result = await auth.signup(name, email, password, confirmPassword);
                messageDiv.className = 'message success';
                messageDiv.textContent = result.message;
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } catch (error) {
                messageDiv.className = 'message error';
                messageDiv.textContent = error.message;
            }
        });
    }
}

function handleForgotPasswordPage() {
    const forgotForm = document.getElementById('forgotPasswordForm');
    const messageDiv = document.getElementById('message');
    
    if (forgotForm) {
        forgotForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            
            messageDiv.className = 'message';
            messageDiv.textContent = 'Envoi en cours...';
            
            try {
                const result = await auth.forgotPassword(email);
                messageDiv.className = 'message success';
                messageDiv.textContent = result.message;
            } catch (error) {
                messageDiv.className = 'message error';
                messageDiv.textContent = error.message;
            }
        });
    }
}

function handleDashboardPage() {
    if (!auth.checkAuth()) {
        window.location.href = 'index.html';
        return;
    }
    
    const user = auth.getCurrentUser();
    const welcomeElement = document.getElementById('welcomeMessage');
    if (welcomeElement && user) {
        welcomeElement.textContent = `Bonjour, ${user.name || user.username}`;
    }
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            auth.logout();
            window.location.href = 'index.html';
        });
    }
}
