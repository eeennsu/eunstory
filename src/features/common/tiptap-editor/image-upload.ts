const checkFileIfImage = (file: File) => {
    const type = file.type.split('/')[0]
    return type === 'image' && !file.type.includes('svg')
}

export const customImageUploadFile = async (files: FileList) => {
    const form = new FormData()
    Array.from(files)
        .filter((file) => checkFileIfImage(file))
        .forEach((file) => form.append('files', file))

    if (Array.from(form.getAll('files')).length > 0) {
        // const response = await requestUploadImage(form)
        // return response
    }
}

export const ACCEPTED_MEME_TYPE = `image/jpeg,image/png,image/gif,image/webp,image/bmp,image/tiff,image/vnd.microsoft.icon,image/x-icon,image/heif,image/heic,image/vnd.adobe.photoshop,image/jp2,image/jpx,image/jpm,image/jxr,image/heif-sequence,image/heic-sequence,image/dicom-rle,image/jbig,image/jbig2,image/x-rle,image/vnd.zbrush.pcx`
