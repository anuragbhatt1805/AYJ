import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Bot, Send } from "lucide-react";
import { useSignals } from "@preact/signals-react/runtime";
import { accountToken } from "../Utils/baseStore";
import { ConnectButton } from "../Components/ConnectButton";
// import Query from '../APIs/AiBot';
import OpenAI from "openai";
import axios from "axios";
import { ethers } from "ethers";

const AiBot: React.FC = () => {
  useSignals();

  const [userQuery, setUserQuery] = useState("");

  const [, setQuoteData] = useState();
  const [account] = useState("Connect Wallet");

  const erc20_abi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "burn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "burnFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "initialOwner",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "ECDSAInvalidSignature",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "length",
          type: "uint256",
        },
      ],
      name: "ECDSAInvalidSignatureLength",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "s",
          type: "bytes32",
        },
      ],
      name: "ECDSAInvalidSignatureS",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "allowance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "needed",
          type: "uint256",
        },
      ],
      name: "ERC20InsufficientAllowance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "balance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "needed",
          type: "uint256",
        },
      ],
      name: "ERC20InsufficientBalance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "approver",
          type: "address",
        },
      ],
      name: "ERC20InvalidApprover",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
      ],
      name: "ERC20InvalidReceiver",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "ERC20InvalidSender",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "ERC20InvalidSpender",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "deadline",
          type: "uint256",
        },
      ],
      name: "ERC2612ExpiredSignature",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "signer",
          type: "address",
        },
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "ERC2612InvalidSigner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "currentNonce",
          type: "uint256",
        },
      ],
      name: "InvalidAccountNonce",
      type: "error",
    },
    {
      inputs: [],
      name: "InvalidShortString",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "OwnableUnauthorizedAccount",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "str",
          type: "string",
        },
      ],
      name: "StringTooLong",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [],
      name: "EIP712DomainChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "deadline",
          type: "uint256",
        },
        {
          internalType: "uint8",
          name: "v",
          type: "uint8",
        },
        {
          internalType: "bytes32",
          name: "r",
          type: "bytes32",
        },
        {
          internalType: "bytes32",
          name: "s",
          type: "bytes32",
        },
      ],
      name: "permit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "DOMAIN_SEPARATOR",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "eip712Domain",
      outputs: [
        {
          internalType: "bytes1",
          name: "fields",
          type: "bytes1",
        },
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "version",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "chainId",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "verifyingContract",
          type: "address",
        },
        {
          internalType: "bytes32",
          name: "salt",
          type: "bytes32",
        },
        {
          internalType: "uint256[]",
          name: "extensions",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "nonces",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const PATH_FINDER_API_URL = "https://k8-testnet-pf.routerchain.dev/api";

  const getQuote = async (params: any) => {
    const endpoint = "v2/quote";
    const quoteUrl = `${PATH_FINDER_API_URL}/${endpoint}`;

    console.log(quoteUrl);

    try {
      const res = await axios.get(quoteUrl, { params });
      setQuoteData(res.data);
      return res.data;
    } catch (e) {
      console.error(`Fetching quote data from pathfinder: ${e}`);
    }
  };

  const checkAndSetAllowance = async (
    wallet: any,
    tokenAddress: any,
    approvalAddress: any,
    amount: any
  ) => {
    const erc20 = new ethers.Contract(tokenAddress, erc20_abi, wallet);
    console.log(await wallet.getAddress(),
    approvalAddress);

    // const wa = await wallet.getAddress()

    const allowance = await erc20.approve(
      approvalAddress, amount
    );
    if (allowance.lt(amount)) {
      const approveTx = await erc20.approve(approvalAddress, amount, {
        gasPrice: await wallet.provider.getGasPrice(),
      });
      console.log(approveTx.hash);
      try {
        await approveTx.wait();
        console.log(`Transaction mined succesfully: ${approveTx.hash}`);
        return approveTx.hash;
      } catch (error) {
        console.log(`Transaction failed with error: ${error}`);
        return null;
      }
    } else {
      console.log("enough allowance");
      alert("enough allowance");
      return null;
    }
  };

  const getTransaction = async (_params: any, quoteData: any) => {
    const endpoint = "v2/transaction";
    const txDataUrl = `${PATH_FINDER_API_URL}/${endpoint}`;

    console.log(txDataUrl);

    try {
      const res = await axios.post(txDataUrl, {
        ...quoteData,
        slippageTolerance: 0.5,
        senderAddress: account,
        receiverAddress: account,
      });
      console.log(res.data);
      return res.data;
    } catch (e) {
      console.error(`Fetching tx data from pathfinder: ${e}`);
    }
  };

  let chainID: { [key: string]: string } = {
    amoy: "80002",
    fuji: "43113",
    holsky: "17000",
  };

  let tokenAddress: { [key: string]: { [key: string]: string } } = {
    aftt: {
      amoy: "0xBAD6e1AbE5EbEae8a123ef14AcA7024D3F8c45fb",
      fuji: "0x69dc97bb33e9030533ca2006ab4cef67f4db4125",
      holsky: "0x5c2c6ab36a6e4e160fb9c529e164b7781f7d255f",
    },
  };

  const extractVariables = async () => {
    const openai = new OpenAI({
      apiKey:
        "",
      dangerouslyAllowBrowser: true,
    });

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Extract the sourceToken, sourceChain, desToken, desChain, and amount from the following sentence. Source Chains can be Holsky, Fuji and Amoy . Similary Destion Chains can be Holsky, Fuji and Amoy. Source and Destination Tokens can be AFTT,USDT, USDC
    "${userQuery}"
    Return the results in the following format:
    {
      "sourceToken": "x",
      "sourceChain": "a",
      "desToken": "y",
      "desChain": "b",
      "amount": "z"
    }`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const result = completion.choices[0].message["content"];
    console.log(result);

    if (result) {
      const variables = JSON.parse(result);
      return variables;
    }

    return null;
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Handle the submission of the query here
  //   if (!accountToken.value) return;
  //   Query(userQuery, accountToken.value);
  //   // Reset the input field
  //   setUserQuery('');
  // };

  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "88vh",
        backgroundColor: "#121212",
      }}
    >
      <Card
        sx={{
          maxWidth: "50%",
          width: "100%",
          backgroundColor: "rgba(18, 18, 18, 0.9)",
          backdropFilter: "blur(10px)",
          color: "white",
          borderRadius: "24px",
          border: "1px solid rgba(0, 188, 212, 0.1)",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              mb: 4,
            }}
            gap={2}
          >
            <Bot size={30} />
            <Typography variant="h4">AI Bot</Typography>
          </Box>

          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              disabled={!accountToken.value}
              helperText={
                !accountToken.value ? "Connect your wallet to chat" : ""
              }
              placeholder="Type your message here..."
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              sx={{
                mb: 4,
                fontSize: "20px",
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "rgba(0, 188, 212, 0.5)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(0, 188, 212, 0.7)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgba(0, 188, 212, 1)",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                },
              }}
            />
            {accountToken.value ? (
              <Button
                type="submit"
                variant="contained"
                disabled={!accountToken.value}
                onClick={async (e) => {
                  e.preventDefault();
                  const variables = await extractVariables();
                  console.log(variables);
                  if (variables) {
                    const {
                      sourceToken,
                      sourceChain,
                      desToken,
                      desChain,
                      amount,
                    } = variables;
                    let resObj = {
                      sourceToken:
                        tokenAddress[`${sourceToken?.toLowerCase()}`][
                          `${sourceChain.toLowerCase()}`
                        ],
                      sourceChain: chainID[`${sourceChain?.toLowerCase()}`],
                      desToken:
                        tokenAddress[`${desToken?.toLowerCase()}`][
                          `${desChain.toLowerCase()}`
                        ],
                      desChain: chainID[`${desChain?.toLowerCase()}`],
                      amount: amount,
                    };
                    console.log(resObj);

                    //Getting the Quote
                    const params = {
                      fromTokenAddress: resObj.sourceToken,
                      toTokenAddress: resObj.desToken,
                      amount: parseFloat(amount) * Math.pow(10, 18),
                      fromTokenChainId: resObj.sourceChain,
                      toTokenChainId: resObj.desChain,
                      partnerId: "0",
                    };

                    console.log(params);

                    const quote = await getQuote(params);
                    setQuoteData(quote);
                    alert(quote.allowanceTo);
                    console.log(quote);

                    //Checking and Setting Allowance
                    if (window.ethereum) {
                      console.log("detected");

                      try {
                        const accounts = await window.ethereum.request({
                          method: "eth_requestAccounts",
                        });

                        console.log(accounts[0]);
                        const provider = new ethers.BrowserProvider(
                          window.ethereum
                        );
                        const signer = await provider.getSigner();

                        console.log("token",resObj.sourceToken);

                        const hash = await checkAndSetAllowance(
                          signer,
                          resObj.sourceToken,
                          quote.allowanceTo,
                          parseFloat(amount),
                        );

                        console.log(hash);

                        //Executing the Transaction
                        const txResponse = await getTransaction(
                          {
                            fromTokenAddress: resObj.sourceToken,
                            toTokenAddress: resObj.desToken,
                            fromTokenChainId: resObj.sourceChain,
                            toTokenChainId: resObj.desChain,
                            widgetId: 0,
                          },
                          quote
                        );

                        console.log(txResponse);

                        const tx = await signer.sendTransaction(txResponse.txn);
                        try {
                          await tx.wait();
                          console.log(
                            `Transaction mined successfully: ${tx.hash}`
                          );
                          alert(`Transaction mined successfully: ${tx.hash}`);
                        } catch (error) {
                          console.log(
                            `Transaction failed with error: ${error}`
                          );
                        }
                      } catch (err) {
                        console.log(err);
                      }
                    }
                  }
                }}
                endIcon={<Send size={18} />}
                sx={{
                  width: "100%",
                  backgroundColor: "#009998",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#007f7b",
                  },
                  py: 0.5,
                  fontSize: "16px",
                }}
              >
                Execute
              </Button>
            ) : (
              <ConnectButton
                variant="contained"
                sx={{
                  py: 1.5,
                  fontSize: "16px",
                  width: "100%",
                }}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default AiBot;
