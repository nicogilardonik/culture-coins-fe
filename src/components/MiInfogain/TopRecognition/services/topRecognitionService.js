import Api from '@/services/baseRequest';

class TopRecognitionService {


    async getTopValues() {
        try {
            const result = await Api.get('recognition/topValues');
            return result;
        } catch (error) {
            console.error('Error al obtener las recognitions');
            throw error;
        }
    }

}

export default new TopRecognitionService();