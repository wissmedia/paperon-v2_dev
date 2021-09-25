let query1 = {
  '614d9c4b848ed87db77aef03,kolom 1': 'baris 1',
  '614d9c4b848ed87db77aef03,kolom 2': 'baris 2',
  body: 'kisi pilihan ganda',
  tipe: 'radioGrid',
  idQ: '614d9c4b848ed87db77aef03'
}

let query2 = {
  '614d9c4b848ed87db77aef03,kolom 1': 'baris 1',
  '614d9c4b848ed87db77aef03,kolom 2': 'baris 2',
  body: ['kisi pilihan ganda', 'kisi2'],
  tipe: ['radioGrid', 'radioGrid'],
  idQ: ['614d9c4b848ed87db77aef03', '614da2f9ec23e68501cfcaab'],
  '614da2f9ec23e68501cfcaab,a': '1',
  '614da2f9ec23e68501cfcaab,b': '3'
}

let query3 = {
  '614d9c4b848ed87db77aef03,kolom 1': 'baris 2',
  '614d9c4b848ed87db77aef03,kolom 2': 'baris 2',
  body: ['kisi pilihan ganda', 'WE', 'QSC'],
  tipe: ['radioGrid', 'radioGrid', 'shortText'],
  idQ: [
    '614d9c4b848ed87db77aef03',
    '614ee694bb06728426ebc7c3',
    '614ee69dbb06728426ebc7d6'
  ],
  '614ee694bb06728426ebc7c3,1': 'w',
  '614ee694bb06728426ebc7c3,2': 'e',
  '614ee69dbb06728426ebc7d6': '1111'
}

let query4 = {
  '614ee69dbb06728426ebc7d6': 'qw',
  body: 'QSC',
  tipe: 'shortText',
  idQ: '614ee69dbb06728426ebc7d6'
}

let query5 = {
  '614ee69dbb06728426ebc7d6': 'qqq',
  body: [ 'QSC', 'qw' ],
  tipe: [ 'shortText', 'linearScale' ],
  idQ: [ '614ee69dbb06728426ebc7d6', '614f053fb9a815c194224294' ],
  '614f053fb9a815c194224294': '1'
}

const { body, tipe, idQ, ...jawab } = query3
let X = Object.keys(jawab)
let Y = Object.values(jawab)
let Z = []
let objs = []
let objy = []


if (tipe.constructor === Array) {
  for (let i = 0; i < tipe.length; i++) {
    // console.log(tipe[i])
    if (tipe[i] == 'radioGrid') {
      let obj = {
        idQ: idQ[i],
        body: body[i],
        tipe: tipe[i],
        jawaban: []
      }
      objs.push(obj)

    } else {
      let obj = {
        idQ: idQ[i],
        body: body[i],
        tipe: tipe[i],
        jawaban: jawab[idQ[i]]
      }
      objs.push(obj)
    }
  }
} else {
  if (tipe == 'radioGrid') {
    let obj = {
      idQ: idQ,
      body: body,
      tipe: tipe,
      jawaban: []
    }
    objs.push(obj)
  } else {
    let obj = {
      idQ: idQ,
      body: body,
      tipe: tipe,
      jawaban: jawab[idQ]
    }
    objs.push(obj)
  }
}
// console.log(objs)
// 

for (let i = 0; i < X.length; i++) {
  Z.push(X[i].split(','))
  Z[i].push(Y[i])
}
// console.log(Z)
// 

for (let i = 0; i < Z.length; i++) {
  let obj = {
    induk: Z[i][0],
    tanya: Z[i][1],
    jawab: Z[i][2],
  }
  objy.push(obj)
}
// console.log(objy)
// 

for (let i = 0; i < objs.length; i++) {
  for (let j = 0; j < objy.length; j++) {
    if (objs[i].idQ == objy[j].induk && objs[i].tipe == 'radioGrid') {
      objs[i].jawaban.push(objy[j])
    }
  }
}
console.log(JSON.stringify(objs, null, 2))
