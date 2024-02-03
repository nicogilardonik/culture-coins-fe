import Api from '@/services/baseRequest'
class CommunitiesService {

    async getUsers() {
        try {
            const list = await Api.get(`user/list`);
            return list;
        } catch (error) {
            console.error('Error al obtener los Users');
            throw error
        }
    }
    async getCommunities() {
        try {
            const list = await Api.get(`Communities`);
            return list;
        } catch (error) {
            console.error('Error al obtener los Users');
            throw error
        }
    }
    async update(data) {
        try {
            let result = await Api.put(`user/${data.email}`, data);
            return result;
        } catch (error) {
            console.error('Error al hacer update');
            throw error;
        }
    }

}

export default new CommunitiesService()