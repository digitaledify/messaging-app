import { NotificationProps } from "@mantine/notifications";
import { z } from "zod";
import {
  ChatTypeSchema,
  MessagesPaginationCursorSchema,
  ResetPasswordSchema,
  UpdateUserSchema,
} from "../lib/zod-schemas";

export interface AuthState {
  user?: User;
  token?: string;
}

export interface User {
  name: string;
  email: string;
  username: string;
  avatar?: string;
}

export interface APIError {
  error: string | { message: string } | string[] | { message: string }[];
}

export type NotificationType = "success" | "info" | "warning" | "error";

export interface ShowNotificationOptions extends NotificationProps {
  type: NotificationType;
}

export type UpdateUserData = z.infer<typeof UpdateUserSchema>;

export type PasswordResetData = z.infer<typeof ResetPasswordSchema>;

export type Message = {
  id: string;
  text: string;
  toUsername: string | null;
  fromUsername: string;
  time: Date;
  channelName: string | null;
};

export type ChatType = z.infer<typeof ChatTypeSchema>;

export type MessagesPaginationCursor = z.infer<
  typeof MessagesPaginationCursorSchema
>;
