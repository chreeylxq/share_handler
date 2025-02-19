import cloudinary, { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'

//上传图片, zip
export function uploads(
    file: string,
    public_id?: string,
    overwrite?: boolean,
    invalidate?: boolean
): Promise<UploadApiErrorResponse | UploadApiResponse | undefined> {
    return new Promise((resolve) => {
        cloudinary.v2.uploader.upload(
            file,
            {
                public_id,
                overwrite,
                invalidate,
                resource_type: 'auto' //zip, images
            },
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                if (error) resolve(error)
                resolve(result);
            }
        );
    });
}
//上传视频
export function uploadVideo(
    file: string,
    public_id: string,
    overwrite?: boolean,
    invalidate?: boolean
): Promise<UploadApiErrorResponse | UploadApiResponse | undefined> {
    return new Promise((resolve) => {
        cloudinary.v2.uploader.upload(
            file,
            {
                public_id,
                overwrite,
                invalidate,
                chunk_size: 50000, //50MB
                resource_type: 'video'
            },
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                if (error) resolve(error);
                resolve(result);
            }
        );
    });
}