let query2 = {
  '614d9c4b848ed87db77aef03,kolom 1': 'baris 1',
  '614d9c4b848ed87db77aef03,kolom 2': 'baris 2',
  body: ['kisi pilihan ganda', 'kisi2'],
  tipe: ['radioGrid', 'radioGrid'],
  idQ: ['614d9c4b848ed87db77aef03', '614da2f9ec23e68501cfcaab'],
  '614da2f9ec23e68501cfcaab,a': '1',
  '614da2f9ec23e68501cfcaab,b': '3'
}

let query1 = {
  '614d9c4b848ed87db77aef03,kolom 1': 'baris 1',
  '614d9c4b848ed87db77aef03,kolom 2': 'baris 2',
  body: 'kisi pilihan ganda',
  tipe: 'radioGrid',
  idQ: '614d9c4b848ed87db77aef03'
}

console.log(query1.body.constructor)

const { body, tipe, idQ, ...jawab } = query2
let X = Object.keys(jawab)
let Y = Object.values(jawab)
let Z = []
let objs = []
let objx = []

for (let i = 0; i < idQ.length; i++) {
  let obj = {
    idQ: idQ[i],
    body: body[i],
    tipe: tipe[i],
    jawaban: []
  }
  objx.push(obj)
}

for (let i = 0; i < X.length; i++) {
  Z.push(X[i].split(','))
  Z[i].push(Y[i])
}

for (let i = 0; i < Z.length; i++) {
  let obj = {
    induk: Z[i][0],
    tanya: Z[i][1],
    jawab: Z[i][2],
  }
  objs.push(obj)
}

for (let i = 0; i < objx.length; i++) {
  for (let j = 0; j < objs.length; j++) {
    if(objx[i].idQ == objs[j].induk){
      objx[i].jawaban.push(objs[j])
    } 
  }
}

// console.log(JSON.stringify(objx, null, 2))