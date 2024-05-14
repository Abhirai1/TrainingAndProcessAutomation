// const User = require('../models/use');
const bcrypt = require('bcrypt');

// Controller functions
const authController = {
    // Login controller
    getLogin: (req, res) => {
        // Render the login form
        res.render('login');
    },
    postLogin: async (req, res) => {
        const { email, password } = req.body;
    try {
        let user;
        let userModel;
  
        // Determine the user model based on user type
        switch (req.body.userType) {
          case 'student':
              userModel = require('./src/models/student');
              break;
          case 'tnp':
              userModel = require('./src/models/tnp');
              break;
          case 'recruiter':
              userModel = require('./src/models/recruiter');
              break;
          case 'faculty':
                userModel = require('./src/models/faculty');
                break;
          case 'hod':
              userModel = require('./src/models/hod');
              break;
          default:
              return res.send('Invalid user type');
      }
  
      // Find user by email in the appropriate model
      user = await userModel.findOne({ email });
  
      if (!user) {
          return res.send('Email not found');
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
          return res.send('Incorrect password');
      }
      // Set up session
      req.session.userId = user._id;
      req.session.userType = req.body.userType;
      // Redirect to appropriate page based on user type
      switch (req.body.userType) {
        case 'student':
            res.redirect('/student');
            break;
        case 'tnp':
            res.redirect('/TnP');
            break;
        case 'recruiter':
            res.redirect('/recruiter');
            break;
        case 'faculty':
        case 'hod':
            res.redirect('/department');
            break;
        default:
            res.redirect('/');
            break;
    }
    } catch (error) {
        console.error(error);
        res.send('Error logging in');
    }
    },
    // Logout controller
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return res.send('Error logging out');
            }
            res.redirect('/');
        });
    },
    // Reset password controller
    getReset: (req, res) => {
        // Render the reset password form
        res.render('reset');
    },
    postReset: async (req, res) => {
        const { email, oldPassword, newPassword } = req.body;
        try {
            // Find user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.send('Email not found');
            }
            // Verify old password
            const passwordMatch = await bcrypt.compare(oldPassword, user.password);
            if (!passwordMatch) {
                return res.send('Incorrect old password');
            }
            // Hash and update new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();
            res.render('reset', { message: 'Password updated successfully' });
        } catch (error) {
            console.error(error);
            res.send('Error resetting password');
        }
    }
};

module.exports = authController;
