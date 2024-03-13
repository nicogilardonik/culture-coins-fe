export class Feedback {
    constructor(message, userToEmail, userFromEmail) {
      this.message = message,
      this.userToEmail = userToEmail,
      this.userFromEmail = userFromEmail
    }
  
    static fromJSON(json) {
      return new Feedback(json)
    }
  }


   
