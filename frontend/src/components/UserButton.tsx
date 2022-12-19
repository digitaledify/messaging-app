import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  user: {
    display: "flex",
    width: "100%",
    height: 80,
    alignItems: "center",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

interface UserButtonProps extends UnstyledButtonProps {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

export function UserButton({
  image,
  name,
  email,
  icon,
  ...others
}: UserButtonProps) {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.user} h={80} {...others}>
      <Group>
        <Avatar src={image} radius="xl" />
        <div>
          <Text variant="gradient" size="lg" weight={"bold"}>
            Live Chat
          </Text>

          <Text color="dimmed" size="xs">
            Stay connected in real time!
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  );
}
