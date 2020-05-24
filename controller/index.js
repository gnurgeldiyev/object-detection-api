const Model = require('../util/model')
const model = new Model()

/**
 * @returns prediction result & duration
 */
async function detectObjects(req, res) {
  const start = new Date()
  const rawImage = req.body
  let prediction = []
  try {
    prediction = await model.detect(rawImage)
  } catch(err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
  return res.status(200).json({
    duration: new Date() - start,
    result: prediction
  })
}

module.exports = {
  detectObjects
}
