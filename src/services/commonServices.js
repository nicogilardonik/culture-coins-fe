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

  async login(username, password) {
    debugger
    let response = await BaseRequest.post(`user/auth/login`, { username, password });
    return response;
  }

}

export default new CommonServices();