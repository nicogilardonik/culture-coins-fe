import Api from '@/services/baseRequest'
class ValuesBehaviorsService {

    async getValuesBehaviors() {
        try {
            const list = await Api.get(`ValuesBehaviors`);
            console.log(list);
            return list;
        } catch (error) {
            console.error('Error al hacer test');
            throw error
        }
    }

}

export default new ValuesBehaviorsService()