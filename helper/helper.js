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
      case 'tglWaktu':
        return 'Tanggal dan Waktu'
      default:
        return `Tipe > ${tipe} < perlu tambahan switch change case di helper`
    }
  },
  typeRender: function (idQ, tipe, useWajib, useEtc, useOpsi, body, opsiy, opsix) {
    let isWajib = ''
    let isEtc = ''
    let objs = []
    let output = {}
    switch (tipe) {
      case 'shortText':
        if (useWajib == 'on') {
          isWajib = 'required'
        }
        return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        <div class="bungkus-content edit">
          <p class="judul">Jawaban${isWajib ? '*' : ''} : </p>
          <input type="text" class="text" name="${idQ}" id="shortText" placeholder="Ketik jawaban singkat disini" ${isWajib}>
        </div>
        <input type="hidden" name="body" value="${body}">
        <input type="hidden" name="tipe" value="${tipe}">
        <input type="hidden" name="idQ" value="${idQ}">
        `
      case 'longText':
        if (useWajib == 'on') {
          isWajib = 'required'
        }
        return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        <div class="bungkus-content edit">
          <p class="judul">Jawaban${isWajib ? '*' : ''} : </p>
          <textarea name="${idQ}" id="longText" cols="30" rows="10" placeholder="Ketik jawaban panjang disini" ${isWajib}></textarea>
        </div>
        <input type="hidden" name="body" value="${body}">
        <input type="hidden" name="tipe" value="${tipe}">
        <input type="hidden" name="idQ" value="${idQ}">
        `
      case 'radio':
        if (useWajib == 'on') {
          isWajib = 'required'
        }
        if (useEtc == 'on') {
          isEtc = `
          <div class="control-edit addInput">
              <button type="button" id="add-lain" class="add-lain addLain-radio">Tambahkan "Lainnya"</button>
          </div>
          `
        }
        output = opsiy.map((opsi, i) => {
          return `
          <p>
            <input type="radio" name="${idQ}" id="${opsi}" value="${opsi}" ${isWajib}>
            <label for="${opsi}">${opsi}</label>
          </p>
          `
        }).join('')

        return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        <div class="bungkus-content edit">
          <p class="judul">Jawaban${isWajib ? '*' : ''} : </p>
          ${output}

          ${isEtc}

          <input type="hidden" name="body" value="${body}">
          <input type="hidden" name="tipe" value="${tipe}">
          <input type="hidden" name="idQ" value="${idQ}">

          <button type="reset" id="batalRadio" class="buttonReset">Batalkan Pilihan</button>
        </div>
        `
      case 'radioGrid':
        return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        `
      case 'checkBox':
        if (useWajib == 'on') {
          isWajib = 'required'
        }
        if (useEtc == 'on') {
          isEtc = `
          <div class="control-edit addInput">
              <button type="button" id="add-lain" class="add-lain addLain-check">Tambahkan "Lainnya"</button>
          </div>
          `
        }
        output = opsiy.map((opsi, i) => {
          return `
          <p>
            <input type="checkBox" name="${idQ}" id="${opsi}" value="${opsi}">
            <label for="${opsi}">${opsi}</label>
          </p>
          `
        }).join('')
        return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        <div class="bungkus-content">
          <p class="judul">Jawaban${isWajib ? '*' : ''} : </p>
          ${output}

          ${isEtc}

          <input type="hidden" name="body" value="${body}">
          <input type="hidden" name="tipe" value="${tipe}">
          <input type="hidden" name="idQ" value="${idQ}">

          <button type="reset" id="batalRadio-2" class="buttonReset">Batalkan Pilihan</button>
        </div>
        `
      case 'checkGrid':
        return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        `
      case 'dropDown':
        if (useWajib == 'on') {
          isWajib = 'required'
        }
       output = opsiy.map((opsi, i) => {
          return `
            <option value="${opsi}">${opsi}</option>
          `
        }).join('')
        return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        <div class="bungkus-content">
          <p class="judul">Jawaban${isWajib ? '*' : ''} : </p>
          <select name="${idQ}" id="${idQ}" class="dropdown" ${isWajib}>
            <option hidden selected value="">-- Pilihan</option>
            ${output}
          </select>
        </div>
        <input type="hidden" name="body" value="${body}">
        <input type="hidden" name="tipe" value="${tipe}">
        <input type="hidden" name="idQ" value="${idQ}">
        `
      case 'date':
        if (useWajib == 'on') {
          isWajib = 'required'
        }
        return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        <div class="bungkus-content">
          <div class="form_group">
          <p class="judul">Jawaban${isWajib ? '*' : ''} : </p>
            <input type="date" name="${idQ}" id="${idQ}" ${isWajib}>
          </div>
        </div>  
        <input type="hidden" name="body" value="${body}">
        <input type="hidden" name="tipe" value="${tipe}">
        <input type="hidden" name="idQ" value="${idQ}">
        `
      case 'time':
        if (useWajib == 'on') {
          isWajib = 'required'
        }
        return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        <div class="bungkus-content">
            <div class="form_group">
              <p class="judul">Jawaban${isWajib ? '*' : ''} : </p>
              <input type="time" name="${idQ}" id="${idQ}" ${isWajib}>
            </div>
        </div>
        <input type="hidden" name="body" value="${body}">
        <input type="hidden" name="tipe" value="${tipe}">
        <input type="hidden" name="idQ" value="${idQ}">
        `
      case 'linearScale':
        return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        `
      case 'tglWaktu':
        if (useWajib == 'on') {
          isWajib = 'required'
        }
        return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        <div class="bungkus-content">
            <div class="form_group">
              <p class="judul">Jawaban${isWajib ? '*' : ''} : </p>
              <input type="datetime-local" name="${idQ}" id="${idQ}" ${isWajib}>
            </div>
        </div>
        <input type="hidden" name="body" value="${body}">
        <input type="hidden" name="tipe" value="${tipe}">
        <input type="hidden" name="idQ" value="${idQ}">
        `
      default:
        return `Tipe > ${tipe} < perlu tambahan switch render case di helper`
    }
  }
}

module.exports = func