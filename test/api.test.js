const request = require('supertest')
const server = require('../server')
const fs = require('fs')
const { join } = require('path')

const waitForModelLoad = (done) => {
  setTimeout(() => {
    done()
  }, 20000)
}

describe('Test Object Detection API', () => {
  let api
  beforeAll(async (done) => {
    api = await request(server)
    await waitForModelLoad(done)
  })

  afterAll((done) => {
    done()
  })

  test('Post empty body - shoudl fail with 400', async () => {
    const expectedRes = {
      statusCode: 400,
      body: {
        message: 'Bad request'
      }
    }
    await api
      .post('/detection')
      .set('Content-Type', 'application/octet-stream')
      .set('Accept', 'application/json')
      .send()
      .expect('Content-Type', /json/)
      .expect(expectedRes.statusCode)
      .then(res => {
        expect(res.body).toEqual(expectedRes.body)
      })
  })

  test('Post an unsupperted image format - should fail with 400', async () => {
    const testImagePath = join(__dirname, '../image/door 300x300.png')
    const expectedRes = {
      statusCode: 400,
      body: {
        message: 'Accepts only jpg/jpeg format'
      }
    }
    
    await api
      .post('/detection')
      .set('Content-Type', 'application/octet-stream')
      .set('Accept', 'application/json')
      .send(fs.readFileSync(testImagePath))
      .expect('Content-Type', /json/)
      .expect(expectedRes.statusCode)
      .then(res => {
        expect(res.body).toEqual(expectedRes.body)
      })
  })

  test('Post an image - should succeed with 200', async () => {
    const testImagePath = join(__dirname, '../image/bicycle 300x300.jpg')
    const expectedRes = {
      statusCode: 200,
      body: {
        duration: 10,
        resultClass: 'bicycle'
      }
    }
    
    await api
      .post('/detection')
      .set('Content-Type', 'application/octet-stream')
      .set('Accept', 'application/json')
      .send(fs.readFileSync(testImagePath))
      .expect('Content-Type', /json/)
      .expect(expectedRes.statusCode)
      .then(res => {
        expect(res.body.duration).toBeGreaterThan(expectedRes.body.duration)
        expect(res.body.result).not.toHaveLength(0)
        expect(res.body.result[0].class).toEqual(expectedRes.body.resultClass)
      })
  })
})
