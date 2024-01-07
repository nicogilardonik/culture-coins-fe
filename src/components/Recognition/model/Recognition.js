export class Recognition {
    constructor(message) {
      this.message = message,
      this.userToEmail = "banchero510@gmail.com",
      this.userToNickName = "Joaquin",
      this.userFromNickName = "Nicolas"
    }
  
    static fromJSON(json) {
      return new Recognition(json)
    }
  }


   
