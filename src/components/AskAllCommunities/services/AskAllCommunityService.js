import Api from '@/services/baseRequest'

class AskAllCommunityService {


    async getRequests() {
        try {
            let response = await Api.get('supportRequest/requests');
            return response;
        } catch (error) {
            console.error('Get error')
            throw error
        }
    }

    async getCommunities() {
        try {
            const list = await Api.get('community');
            return list;
        } catch (error) {
            console.error('Error al obtener las comunidades');
            throw error
        }
    }
}

export default new AskAllCommunityService()