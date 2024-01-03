import Api from '@/services/baseRequest'

class RecognitionService {

    async addRecognition(data) {
        try {
            //let x = data 
            let result = await Api.post(`recognition`, data)
            return result;
        } catch (error) {
            console.error('Error al hacer test')
            throw error
        }
    }

    async getMyRecognitions(email) {
        try {
            let response = await Api.get(`recognition/${email}`);
            return response;
        } catch (error) {
            console.error('Get error')
            throw error
        }
    }

}

export default new RecognitionService()
