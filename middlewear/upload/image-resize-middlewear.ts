import sharp from 'sharp'
import { Response, NextFunction, Request } from 'express'
// const sizes = [150, 300, 450, 700, 1200] as const
export async function resizeImage(req: Request, res: Response, next: NextFunction) {
  if (!req.file) return next()
  const file = req.file
  const pathToOriginalFile = file.path

  await sharp(pathToOriginalFile).webp({ quality: 90 }).toFile(toPath(pathToOriginalFile, 'orig'))
  const pathToNewFile = `./${toPath(pathToOriginalFile, 'orig')}`
  sharp(pathToNewFile).resize({ width: 200 }).webp({ quality: 85 }).toFile(toPath(pathToOriginalFile, 'preview'))

  switch (file.fieldname) {
    case 'avatar':
      await sharp(pathToNewFile).resize({ width: 75 }).webp({ quality: 85 }).toFile(toPath(pathToOriginalFile, 75))
      req.file.path = toPath(pathToOriginalFile, 75)
      break
    case 'gallery':
      await sharp(pathToNewFile).resize({ width: 1530, height: 420 }).webp({ quality: 90 }).toFile(toPath(pathToOriginalFile, 1500))
      break
    case 'news':
      sharp(pathToNewFile).resize({ width: 600, height: 360 }).webp({ quality: 90 }).toFile(toPath(pathToOriginalFile, 600))
      req.file.path = toPath(pathToOriginalFile, 'orig')
      break
  }

  next()
}

const toPath = (path: string, size: number | string = '') => path.replace(/\.([^.\\/:*?"<>|\r\n]+)$/, `_${size}.webp`)
