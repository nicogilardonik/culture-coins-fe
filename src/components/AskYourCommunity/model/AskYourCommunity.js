export class AskYourCommunity {
    constructor(message,priority,user) {
      this.message = message,
      this.priority = priority,
      this.userFrom = user
    }
  
    static fromJSON(json) {
      return new AskYourCommunity(json)
    }
  }


   
