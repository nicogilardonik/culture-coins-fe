export class AskYourCommunity {
    constructor(title, message, priority, user, community) {
      this.title= title;
      this.message = message,
      this.priority = priority,
      this.userFrom = user
      this.community = community
    };
  
    static fromJSON(json) {
      return new AskYourCommunity(json)
    }
  }


   
