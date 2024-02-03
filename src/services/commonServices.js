import BaseRequest from '@/services/baseRequest'

class CommonServices {
  async getUserProfile() {
    let userProfile = await BaseRequest.get(`user`);
    return userProfile;
  }

  async getLastNotificacions() {
    let lastNotificacions = await BaseRequest.get(`recognition/lastMinute`);
    return lastNotificacions;
  }

}

export default new CommonServices();