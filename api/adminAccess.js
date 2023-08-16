//will require the user to be authenticated and have an isAdmin value set to true in order to access certain routes.

const AdminAccess = (req, res, next) => {
    console.log(req.user);
    if (req.user.isadmin) {
      return next(); // User is an admin
    }
    return res.status(403).json({ message: "Access denied" });
  };
  
  module.exports = AdminAccess;