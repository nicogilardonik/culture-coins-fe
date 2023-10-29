import Api from '@/services/baseRequest'

class AcknowledgmentService {

    async getAcknowledgment() {
        try {
            let test = await Api.get(`acknowledgment`)
            console.log(test);
            return '';
        } catch (error) {
            console.error('Error al hacer test')
            throw error
        }
    }

}

export default new AcknowledgmentService()