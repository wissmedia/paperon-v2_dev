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




let a = {
  '614d9c4b848ed87db77aef03,kolom 1': 'baris 1',
  '614d9c4b848ed87db77aef03,kolom 2': 'baris 2',
  '614d9c4b848ed87db77aef04,kolom 1': 'baris 1',
  '614d9c4b848ed87db77aef04,kolom 2': 'baris 2'
}

let b = {
  '614d9c4b848ed87db77aef03': [
    { 'kolom 1': 'baris 1' },
    { 'kolom 2': 'baris 2' }
  ]
}
// 
// ////////////////////////
let X = Object.keys(a)
let Y = Object.values(a)
let Z = []
let objs = []

for(let i = 0; i< X.length; i++){
  Z.push(X[i].split(','))
  Z[i].push(Y[i])
}
// console.log(Z)
// console.log('')
for(let i = 0; i< Z.length;i++){
  let obj = {
      induk: Z[i][0],
      tanya: Z[i][1],
      jawab: Z[i][2],
  }
  objs.push(obj)
}

// console.log(objs)

//////////////////////////

let q = {
  '614d9c4b848ed87db77aef03,kolom 1': 'baris 1',
  '614d9c4b848ed87db77aef03,kolom 2': 'baris 2',
  body: [ 'kisi pilihan ganda', 'kisi2' ],
  tipe: [ 'radioGrid', 'radioGrid' ],
  idQ: [ '614d9c4b848ed87db77aef03', '614da2f9ec23e68501cfcaab' ],
  '614da2f9ec23e68501cfcaab,a': '1',
  '614da2f9ec23e68501cfcaab,b': '3'
}



const { body, tipe, idQ, ...jawab } = q
let X = Object.keys(jawab)
let Y = Object.values(jawab)
let Z = []
let objs = []

console.log(q)

// for(let i = 0; i< X.length; i++){
//   Z.push(X[i].split(','))
//   Z[i].push(Y[i])
// }
// // console.log(Z)
// // console.log('')
// for(let i = 0; i< Z.length;i++){
//   let obj = {
//       induk: Z[i][0],
//       tanya: Z[i][1],
//       jawab: Z[i][2],
//   }
//   objs.push(obj)
// }
