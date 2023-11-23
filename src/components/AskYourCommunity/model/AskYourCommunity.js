export class AskYourCommunity {
    constructor(title, message, priority, user) {
      this.title= title;
      this.message = message,
      this.priority = priority,
      this.userFrom = user
    };
  
    static fromJSON(json) {
      return new AskYourCommunity(json)
    }
  }


   
