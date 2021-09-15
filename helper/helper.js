const moment = require('moment')

var func = {
  formatDate: function (date, format) {
    return moment(date).utcOffset(8).format(format)
  },
  select: function (selected, option) {
    return (selected == option) ? 'selected="selected"' : ''
  },
  typeChange: function (tipe) {
    switch (tipe) {
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
        return `Tipe > ${tipe} < perlu tambahan switch change case di helper`
    }
  },
  typeRender: function (tipe, wajib, etc, opsi, body) {
    let isWajib = ''
    switch (tipe) {
      case 'shortText':
        if (wajib == 'on') {
          isWajib = 'required'
        }
        return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        <div class="bungkus-content edit">
          <p class="judul">Jawaban${isWajib ? '*' : ''} : </p>
          <input type="text" class="text" name="jawaban" id="shortText" placeholder="Ketik jawaban singkat disini" ${isWajib}>
        </div>
        <input type="hidden" name="body" value="${body}">
        <input type="hidden" name="tipe" value="${tipe}">
        `
      case 'longText':
        if (wajib == 'on') {
          isWajib = 'required'
        }
        return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        <div class="bungkus-content edit">
          <p class="judul">Jawaban${isWajib ? '*' : ''} : </p>
          <textarea name="longText" id="longText" cols="30" rows="10" placeholder="Ketik jawaban panjang disini" ${isWajib}></textarea>
        </div>
        `
      case 'radio':
        return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        `
      case 'radioGrid':
        return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        `
      case 'checkBox':
        return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        `
      case 'checkGrid':
        return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        `
      case 'dropDown':
        return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        `
      case 'date':
        return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        `
      case 'time':
        return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        `
      case 'linearScale':
        return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        `
      default:
        return `Tipe > ${type} < perlu tambahan switch render case di helper`
    }
  }
}

module.exports = func