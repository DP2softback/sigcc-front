import axiosInt from '../../../config/axios';
class FileUploadService {
    upload(file, onUploadProgress) {
        let formData = new FormData();
        formData.append('file', file);
        return axiosInt.post('capacitaciones/upload_file/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                },
            onUploadProgress,
        });
    }
}

export default new FileUploadService();