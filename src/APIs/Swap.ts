import { SwapProps } from "../Utils/interface";
import axios from "axios";

export default async function Swap(fromSwap: SwapProps, toSwap: SwapProps, recipentAddress: string, value: number, account: string) {
    // Handle the submission of the query here
    console.log('================Querying Swap===================');
    console.log('From Section:', fromSwap);
    console.log('To Section:', toSwap);
    console.log('Recipient Address:', recipentAddress);
    console.log('Value:', value);
    console.log('Account:', account);



    const PATH_FINDER_API_URL = "https://k8-testnet-pf.routerchain.dev/api"

    const getQuote = async (params:any) => {
        const endpoint = "v2/quote"
        const quoteUrl = `${PATH_FINDER_API_URL}/${endpoint}`

        try {
            const res = await axios.get(quoteUrl, { params })
            return res.data;
        } catch (e) {
            console.error(`Fetching quote data from pathfinder: ${e}`)
        }
    }

    const params = {
        fromTokenAddress: fromSwap.token?.address,
        toTokenAddress: toSwap.token?.address,
        amount: value,
        fromTokenChainId: fromSwap.token?.chainId,
        toTokenChainId: toSwap.token?.chainId,
    }

    const quoteData = await getQuote(params);

    console.log('Quote Data:', quoteData)

    console.log('================Querying Over===================');
}