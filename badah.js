// req.body 2 pertanyaan
let obj2 = {
  '6145d52171924226bbc10bfd': '',
  body: ['1', '2'],
  tipe: ['shortText', 'shortText'],
  idQ: ['6145d52171924226bbc10bfd', '61467affc95fe5376ef631c3'],
  '61467affc95fe5376ef631c3': ''
}
// req.body 1 pertanyaan
let obj1 = {
  '6145d52171924226bbc10bfd': '',
  body: '1',
  tipe: 'shortText',
  idQ: '6145d52171924226bbc10bfd'
}

let { body, tipe, idQ, ...jawab } = obj2
let objs = []
let V = Object.keys(jawab).length

if (V == 1) {
  for (let i = 0; i < V; i++) {
    let obj = {
      idQ: idQ,
      body: body,
      tipe: tipe,
      jawaban: jawab[idQ]
    }
    objs.push(obj)
  }
} else {
  for (let i = 0; i < V; i++) {
    let obj = {
      idQ: idQ[i],
      body: body[i],
      tipe: tipe[i],
      jawaban: jawab[idQ[i]]
    }
    objs.push(obj)
  }
}
console.log(objs)