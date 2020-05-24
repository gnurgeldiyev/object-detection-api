# Building an Image Object Detection API with Tensorflow.js & COCO SSD pretrained model

Basic API for posting images and getting the result of detection.
Uses COCO SSD pretrained model to detect objects in 300x300 px images. List of object [names](https://github.com/tensorflow/tfjs-models/blob/master/coco-ssd/src/classes.ts)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Installed local [Node.js](https://nodejs.org/) environment
- Package manager to install packages. [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

Clone the repo in your environment

```bash
git clone https://github.com/gnurgeldiyev/object-detection-api.git
```

### Installing

```bash
# move into project folder
cd object-detection-api

# install the dependencies
yarn install

# rename the .env.sample
mv .env.sample .env

# add your variables
nano .env
```

#### Running the server

```bash
yarn start
```

## Example

```bash
# POST - /detection
curl -H "Content-Type: application/octet-stream" --data-binary "@image/bicycle 300x300.jpg" "http://localhost:3000/detection"
```

##### Response

```json
{
  "duration": 171,
  "result": [
    {
      "bbox": [
        5.610904097557068,
        85.95118224620819,
        295.6936866044998,
        171.45759165287018
      ],
      "class": "bicycle",
      "score": 0.9325430393218994
    }
  ]
}
```

## Running the tests

```bash
yarn test
```

## Built With

* [Express](https://github.com/expressjs/express/) - The web framework used
* [Tensorflow.js](https://github.com/tensorflow/tfjs) - For using ML model
* [COCO SSD](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd) - Pretrained Model for Object Detection
* [Jest](https://github.com/facebook/jest) - For testing
* [SuperTest](https://github.com/visionmedia/supertest) - For testing HTTP API

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
