import BaseRequest from '@/services/baseRequest'

class CommonServices {
  async getUserProfile() {
    let userProfile = await BaseRequest.get('userProfile');
    return userProfile;
  }
}

export default new CommonServices();