import Api from '@/services/baseRequest';

class ProfileService {

    async update(data) {
        try {
            let result = await Api.put(`user/${data.email}`, data);
            return result;
        } catch (error) {
            console.error('Error al hacer update');
            throw error;
        }
    }

    async getSkills() {
        try {
            let result = await Api.get('skills');
            return result;
        } catch (error) {
            console.error('Error al obtener las skills');
            throw error;
        }
    }

}

export default new ProfileService();
