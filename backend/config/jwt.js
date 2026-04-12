export const generateToken = (id, role) => {
  const payload = { id, role }
  const secret = process.env.JWT_SECRET
  const options = { expiresIn: '7d' }
  
  // Simulating JWT generation (in real app use jsonwebtoken library)
  return `${Buffer.from(JSON.stringify(payload)).toString('base64')}.${Date.now()}`
}

export const verifyToken = (token) => {
  try {
    const parts = token.split('.')
    if (parts.length !== 2) throw new Error('Invalid token')
    const payload = JSON.parse(Buffer.from(parts[0], 'base64').toString())
    return payload
  } catch (error) {
    throw new Error('Invalid token')
  }
}
