document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'index.html' || currentPage === '') {
        handleLoginPage();
    }
    
    if (currentPage === 'dashboard.html') {
        handleDashboardPage();
    }
});

function handleLoginPage() {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            try {
                const result = await auth.login(username, password);
                messageDiv.style.color = '#38a169';
                messageDiv.textContent = result.message;
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
                
            } catch (error) {
                messageDiv.style.color = '#e53e3e';
                messageDiv.textContent = error.message;
            }
        });
    }
    
    if (auth.checkAuth()) {
        window.location.href = 'dashboard.html';
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
        welcomeElement.textContent = `Bonjour, ${user.username}`;
    }
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            auth.logout();
            window.location.href = 'index.html';
        });
    }
}
