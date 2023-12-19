import Api from '@/services/baseRequest';

class ProfileService {

    async update(data) {
        try {
            let result = await Api.put(`user/${data.email}`, data);
            return result;
        } catch (error) {
            console.error('Error al hacer test');
            throw error;
        }
    }

}

export default new ProfileService();
