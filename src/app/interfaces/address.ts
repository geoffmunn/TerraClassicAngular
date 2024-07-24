import { AddressType } from "./addressType";

export interface Address {
    id: number;
    name: string;
    address: string;
    type?: AddressType;
}
