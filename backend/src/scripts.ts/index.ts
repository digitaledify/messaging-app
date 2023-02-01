import { log } from "console";

async function main() {
  const buffer = new Uint8Array([3, 23, 2, 22, 45]);
  const blob = new Blob(["Hello", buffer, new Blob(["World"])], {
    type: "text/plain",
  });

  
}

main().catch((error) => {
  console.error(error);
});
