import { SwapProps } from "../Utils/interface";

export default function Swap(fromSwap: SwapProps, toSwap: SwapProps, recipentAddress: string, gasTopUp: boolean, account: string) {
    // Handle the submission of the query here
    console.log('From Section:', fromSwap);
    console.log('To Section:', toSwap);
    console.log('Recipient Address:', recipentAddress);
    console.log('Gas TopUp:', gasTopUp);
    console.log('Account:', account);
}