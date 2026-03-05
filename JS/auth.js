// Gestion de l'authentification
class Auth {
    constructor() {
        this.isAuthenticated = false;
        this.currentUser = null;
    }

    checkAuth() {
        const user = localStorage.getItem('currentUser');
        if (user) {
            this.isAuthenticated = true;
            this.currentUser = JSON.parse(user);
            return true;
        }
        return false;
    }

    login(username, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username && password) {
                    const user = {
                        username: username,
                        loginTime: new Date().toISOString()
                    };
                    
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.isAuthenticated = true;
                    this.currentUser = user;
                    
                    resolve({
                        success: true,
                        message: 'Connexion réussie',
                        user: user
                    });
                } else {
                    reject({
                        success: false,
                        message: 'Nom d\'utilisateur et mot de passe requis'
                    });
                }
            }, 500);
        });
    }

    signup(name, email, password, confirmPassword) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (password !== confirmPassword) {
                    reject({
                        success: false,
                        message: 'Les mots de passe ne correspondent pas'
                    });
                    return;
                }
                
                if (name && email && password) {
                    resolve({
                        success: true,
                        message: 'Inscription réussie ! Vous pouvez maintenant vous connecter.'
                    });
                } else {
                    reject({
                        success: false,
                        message: 'Tous les champs sont requis'
                    });
                }
            }, 500);
        });
    }

    forgotPassword(email) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email) {
                    resolve({
                        success: true,
                        message: 'Un email de réinitialisation a été envoyé si l\'adresse existe.'
                    });
                } else {
                    reject({
                        success: false,
                        message: 'Email requis'
                    });
                }
            }, 500);
        });
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.isAuthenticated = false;
        this.currentUser = null;
    }

    getCurrentUser() {
        return this.currentUser;
    }
}

const auth = new Auth();
