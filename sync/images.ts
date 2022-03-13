import * as fs from 'fs'
import fetch from 'node-fetch'
import sharp from 'sharp'

import { Project } from '../constants/interfaces'
import { IMAGE_DIR } from './constants'

export const cleanImageDirectory = () => {
  // Clean directory and contents prior to downloading images
  const dirExists = fs.existsSync(IMAGE_DIR)
  if (!dirExists) {
    fs.mkdirSync(IMAGE_DIR)
  } else {
    fs.rmSync(IMAGE_DIR, { recursive: true, force: true })
    fs.mkdirSync(IMAGE_DIR)
  }
}

// conform images to aspect ratio of 16:9 and converts to .jpg
const transformImage = async (image: Buffer, outputPath: string) => {
  const img = sharp(image)
  const metadata = await img.metadata()
  const updatedHeight = metadata.width
    ? Math.round(metadata.width * 0.5625)
    : metadata.height
  return img
    .resize(metadata.width, updatedHeight)
    .webp()
    .toFile(outputPath, (e) => {
      if (e) {
        console.error('Error transforming file:', outputPath, e)
      }
    })
}

export const downloadHeroImage = async ({
  heroImage,
  name,
}: Project): Promise<{ remote: string; local: string }> => {
  // Takes the string from the last / in the file structure
  const fileTypeExtensionRegExp = /\.[0-9a-z]+$/
  const remoteHeroImage = heroImage.remote // will change this later
  const matches = remoteHeroImage.match(fileTypeExtensionRegExp)
  if (!matches) {
    console.error("Couldn't determine extension for", name, remoteHeroImage)
    return {
      remote: remoteHeroImage,
      local: '',
    }
  }

  const imagePath = `${IMAGE_DIR}/${name.toLowerCase()}.webp`
  try {
    const res = await fetch(remoteHeroImage)
    const image = await res.buffer()
    await transformImage(image, imagePath)
    return {
      remote: remoteHeroImage,
      local: imagePath.replace('static/', ''),
    }
  } catch (error) {
    console.error('Error downloading hero image', error)
    return {
      remote: remoteHeroImage,
      local: '',
    }
  }
}
