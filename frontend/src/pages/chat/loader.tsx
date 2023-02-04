import { LoaderFunction } from "react-router-dom";
import { z } from "zod";
import http from "../../lib/http";

const ChatPageParamsSchema = z.object({
  usernameOrChannelName: z.string().min(1),
});

export type ChatPageParams = z.infer<typeof ChatPageParamsSchema>;

export const loader: LoaderFunction = async ({ params }) => {
  const validated_params = ChatPageParamsSchema.parse(params);
  const res = await http.get(
    `/users/${validated_params.usernameOrChannelName}`
  );

  return res.data;
};
