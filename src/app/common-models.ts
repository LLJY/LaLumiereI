export class CommonModels {
}
export class Item {
    constructor(public ListingId: string, public title: string, public sellerName: string, public sellerUID: string, public sellerImageURL: string, public Likes: number, public listedTime: Date, public price: number, public rating: number, public description: string, public transactionInformation: string, public procurementInformation: string, public category: string, public stock: number, public images: Array<string>, public isAdvert: boolean, public isUsed: boolean, public location: string) {

    }
}
