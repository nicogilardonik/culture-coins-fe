import Api from '@/services/baseRequest'

class AskYourCommunityService {

    async addRequest(data) {
        try {
            let response = await Api.post('supportRequest', data);
            return response;
        } catch (error) {
            console.error('Post error')
            throw error
        }
    }

    async getRequests(email) {
        try {
            let response = await Api.get(`supportRequest/requests/${email}`);
            return response;
        } catch (error) {
            console.error('Get error')
            throw error
        }
    }

    async getRequestById(id) {
        try {
            let response = await Api.get(`supportRequest/request/${id}`);
            return response;
        } catch (error) {
            console.error('get by id error');
            throw error;
        }
    }

    async updateRequest(id, data) {
        try {
            let response = await Api.put(`supportRequest/edit/${id}`, data);
            return response;
        } catch (error) {
            console.error('Put error');
            throw error;
        }
    }

    async deleteRequest(id) {
        try {
            let response = await Api.delete(`supportRequest/${id}`);
            return response;
        } catch (error) {
            console.error('Delete error');
            throw error;
        }
    }

    async changeStatus(id){
        try {
            let response = await Api.put(`supportRequest/nextState/${id}`);
            return response;
        } catch (error) {
            console.error('change status error');
            throw error;
        }
    }

 

}

export default new AskYourCommunityService()
