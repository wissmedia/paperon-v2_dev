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
        return 'Jawaban Pendek'
      case 'longText':
        return 'Jawaban Panjang'
      case 'radio':
        return 'Pilihan Ganda'
      case 'radioGrid':
        return 'Kisi Pilihan Ganda'
      case 'checkBox':
        return 'Kotak Centang'
      case 'checkGrid':
        return 'Petak Kotak Centang'
      case 'dropDown':
        return 'Daftar Pilihan'
      case 'date':
        return 'Tanggal'
      case 'time':
        return 'Waktu'
      case 'linearScale':
        return 'Skala Linier'
      default:
        return `Tipe > ${type} < perlu tambahan switch case di helper`
    }
  }
}

module.exports = func