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
