export class Recognition {
    constructor(message) {
      this.message = message,
      this.userToEmail = "nicogilardonik@gmail.com",
      this.userToNickName = "nicolas",
      this.userFromNickName = "joaquin"
    }
  
    static fromJSON(json) {
      return new Recognition(json)
    }
  }


   
