// import { ethers } from "ethers";

export function Stake(value: number, division: [number, number, number], account: string) {
    console.log("Form submitted", value);
    console.log("Slider Value", division);
    console.log("Account", account);
}

export function Cover(value: number) {
    console.log("Cover Value", value);
}

export function Claim(value: string) {
    console.log("Hash Value", value);
}