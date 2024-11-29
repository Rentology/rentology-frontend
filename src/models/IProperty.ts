export interface IProperty {
    id: bigint;
    ownerId: number;
    title: string;
    location: string;
    price: number;
    propertyType: "house" | "apartment";
    rentalType: "shortTerm" | "longTerm";
    maxGuests: number;
    createdAt: string;
}