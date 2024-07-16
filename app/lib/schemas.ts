import { z } from "zod";

export const MemberSchema = z
  .object({
    id: z.string().min(1, { message: "ID is required" }),
    pw: z.string().min(1, { message: "Password is required" }),
    name: z.string().min(1, { message: "Name is required" }),
    confirmPw: z.string().min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.pw === data.confirmPw, {
    message: "Passwords do not match",
    path: ["confirmPw"], // path of error
  });

export type Member = z.infer<typeof MemberSchema>;
