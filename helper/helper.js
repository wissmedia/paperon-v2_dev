const moment = require('moment')

var func = {
  formatDate : function (date, format) {
    return moment(date).format(format)
  }
}

module.exports = func