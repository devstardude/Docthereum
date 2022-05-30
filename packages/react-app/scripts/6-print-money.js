import sdk from "./1-initialize-sdk.js";

// This is the address of our ERC-20 contract printed out in the step before.
const token = sdk.getToken("0x0bF6B76D61a31402Fe20e2EdAcBb816DcAE00b21");
const toAddress = "0x4e7F3145Fd18c86b13B651F92f2aD7C93a566CA4";
(async () => {
  try {
    // What's the max supply you want to set? 1,000,000 is a nice number!
    const amount = 1000000;
    // Interact with your deployed ERC-20 contract and mint the tokens!
    await token.mintTo(toAddress, amount);
    const totalSupply = await token.totalSupply();

    // Print out how many of our token's are out there now!
    console.log(
      "✅ There now is",
      totalSupply.displayValue,
      "$DOC in circulation"
    );
  } catch (error) {
    console.error("Failed to print money", error);
  }
})();
