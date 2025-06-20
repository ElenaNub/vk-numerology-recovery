import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

dotenv.config()

const app = express()
app.use(bodyParser.json())

// Простенький GET‑хэндлер для ручной проверки
app.get('/vk/payments', (req, res) => {
  return res.send('VK payments endpoint is live')
})

// POST для callbacks от VK
app.post('/vk/payments', (req, res) => {
  // если вдруг тело пустое, сразу уходим
  if (!req.body || req.body.secret !== process.env.VK_SECRET) {
    return res.status(403).send('Invalid secret')
  }

  const { type, object } = req.body

  // 1) Сначала при подтверждении подключения ВК шлёт type=confirmation
  if (type === 'confirmation') {
    return res.send(process.env.VK_CONFIRMATION) // код из dev.vk.com
  }

  // 2) А дальше придут уведомления о платежах (type=payment)
  if (type === 'payment') {
    // TODO: обработать object (например, object.order_id или что там в документации)
    console.log('VK payment arrived:', object)
    return res.send('ok')
  }

  // Иначе просто отвечаем «ok»
  return res.send('ok')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`VK payments server listening on port ${PORT}`)
})