import Api from '@/services/baseRequest'

class RecognitionService {

    async addRecognition(data) {
        try {
            const result = await Api.post(`recognition`, data)
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

    async getListUsers() {
        try {
            const result = await Api.get(`user/list`)
            return result;
        } catch (error) {
            console.error('Get error')
            throw error
        }
    }

    async addFeedback(data) {
        try {
            const result = await Api.post(`recognition/feedback`, data)
            return result;
        } catch (error) {
            console.error('Error al hacer test')
            throw error
        }
    }

    async getFeedbacks(email) {
        try {
            let response = await Api.get(`recognition/feedback/${email}`);
            return response;
        } catch (error) {
            console.error('Get error')
            throw error
        }
    }

}

export default new RecognitionService()
