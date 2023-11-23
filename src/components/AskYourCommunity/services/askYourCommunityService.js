import Api from '@/services/baseRequest'

class AskYourCommunityService {

    async addRequest(data) {
        try {
            let response = await Api.post('SupportRequest', data); //TODO: CAMBIAR A MINISCULA
            return response;
        } catch (error) {
            console.error('Error al hacer test')
            throw error
        }
    }

}

export default new AskYourCommunityService()
