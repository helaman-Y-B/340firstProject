const mainController = {}

/* 
    * Constructs the main page
*/
mainController.getMainPage = async function(req, res) {
    // Check if there is an active session for the user.
    try {
        if (!req.session.user) {
            console.log('No active session found. Redirecting to login.');
            return res.redirect('/login');
        } else {
            // If the user is logged in, render the main page with their session data.
            console.log('Active session found for user:', req.session.user.email);
            return res.render('main', {
                title: 'Main Page',
                user: req.session.user,
            });
        }
    }

    catch (error) {
        console.error('Error retrieving session user:', error);
        return res.status(500).render("error", {
            title: 'Error',
            user: req.session.user,
            message: 'An error occurred while retrieving your session.'
        });
    }
}

module.exports = mainController;