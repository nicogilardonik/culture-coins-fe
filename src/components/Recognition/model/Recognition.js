export class Recognition {
    constructor(message, category, subCategory) {
      this.userTo = "joaquinbanchero610@hotmail.com",
      this.userFrom = "nicolas",
      this.message = message,
      this.category = category,
      this.subCategory = subCategory
    }
  
    static fromJSON(json) {
      return new Recognition(json)
    }
  }


   
