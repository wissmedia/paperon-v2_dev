// kisi pilihan ganda
let kisi = {
  'kolom 1': 'kolom 1-baris 2',
  'kolom 2': 'kolom 2-baris 1',
  body: 'kisi pilihan ganda',
  tipe: 'radioGrid',
  idQ: '614d9c4b848ed87db77aef03'
}

// pertanyaan lain
let umum = {
  '6145d52171924226bbc10bfd': '',
  body: ['1', '2'],
  tipe: ['shortText', 'shortText'],
  idQ: ['6145d52171924226bbc10bfd', '61467affc95fe5376ef631c3'],
  '61467affc95fe5376ef631c3': ''
}

let kisi2 = {
  '614d9c4b848ed87db77aef03,kolom 1': '',
  '614d9c4b848ed87db77aef03,kolom 2': '',
  body: ['kisi pilihan ganda', 'kisi2'],
  tipe: ['radioGrid', 'radioGrid'],
  idQ: ['614d9c4b848ed87db77aef03', '614da2f9ec23e68501cfcaab'],
  '614da2f9ec23e68501cfcaab,a': '',
  '614da2f9ec23e68501cfcaab,b': ''
}

const { body, tipe, idQ, ...jawab } = kisi2


console.log(body)
console.log(tipe)
console.log(idQ)
console.log(jawab)