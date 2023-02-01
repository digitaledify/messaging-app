import { Paper, TextInput, Button, Center, Input, Stack } from "@mantine/core";
import UploadAvatar from "../components/UploadAvatar";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserData, UpdateUserSchema } from "../lib/zod-schemas";
import { useMutation } from "@tanstack/react-query";
import QueryKeys from "../lib/query-keys";
import useAuth from "../hooks/useAuth";
import http from "../lib/http";
import { AuthState } from "../types";
import { AxiosResponse } from "axios";

function Me() {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateUserData>({
    resolver: zodResolver(UpdateUserSchema),
  });
  const auth = useAuth();

  const mutation = useMutation({
    mutationKey: [QueryKeys.users.update_user, auth.user?.username],
    mutationFn: async (data: UpdateUserData) => {
      const res = await http.post<
        UpdateUserData,
        AxiosResponse<Required<AuthState>>
      >("/users", data);
      return res.data;
    },
    onSuccess: (data) => {
      auth.signIn(data);
    },
  });

  const onSubmit = (data: UpdateUserData) => {
    mutation.mutate(data);
  };
  return (
    <Center h={"100%"}>
      <form>
        <Paper miw={500} withBorder shadow="md" p={30} radius="md">
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack dir="vertical" spacing={"xs"}>
              <TextInput
                {...register("name")}
                error={errors.name?.message}
                label="Name"
                placeholder="Your Name"
                required
              />
              <TextInput
                {...register("username")}
                error={errors.email?.message}
                label="Username"
                placeholder="mantine"
                required
              />
              <TextInput
                {...register("email")}
                error={errors.email?.message}
                label="Email"
                placeholder="you@mantine.dev"
                required
              />
              <Input.Wrapper label="Avatar image">
                <UploadAvatar control={control} name='avatar' />
              </Input.Wrapper>
            </Stack>
            <Button type="submit" fullWidth mt="xl">
              Update
            </Button>
          </form>
        </Paper>
      </form>
    </Center>
  );
}

export default Me;
