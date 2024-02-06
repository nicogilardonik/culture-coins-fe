export class Recognition {
    constructor(message, userToEmail, userFromEmail, category, subCategory) {
      this.message = message,
      this.userToEmail = userToEmail,
      this.userFromEmail = userFromEmail,
      this.category = category,
      this.subCategory = subCategory
    }
  
    static fromJSON(json) {
      return new Recognition(json)
    }
  }


   
