const { getAuthenticatedClient, googleCallback } = require('../googleClient');

const loginController = {}

/* 
    * Constructs the login page
*/
loginController.getLoginPage = async function(req, res) {
    // Check if there is an active session for the user.
    try {
        if (!req.session.user) {
            return res.render('login', {
                title: 'Login Page',
                user: null,
            });
        } else {
            // If the user is logged in, render the main page with their session data.
            return res.render('main', {
                title: 'Main Page',
                user: req.session.user,
            });
        }
    }

    catch (error) {
        console.error('Error retrieving login page:', error);
        return res.status(500).render("main", {
            title: 'Error',
            user: req.session.user,
        });
    }
}

loginController.getAuthenticated = async function(req, res, next) {
    try {
        await getAuthenticatedClient(req, res);
        next();
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).render('main', {
            title: 'Error',
            user: req.session.user,
        });
    }
}

loginController.sendAuthUrl = async function(req, res, next) {
    try {
        await googleCallback(req, res);
        next();
    } catch (error) {
        console.error('Error sending auth URL:', error);
        res.status(500).render("main", {
            title: 'Error',
            user: req.session.user,
        });
    }
}

loginController.logoutUser = async function(req, res) {
    try {
        if (req.session) {
            req.session.destroy((error) => {
                if (error) {
                    console.error('Error destroying session:', error);
                    return res.status(500).render('main', {
                        title: 'Error',
                        user: req.session.user
                    });
                } else {
                    console.log('Session destroyed successfully');
                    // Clear the session cookie
                    res.clearCookie('session');
                    res.redirect('/');
                }
            });
        }
    } catch (error) {
        console.error('Error logging out user:', error);
        return res.status(500).render('main', {
            title: 'Error',
            user: req.session.user
        });
    }
}

module.exports = loginController;