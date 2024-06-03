import axios from 'axios'
import fs from 'fs'
import path from 'path'

const downloadPath = './public/audio/female/vowels'

const urls = []

async function downloadFile(url, outputPath) {
  const writer = fs.createWriteStream(outputPath)

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

async function main() {
  for (const url of urls) {
    const fileName = path.basename(url)
    const outputPath = path.join(downloadPath, fileName)

    try {
      console.log(`Downloading ${url}...`)
      await downloadFile(url, outputPath)
      console.log(`Downloaded ${url} to ${outputPath}`)
    } catch (error) {
      console.error(`Failed to download ${url}:`, error)
    }
  }
}

main()
