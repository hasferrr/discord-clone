import { z } from 'zod'

const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpg', 'image/jpeg']
const MAX_IMAGE_SIZE_IN_MB = 2

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024)
  return +result.toFixed(decimalsNum)
}

export const checkLength = (files: FileList) => {
  return Array.from(files ?? []).length !== 0
}

export const checkSize = (files: FileList) => {
  return Array.from(files ?? []).every(
    (file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE_IN_MB
  )
}

export const checkTypes = (files: FileList) => {
  return Array.from(files ?? []).every((file) =>
    ACCEPTED_IMAGE_TYPES.includes(file.type)
  )
}

export const failedLength =  'Image is required'
export const failedSize =  `The maximum image size is ${MAX_IMAGE_SIZE_IN_MB}MB`
export const failedTypes =  'File type is not supported'

export const serverModalSchema = z.object({
  name: z.string().min(1, {
    message: 'Server name is required.',
  }),
  files: z
    .custom<FileList>()
    .refine(checkLength, failedLength)
    .refine(checkSize, failedSize)
    .refine(checkTypes, failedTypes),
})
