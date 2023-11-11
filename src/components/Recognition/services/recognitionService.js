//import Api from '@/services/baseRequest'

class RecognitionService {

    async addRecognition(data) {
        try {
            let x = data 
            //let test = await Api.get(`acknowledgment`)
            return x;
        } catch (error) {
            console.error('Error al hacer test')
            throw error
        }
    }

}

export default new RecognitionService()
