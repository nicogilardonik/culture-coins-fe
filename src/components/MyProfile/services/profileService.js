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
            const result = await Api.get('skills');
            return result;
        } catch (error) {
            console.error('Error al obtener las skills');
            throw error;
        }
    }
    async getTeams() {
        try {
            console.log("entro a getTeams service");
            const result = await Api.get('teams');
            return result;
        } catch (error) {
            console.error('Error al obtener los teams');
            throw error;
        }
    }

}

export default new ProfileService();
