import Api from '@/services/baseRequest'

class AskYourCommunityService {

    async addRequest(data) {
        try {
            let response = await Api.post('supportRequest', data);
            return response;
        } catch (error) {
            console.error('Error al hacer post')
            throw error
        }
    }

    async getRequests(email) {
        try {
            let response = await Api.get(`supportRequest/${email}`);
            console.log(response);
            return response;
        } catch (error) {
            console.error('Error al hacer get')
            throw error
        }
    }

}

export default new AskYourCommunityService()
