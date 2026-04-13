import app from './app.js'
import initializeDB from './config/initDB.js'

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`)
  
  // Initialize database with demo data if empty
  await initializeDB()
})

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Server shutting down...')
  server.close(() => {
    console.log('✅ Server closed')
    process.exit(0)
  })
})
