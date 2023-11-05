export class Acknowledgment {
    constructor(message) {
      this.message = message,
      this.userTo = "nicolas",
      this.userFrom = "joaquin"
    }
  
    static fromJSON(json) {
      return new Acknowledgment(json)
    }
  }


   
