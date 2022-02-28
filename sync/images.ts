import * as fs from 'fs'
import fetch from 'node-fetch'

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

  // new file name is project name + original file extension
  const writeImageName = `${name.toLowerCase()}${matches![0]}`
  const imagePath = `${IMAGE_DIR}/${writeImageName}`
  try {
    // console.log('Downloading ', heroImage, 'for project', name)
    const res = await fetch(remoteHeroImage)
    res.body?.pipe(fs.createWriteStream(imagePath))
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
