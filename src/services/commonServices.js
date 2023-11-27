import BaseRequest from '@/services/baseRequest'

class CommonServices {
  async getUserProfile() {
    let userProfile = await BaseRequest.get(`user/nicogilardonik@gmail.com`);
    return userProfile;
  }
}

export default new CommonServices();