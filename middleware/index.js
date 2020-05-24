function validateNewDetection(req, res, next) {
  const imageBuffer = req.body
  // validate input data length
  if (!imageBuffer.length) {
    return res.status(400).json({ message: 'Bad request' })
  }
  // validate image format
  const head = imageBuffer.slice(0, 2)
  const tail = imageBuffer.slice(-2)
  if (
    !head.equals(Buffer.from('ffd8', 'hex'))
    || !tail.equals(Buffer.from('ffd9', 'hex'))
  ) {
    return res.status(400).json({ message: 'Accepts only jpg/jpeg format' })
  }
  return next()
}

module.exports = {
  validateNewDetection
}
