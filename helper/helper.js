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
      case 'dateTime':
        return 'Tanggal dan Waktu'
      default:
        return `Tipe > ${tipe} < perlu tambahan switch change case di helper`
    }
  },
  typeRender: function (idQ, tipe, useWajib, useEtc, useOpsi, body, opsiy, opsix, sl, label) {
    let isWajib = ''
    let isEtc = ''
    // let output = {}
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
        outputR = opsiy.map((opsi, i) => {
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
          ${isWajib ? '' : `<input type="radio" hidden name="${idQ}" value="" checked ${isWajib}>`}
          ${outputR}

          <input type="hidden" name="body" value="${body}">
          <input type="hidden" name="tipe" value="${tipe}">
          <input type="hidden" name="idQ" value="${idQ}">

          <button type="button" class="buttonReset">Batalkan Pilihan</button>
        </div>
        `
      case 'radioGrid':
        if (useWajib == 'on') {
          isWajib = 'required'
        }

        function inputRGX(index) {
          let strRG = ""
          for (let i = 0; i < opsix.length; i++) {
            strRG += `
            <td class="text-center">
              <input type="radio" name="${[idQ, opsiy[index]]}" value="${opsix[i]}" />
            </td>
            `
          }
          return strRG
        }

        outputRGY = opsiy.map((opsi, index) => {
          return `
          <tr>
            <td>${opsi}</td>
            ${inputRGX(index)}
          </tr>
          `
        }).join('')

        outputRGX = opsix.map((opsi, i) => {
          return `
            <th>${opsi}</th>
          `
        }).join('')

        return `
        <div class="bungkus-content edit x-auto">
          <h2>${body}</h2>
        </div>
        <div class="bungkus-content edit">
          <p class="judul">Jawaban${isWajib ? '*' : ''} : </p>
          
          <table class="pilihan-gandav2">
            <tr class="text-center">
              <th></th>
              ${outputRGX}
            </tr>
            ${outputRGY}
          </table>

          <input type="hidden" name="body" value="${body}">
          <input type="hidden" name="tipe" value="${tipe}">
          <input type="hidden" name="idQ" value="${idQ}">

          <button type="button" class="buttonReset">Batalkan Pilihan</button>
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
        outputCB = opsiy.map((opsi, i) => {
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
          <p class="judul">Jawaban : </p>
          ${outputCB}
          <input type="hidden" name="${idQ}" value="" checked>

          <input type="hidden" name="body" value="${body}">
          <input type="hidden" name="tipe" value="${tipe}">
          <input type="hidden" name="idQ" value="${idQ}">

          <button type="button" class="buttonReset">Batalkan Pilihan</button>
        </div>
        `
      case 'checkGrid':
        if (useWajib == 'on') {
          isWajib = 'required'
        }

        function inputCGX(index) {
          let strCG = ""
          for (let i = 0; i < opsix.length; i++) {
            strCG += `
            <td class="text-center">
              <input type="checkbox" name="${[idQ, opsiy[index]]}" value="${opsix[i]}" />
            </td>
            `
          }
          return strCG
        }

        outputCGY = opsiy.map((opsi, index) => {
          return `
          <tr>
            <td>${opsi}</td>
            ${inputCGX(index)}
          </tr>
          `
        }).join('')

        outputCGX = opsix.map((opsi, i) => {
          return `
            <th>${opsi}</th>
          `
        }).join('')

        return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        <div class="bungkus-content edit x-auto">
          <p class="judul">Jawaban : </p>
          
          <table class="pilihan-gandav2">
            <tr class="text-center">
              <th></th>
              ${outputCGX}
            </tr>
            ${outputCGY}
          </table>

          <input type="hidden" name="body" value="${body}">
          <input type="hidden" name="tipe" value="${tipe}">
          <input type="hidden" name="idQ" value="${idQ}">

          <button type="button" class="buttonReset">Batalkan Pilihan</button>
        </div>
        `
      case 'dropDown':
        if (useWajib == 'on') {
          isWajib = 'required'
        }
        outputDD = opsiy.map((opsi, i) => {
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
            ${outputDD}
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
        if (useWajib == 'on') {
          isWajib = 'required'
        }

        let objs = []
        for (let i = sl[0]; i <= sl[1]; i++) {
          objs.push(i)
        }

        function fun() {
          let str = ""
          for (let i = sl[0]; i <= objs.length; i++) { str += `<th>${i}</th>` }
          return str
        }

        function fun2() {
          let str2 = ""
          for (let i = sl[0]; i <= objs.length; i++) {
            str2 += `
            <td class="text-center">
              <input type="radio" name="${idQ}" value="${i}" ${isWajib} />
            </td>
          ` }
          return str2
        }

        return `
        <div class="bungkus-content edit">
          <h2>${body}</h2>
        </div>
        <div class="bungkus-content x-auto">
        <p class="judul">Jawaban${isWajib ? '*' : ''} : </p>
          <table class="pilihan-gandav2">
            <tr class="text-center">
              <th></th>
              ${fun()}
              <th></th>
            </tr>
            <tr>
              <td><span>${label[0]}</span></td>
              ${fun2()}
              <td><span>${label[1]}</span></td>
              </tr>
          </table>
          ${isWajib ? '' : `<input type="radio" hidden name="${idQ}" value="" checked ${isWajib}>`}
          <button type="button" class="buttonReset">Batalkan Pilihan</button>
        </div>
        <input type="hidden" name="body" value="${body}">
        <input type="hidden" name="tipe" value="${tipe}">
        <input type="hidden" name="idQ" value="${idQ}">
        `
      case 'dateTime':
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