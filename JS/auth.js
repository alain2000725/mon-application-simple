// Gestion de l'authentification avec stockage réel
class Auth {
    constructor() {
        this.isAuthenticated = false;
        this.currentUser = null;
        
        // Initialiser la base de données utilisateurs si elle n'existe pas
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify([]));
        }
    }

    // Récupérer tous les utilisateurs
    getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    // Sauvegarder les utilisateurs
    saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
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

    // Inscription avec vérification d'unicité
    signup(name, email, password, confirmPassword) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Vérifier que les mots de passe correspondent
                if (password !== confirmPassword) {
                    reject({
                        success: false,
                        message: 'Les mots de passe ne correspondent pas'
                    });
                    return;
                }

                // Vérifier que tous les champs sont remplis
                if (!name || !email || !password) {
                    reject({
                        success: false,
                        message: 'Tous les champs sont requis'
                    });
                    return;
                }

                // Vérifier si l'email existe déjà
                const users = this.getUsers();
                const existingUser = users.find(u => u.email === email);

                if (existingUser) {
                    reject({
                        success: false,
                        message: 'Cet email est déjà utilisé'
                    });
                    return;
                }

                // Créer le nouvel utilisateur
                const newUser = {
                    id: Date.now().toString(),
                    name: name,
                    email: email,
                    username: email.split('@')[0], // Créer un username à partir de l'email
                    password: password, // Dans une vraie app, on hash le mot de passe
                    createdAt: new Date().toISOString()
                };

                // Ajouter l'utilisateur à la base
                users.push(newUser);
                this.saveUsers(users);

                resolve({
                    success: true,
                    message: 'Inscription réussie ! Vous pouvez maintenant vous connecter.'
                });
            }, 500);
        });
    }

    // Connexion avec vérification des identifiants
    login(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!email || !password) {
                    reject({
                        success: false,
                        message: 'Email et mot de passe requis'
                    });
                    return;
                }

                // Chercher l'utilisateur dans la base
                const users = this.getUsers();
                const user = users.find(u => u.email === email && u.password === password);

                if (!user) {
                    reject({
                        success: false,
                        message: 'Email ou mot de passe incorrect'
                    });
                    return;
                }

                // Connecter l'utilisateur
                const userToStore = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    username: user.username
                };

                localStorage.setItem('currentUser', JSON.stringify(userToStore));
                this.isAuthenticated = true;
                this.currentUser = userToStore;

                resolve({
                    success: true,
                    message: 'Connexion réussie',
                    user: userToStore
                });
            }, 500);
        });
    }

    // Mot de passe oublié - vérifie si l'email existe
    forgotPassword(email) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!email) {
                    reject({
                        success: false,
                        message: 'Email requis'
                    });
                    return;
                }

                // Vérifier si l'email existe
                const users = this.getUsers();
                const user = users.find(u => u.email === email);

                if (user) {
                    // Simuler l'envoi d'un email
                    console.log(`Email envoyé à ${email} avec lien de réinitialisation`);
                    resolve({
                        success: true,
                        message: 'Un email de réinitialisation a été envoyé.'
                    });
                } else {
                    // Pour des raisons de sécurité, on ne dit pas si l'email existe ou non
                    resolve({
                        success: true,
                        message: 'Si cet email existe, un lien de réinitialisation a été envoyé.'
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

    // Pour déboguer - voir tous les utilisateurs (à retirer en production)
    listUsers() {
        return this.getUsers();
    }
}

const auth = new Auth();
