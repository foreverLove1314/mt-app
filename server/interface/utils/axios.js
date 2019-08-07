import axios from 'axios'
const instance = axios.create({
  baseURL:`http://${proess.env.HOST||'localhost'}:${proess.env.PORT||3000}`,
  timeout:1000,
  headers:{

  }
})
