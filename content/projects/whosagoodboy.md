---
name: whosagoodboy
featured: true
year: 2022
heroImage: https://github.com/ryanachten/whosagoodboy/raw/main/docs/wagb_loading.gif
languages:
  - Jupyter Notebook
  - PureBasic
  - TypeScript
  - SCSS
  - HCL
  - JavaScript
tools:
  - image-classfication
  - nextjs
  - react
  - tensorflow
  - tensorflowjs
  - terraform
archived: false
homepage: https://thatsagoodboy.herokuapp.com/
githubUrl: https://github.com/ryanachten/whosagoodboy
description: Dog breed classification web app 🐶
---
![Loading](https://github.com/ryanachten/whosagoodboy/raw/main/docs/wagb_loading.gif?raw=true)

# whosagoodboy

Have you ever passed a cute dog on the street and thought "I wonder what breed that dog is"?

Well, wonder no more. **whosagoodboy** is a simple web app which allows you, through the power of machine learning, identify what breed that a mystery dog might be.

![Upload](https://github.com/ryanachten/whosagoodboy/raw/main/docs/wagb_desktop_upload.png?raw=true)

## Pipeline

![Pipeline](https://github.com/ryanachten/whosagoodboy/raw/main/docs/wagb_pipeline.png?raw=true)

1. A Tensorflow model is trained on the [Stanford Dogs dataset](http://vision.stanford.edu/aditya86/ImageNetDogs/)
2. The model is converted into a model TensorflowJS can consume and labels are outputted as a JSON file
3. The model and labels are used in the Next.js application to classify images on the client

![Upload](https://github.com/ryanachten/whosagoodboy/raw/main/docs/wagb_upload.png?raw=true)

Then when a user uploads a photo, we are able to do the following:

1. Crop the photo so that it uses a square aspect ratio and then resize it to dimensions which are acceptable for classification
2. Pass transformed photo to the Tensorflow model to predict what breeds are most likely associated with the photo
3. Classification results are mapped to outputted labels to identify dog breeds predictions
4. Use Wikipedia to provide general information on the dog breeds being classified

![Gallery](https://github.com/ryanachten/whosagoodboy/raw/main/docs/wagb_desktop_gallery.png?raw=true)

## Running whosagoodboy

Documentation for running different parts of the app can be found here:

- [Client and backend Next.js app ](https://github.com/ryanachten/whosagoodboy/raw/main/app/README.md)
- [Tensorflow model](https://github.com/ryanachten/whosagoodboy/raw/main/model/README.md)
- [Terraform infrastructure](https://github.com/ryanachten/whosagoodboy/raw/main/infra/README.md)
