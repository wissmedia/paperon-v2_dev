const moment = require('moment')

var func = {
  formatDate: function (date, format) {
    return moment(date).format(format)
  },
  select: function (selected, option) {
    return (selected == option) ? 'selected="selected"' : ''
  }
}

module.exports = func