import { LoaderFunction } from "react-router-dom";
import { z } from "zod";
import http from "../../lib/http";

export const loader: LoaderFunction = async ({ params }) => {
  const { channelName, username } = params;

  if (channelName) {
    throw new Error("not implemented yet", {
      cause: channelName,
    });
  }

  const res = await http.get(`/users/${z.string().parse(username)}`);
  return res.data;
};
