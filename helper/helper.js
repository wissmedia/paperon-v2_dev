const moment = require('moment')

var func = {
  formatDate: function (date, format) {
    return moment(date).utcOffset(8).format(format)
  },
  truncate: function (str, len) {
    if (str.length > len && str.length > 0) {
      let new_str = str + ' '
      new_str = str.substr(0, len)
      new_str = str.substr(0, new_str.lastIndexOf(' '))
      new_str = new_str.length > 0 ? new_str : str.substr(0, len)
      return new_str + '...'
    }
    return str
  },
  select: function (selected, option) {
    return (selected == option) ? 'selected="selected"' : ''
  },
  pendWajib: function (tipe) {
    if (tipe == 'checkBox' || tipe == 'checkGrid') {
      return 'pending'
    }
  },
  isWajibCB: function (useWajib) {
    if (useWajib == 'on') {
      return 'checked'
    }
  },
  warnMess: function (tipe) {
    switch (tipe) {
      case 'shortText':
      case 'longText':
      case 'date':
      case 'time':
      case 'dateTime':
        return ''
      case 'radio':
      case 'checkBox':
      case 'dropDown':
      case 'radioGrid':
      case 'checkGrid':
        return '<p>* Kosongkan opsi dan simpan untuk menghapus opsi</p>'
      case 'linearScale':
        return `
        <p>* Ubah jumlah opsi dan simpan untuk mengganti jumlah opsi, jumlah opsi tidak dapat dihapus</p>
        <p>* Label bersifat opsional, kosongkan label dan simpan untuk menghapus label</p>
        `
      default:
        return `
          <div class="bungkus-content edit">
            <p>Tipe > ${tipe} < perlu tambahan switch render case di helper</p>
          </div>
          `
    }
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
        return `
          <div class="bungkus-content edit">
            <p>Tipe > ${tipe} < perlu tambahan switch render case di helper</p>
          </div>
          `
    }
  },
  typeEdit: function (tipe, body, opsiy, opsix, sl, label, useWajib) {
    let isWajib = ''
    if (useWajib == 'on') {
      isWajib = 'checked'
    }
    switch (tipe) {
      case 'shortText':
      case 'longText':
      case 'date':
      case 'time':
      case 'dateTime':
        return `
        <div class="bungkus-content edit">
          <label for="tipe">Teks Pertanyaan :</label>
          <input type="text" name="body" id="body" class="text" value="${body}">
        </div>
        `

      case 'radio':
        outputRB = opsiy.map((opsi, i) => {
          return `
          <div class="edit-group setInput">
            <input type="radio" name="pilih" id="pilih1" disabled>
            <input type="text" name="opsiy" id="opsi" class="text" value="${opsi}">
          </div>
          `
        }).join('')
        return `
        <div class="bungkus-content edit">
          <label for="tipe">Teks Pertanyaan :</label>
          <input type="text" name="body" id="body" class="text" value="${body}">
        </div>

        <div class="bungkus-content edit">
          <label for="">Opsi :</label>
          ${outputRB}
          <div class="edit-group addInput">
            <input type="radio" name="pilih" id="pilih1" disabled>
            <input type="text" class="text addOpsiKolom" placeholder="Tambah opsi" readonly>
          </div>
        </div>
        `
      case 'checkBox':
        outputCB = opsiy.map((opsi, i) => {
          return `
          <div class="edit-group setInput">
            <input type="checkbox" name="pilih" id="pilih1" disabled>
            <input type="text" name="opsiy" id="opsi" class="text" value="${opsi}">
          </div>
          `
        }).join('')
        return `
        <div class="bungkus-content edit">
          <label for="tipe">Teks Pertanyaan :</label>
          <input type="text" name="body" id="body" class="text" value="${body}">
        </div>

        <div class="bungkus-content edit">
          <label for="">Opsi :</label>
          ${outputCB}
          <div class="edit-group addInput">
            <input type="checkbox" name="pilih" id="pilih1" disabled>
            <input type="text" class="text addOpsiCheckKolom" placeholder="Tambah opsi" readonly>
          </div>
        </div>
        `
      case 'dropDown':
        outputDD = opsiy.map((opsi, i) => {
          return `
          <div class="edit-group setInput">
            <span id="nomor" class="nomor">&#9672;</span>
            <input type="text" name="opsiy" id="opsi" class="text" value="${opsi}">
          </div>
          `
        }).join('')
        return `
        <div class="bungkus-content edit">
          <label for="tipe">Teks Pertanyaan :</label>
          <input type="text" name="body" id="body" class="text" value="${body}">
        </div>

        <div class="bungkus-content edit">
          <label for="">Opsi :</label>
          ${outputDD}
          <div class="edit-group addInput">
            <span id="nomor">&#9672;</span>
            <input type="text" class="text addOpsiDaftar" placeholder="Tambah opsi" readonly>
          </div>
        </div>
        `
      case 'radioGrid':
        outputRGX = opsix.map((opsi, i) => {
          return `
          <div class="edit-group setInput">
            <input type="radio" name="pilih" id="pilih1" disabled>
            <input type="text" name="opsix" id="opsi" class="text" value="${opsi}">
          </div>
          `
        }).join('')
        outputRGY = opsiy.map((opsi, i) => {
          return `
          <div class="edit-group setInput">
            <input type="radio" name="pilih" id="pilih1" disabled>
            <input type="text" name="opsiy" id="opsi" class="text" value="${opsi}">
          </div>
          `
        }).join('')
        return `
        <div class="bungkus-content edit">
          <label for="tipe">Teks Pertanyaan :</label>
          <input type="text" name="body" id="body" class="text" value="${body}">
        </div>

        <div class="bungkus-content edit">
          <div class="baris">
            <label for="">Baris</label>
            ${outputRGX}
            <div class="edit-group addInput">
              <input type="radio" name="pilih" id="pilih1" disabled>
              <input type="text" class="text addOpsiBaris" placeholder="Tambah baris" readonly>
            </div>
          </div>

          <div class="kolom">
            <label for="">Kolom</label>
            ${outputRGY}
            <div class="edit-group addInput">
              <input type="radio" name="pilih" id="pilih1" disabled>
              <input type="text" class="text addOpsiKolom" placeholder="Tambah kolom" readonly>
            </div>
          </div>
        </div>
        `
      case 'checkGrid':
        outputRGX = opsix.map((opsi, i) => {
          return `
          <div class="edit-group setInput">
            <input type="checkbox" name="pilih" id="pilih1" disabled>
            <input type="text" name="opsix" id="opsi" class="text" value="${opsi}">
          </div>
          `
        }).join('')
        outputRGY = opsiy.map((opsi, i) => {
          return `
          <div class="edit-group setInput">
            <input type="checkbox" name="pilih" id="pilih1" disabled>
            <input type="text" name="opsiy" id="opsi" class="text" value="${opsi}">
          </div>
          `
        }).join('')
        return `
        <div class="bungkus-content edit">
          <label for="tipe">Teks Pertanyaan :</label>
          <input type="text" name="body" id="body" class="text" value="${body}">
        </div>

        <div class="bungkus-content edit">
          <div class="baris">
            <label for="">Baris</label>
            ${outputRGX}
            <div class="edit-group addInput">
              <input type="checkbox" name="pilih" id="pilih1" disabled>
              <input type="text" class="text addOpsiBaris" placeholder="Tambah baris" readonly>
            </div>
          </div>

          <div class="kolom">
            <label for="">Kolom</label>
            ${outputRGY}
            <div class="edit-group addInput">
              <input type="checkbox" name="pilih" id="pilih1" disabled>
              <input type="text" class="text addOpsiKolom" placeholder="Tambah kolom" readonly>
            </div>
          </div>
        </div>

 
        `

      case 'linearScale':
        return `
        <div class="bungkus-content edit">
          <label for="tipe">Teks Pertanyaan :</label>
          <input type="text" name="body" id="body" class="text" value="${body}">
        </div>

        <div class="bungkus-content edit">
          <label for="">Jumlah opsi : </label>
          <br>
          <select name="sl" class="dropdown ddA">
            <option value="0" ${sl[0] == 0 ? 'selected' : ''}>0</option>
            <option value="1" ${sl[0] == 1 ? 'selected' : ''}>1</option>
          </select>

          <span>sampai</span>

          <select name="sl" class="dropdown ddB">
            <option value="2" ${sl[1] == 2 ? 'selected' : ''}>2</option>
            <option value="3" ${sl[1] == 3 ? 'selected' : ''}>3</option>
            <option value="4" ${sl[1] == 4 ? 'selected' : ''}>4</option>
            <option value="5" ${sl[1] == 5 ? 'selected' : ''}>5</option>
            <option value="6" ${sl[1] == 6 ? 'selected' : ''}>6</option>
            <option value="7" ${sl[1] == 7 ? 'selected' : ''}>7</option>
            <option value="8" ${sl[1] == 8 ? 'selected' : ''}>8</option>
            <option value="9" ${sl[1] == 9 ? 'selected' : ''}>9</option>
            <option value="10" ${sl[1] == 10 ? 'selected' : ''}>10</option>
          </select>
        </div>
        
        <div class="bungkus-content edit">
          <label for="">Label (opsional) : </label>
          <div class="label-skala">
            <span id="skala-a" class="skala-a">0</span>
            <input type="text" name="label" class="" value="${label[0]}">
          </div>
          <div class="label-skala">
            <span id="skala-b" class="skala-b">10</span>
            <input type="text" name="label" class="" value="${label[1]}">
          </div>
        </div>
        `

      default:
        return `<p>Tipe > ${tipe} < perlu tambahan switch change case di helper</p>`

    }
  },
  typeRender: function (idQ, tipe, body, opsiy, opsix, sl, label, useWajib) {
    let isWajib = ''
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
        // if (useEtc == 'on') {
        //   isEtc = `
        //   <div class="control-edit addInput">
        //       <button type="button" id="add-lain" class="add-lain addLain-radio">Tambahkan "Lainnya"</button>
        //   </div>
        //   `
        // }
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
        return `
        <div class="bungkus-content edit">
          <p>Tipe > ${tipe} < perlu tambahan switch render case di helper</p>
        </div>
        `
    }
  }
}

module.exports = func