module.exports = {
  ensureAPIAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.json({message: 'No Access'})
    }
  },
  ensureGuest: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/dasbor')
    } else {
      return next()
    }
  }
}