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
            let response = await Api.get(`supportRequest/requests/${email}`);
            return response;
        } catch (error) {
            console.error('Error al hacer get')
            throw error
        }
    }

    async getRequestById(id) {
        try {
            let response = await Api.get(`supportRequest/request/${id}`);
            return response;
        } catch (error) {
            console.error('Error al hacer get por id')
            throw error
        }
    }

    async updateRequest(id, data) {
        try {
            let response = await Api.put(`supportRequest/edit/${id}`, data);
            return response;
        } catch (error) {
            console.error('Error al hacer put')
            throw error
        }
    }

    async deleteRequest(id) {
        try {
            let response = await Api.delete(`supportRequest/${id}`);
            return response;
        } catch (error) {
            console.error('Error al hacer delete')
            throw error
        }
    }

}

export default new AskYourCommunityService()
