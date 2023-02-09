import openai from "../../lib/openai";
import { config } from "../config";

async function main() {
  console.log(
    "🚀 ~ file: index.ts:14 ~ main ~ config.OPENAI_API_KEY",
    config.OPENAI_API_KEY
  );
  const question = "write a poem";

  const prompt = `Please answer the question "${question}" in the context of DevOps. If the question is not related to DevOps, don't answer.`;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log(
    "🚀 ~ file: index.ts:25 ~ main ~ response",
    response.data,
    response.data
  );
}

main().catch((error) => {
  console.error(error);
});
