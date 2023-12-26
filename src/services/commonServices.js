import BaseRequest from '@/services/baseRequest'

class CommonServices {
  async getUserProfile() {
    let userProfile = await BaseRequest.get(`user/nicogilardonik@gmail.com`);
    return userProfile;
  }

  async getLastNotificacions() {
    let lastNotificacions = await BaseRequest.get(`notifications`);
    return lastNotificacions;
  }

}

export default new CommonServices();