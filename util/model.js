const tf = require('@tensorflow/tfjs-node')
const cocoSsd = require('@tensorflow-models/coco-ssd')

class Model {
  constructor() {
    this.model = this.loadDetectionModel()
  }

  async loadDetectionModel() {
    const start = new Date()
    console.log('Loading model...')
    this.model = await cocoSsd.load()
    console.log(`🤖 Model is loaded ${(new Date() - start)/1000}s`)
  }

  async detect(imageBuffer) {
    const arrByte = Uint8Array.from(imageBuffer)
    const decodedImage = await tf.node.decodeJpeg(arrByte)
    // make a prediction
    const prediction = await this.model.detect(decodedImage)
    return prediction
  }
}

module.exports = Model
