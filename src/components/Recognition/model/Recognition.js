export class Recognition {
    constructor(message) {
      this.message = message,
      this.userTo = "nicolas",
      this.userFrom = "joaquin"
    }
  
    static fromJSON(json) {
      return new Recognition(json)
    }
  }


   
