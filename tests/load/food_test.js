import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  stages: [
    { duration: '5s', target: 5 },
    { duration: '10s', target: 10 },
    { duration: '10s', target: 100 },
    { duration: '10s', target: 1000 },
    { duration: '5s', target: 0 }
  ]
}

const BASE_URL = 'http://localhost:8087/api/foods'

const TOKEN =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5M2EwMmM4OWViNmI5MGFlMzNhMjU0MiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY1NDI4Mjg3LCJleHAiOjE3NjYwMzMwODd9.hbsxVeAJ6SpjP5t7YJKZTqm4ApnH7YQ20UZwW6ISVlA"

export default function () {

  // GET /api/foods
  // GET /api/foods
const getRes = http.get(BASE_URL, {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json"
  },
  timeout: '10s'
})


  console.log("GET /api/foods → status:", getRes.status)
  console.log("GET /api/foods → body:", getRes.body?.substring(0, 200))

  check(getRes, {
    'GET /api/foods status es 200': (r) => r.status === 200
  })


  // POST /api/foods
  const payload = JSON.stringify({
    tipo: 'cena',
    calorias: 500,
    descripcion: 'comida k6'
  })

  const postRes = http.post(
    BASE_URL,
    payload,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      },
      timeout: '10s'
    }
  )

  console.log("POST /api/foods → status:", postRes.status)
  console.log("POST /api/foods → body:", postRes.body?.substring(0, 200))

  check(postRes, {
    'POST /api/foods status válido': (r) => r.status === 200 || r.status === 201
  })

  sleep(1)
}
