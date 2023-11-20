import Api from '@/services/baseRequest'

class RecognitionService {

    async addRecognition(data) {
        try {
            const recognition = await Api.post(`recognition`, data)
            return recognition;
        } catch (error) {
            console.error('Error al hacer test')
            throw error
        }
    }

}

export default new RecognitionService()
