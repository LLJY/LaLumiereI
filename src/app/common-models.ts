
export class Item {
    constructor(public listingId: string, public title: string, public sellerName: string, public sellerUID: string, public sellerImageURL: string, public Likes: number, public listedTime: Date, public price: number, public rating: number, public description: string, public transactionInformation: string, public procurementInformation: string, public category: string, public stock: number, public images: Array<string>, public isAdvert: boolean, public isLiked: boolean, public isUsed: boolean, public location: string) {

    }
}
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export enum UserType{
    BUYER=0,
    SELLER,
    ADMIN,
}
export class User{
    constructor(public uid:string, public name: string, public username:string, public email: string, public ImageURL: string, public userType: UserType, public about: string){}
}
export class CommonValues{
    static errorMessage = "Oops! Something went wrong!";
    static snackBarDuration = 2000;
}