import Api from '@/services/baseRequest'
class ValuesBehaviorsService {

    async getValuesBehaviors() {
        try {
            const list = await Api.get(`ValuesBehaviors`);
            return list;
        } catch (error) {
            console.error('Error al obtener los Values Behaviors');
            throw error
        }
    }

}

export default new ValuesBehaviorsService()