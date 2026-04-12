import app from './app.js'
import seedData from './seed/seedData.js'

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`)
  
  // Seed database if empty (optional)
  if (process.argv[2] === '--seed') {
    await seedData()
  }
})

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Server shutting down...')
  server.close(() => {
    console.log('✅ Server closed')
    process.exit(0)
  })
})
