const moment = require('moment')

var func = {
  formatDate: function (date, format) {
    return moment(date).utcOffset(8).format(format)
  },
  select: function (selected, option) {
    return (selected == option) ? 'selected="selected"' : ''
  },
  typeChange: function (type) {
    switch (type) {
      case 'shortText':
        return 'Text Jawaban Pendek'

      case 'longText':
        return 'Text Jawaban Panjang'
      default:
        return `Tipe > ${type} < perlu tambahan switch case di helper`
    }
  }
}

module.exports = func