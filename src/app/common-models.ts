
export class Item {
    constructor(public listingId: string, public title: string, public sellerName: string, public sellerUID: string, public sellerImageURL: string, public Likes: number, public listedTime: Date, public price: number, public rating: number, public description: string, public transactionInformation: string, public procurementInformation: string, public category: string, public stock: number, public images: Array<string>, public isAdvert: boolean, public isUsed: boolean, public location: string) {

    }
}
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export enum UserType{
    ADMIN=0,
    BUYER,
    SELLER,
}
export class User{
    constructor(public uid:string, public name: string, public email: string, public userType: UserType){}
}
