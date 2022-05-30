import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop(
  "0x2ee4f382130B274Cdaa0A26e58Eb61B07D4e128a"
);

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "DocthereumDAO",
        description: "This NFT will give you access to DocthereumDAO!",
        image: readFileSync("scripts/assets/doc.jpg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
