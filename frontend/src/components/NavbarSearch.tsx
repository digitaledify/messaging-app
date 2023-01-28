import {
  createStyles,
  Navbar,
  TextInput,
  Code,
  UnstyledButton,
  Badge,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  ScrollArea,
  Title,
  NavLink,
  Anchor,
} from "@mantine/core";
import {
  IconBulb,
  IconUser,
  IconCheckbox,
  IconSearch,
  IconPlus,
  IconMessageCircle,
} from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getUsersList } from "../lib/api/users";
import QueryKeys from "../lib/query-keys";
import { ColorSchemeToggle } from "./ColorSchemeToggle";

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
  },

  section: {
    // marginLeft: -theme.spacing.md,
    // marginRight: -theme.spacing.md,
    marginBottom: theme.spacing.md,

    "&:not(:last-of-type)": {
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  },

  searchCode: {
    fontWeight: 700,
    fontSize: 10,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },

  mainLinks: {
    paddingLeft: theme.spacing.md - theme.spacing.xs,
    paddingRight: theme.spacing.md - theme.spacing.xs,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: theme.fontSizes.xs,
    padding: `8px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: 20,
    height: 20,
    pointerEvents: "none",
  },

  collections: {
    paddingLeft: theme.spacing.md - 6,
    paddingRight: theme.spacing.md - 6,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: theme.spacing.md + 2,
    paddingRight: theme.spacing.md,
    marginBottom: 5,
  },

  collectionLink: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.xs,
    padding: `8px ${theme.spacing.xs}px`,
    textDecoration: "none",
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.md,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

const links = [
  { icon: IconBulb, label: "Bot", notifications: 3, to: "/bot" },
  {
    icon: IconCheckbox,
    label: "Notifications",
    notifications: 4,
    to: "/notifications",
  },
  { icon: IconUser, label: "You", to: "/me" },
];

export function NavbarSearch() {
  const { classes } = useStyles();
  const usersQuery = useQuery({
    queryKey: [QueryKeys.users.users_list],
    queryFn: getUsersList,
    suspense: true,
  });

  const mainLinks = links.map((link) => (
    <UnstyledButton
      component={Link}
      to={link.to}
      key={link.label}
      className={classes.mainLink}
    >
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        <span>{link.label}</span>
      </div>
      {link.notifications && (
        <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
          {link.notifications}
        </Badge>
      )}
    </UnstyledButton>
  ));

  const collectionLinks = usersQuery.isSuccess
    ? usersQuery.data.map((user) => (
        <Text
          component={Link}
          to={`/chat/${user.username}`}
          // onClick={(event) => event.preventDefault()}
          key={user.email}
          className={classes.collectionLink}
        >
          <span>{user.name}</span>
          <Text size={"xs"} color="dimmed">
            {user.email}
          </Text>
        </Text>
      ))
    : [];

  const userLinks = usersQuery.isSuccess
    ? usersQuery.data.map((user) => (
        <a
          href="/"
          onClick={(event) => event.preventDefault()}
          key={user.email}
          className={classes.collectionLink}
        >
          <span>{user.name}</span>
          <Text size={"xs"} color="dimmed">
            {user.email}
          </Text>
        </a>
      ))
    : [];

  return (
    <Navbar width={{ sm: 300 }} className={classes.navbar}>
      <Navbar.Section className={classes.section}>
        <Group px={"md"} h={80} position="apart">
          <Group spacing={"xs"}>
            <IconMessageCircle size={"40"} />
            <Title variant="gradient" fw={"bold"} ff="monospace" order={1}>
              CHAT
            </Title>
          </Group>
          <ColorSchemeToggle />
        </Group>
      </Navbar.Section>

      <TextInput
        placeholder="Search"
        size="xs"
        px={"md"}
        icon={<IconSearch size={12} stroke={1.5} />}
        rightSectionWidth={70}
        rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
        styles={{ rightSection: { pointerEvents: "none" } }}
        mb="sm"
      />

      <Navbar.Section className={classes.section}>
        <div className={classes.mainLinks}>{mainLinks}</div>
      </Navbar.Section>

      <ScrollArea type="never">
        <Navbar.Section className={classes.section}>
          <Group className={classes.collectionsHeader} position="apart">
            <Text size="xs" weight={500} color="dimmed">
              Channels
            </Text>
            <Tooltip label="Create collection" withArrow position="right">
              <ActionIcon variant="default" size={18}>
                <IconPlus size={12} stroke={1.5} />
              </ActionIcon>
            </Tooltip>
          </Group>
          <div className={classes.collections}>{collectionLinks}</div>
        </Navbar.Section>

        <Navbar.Section className={classes.section}>
          <Group className={classes.collectionsHeader} position="apart">
            <Text size="xs" weight={500} color="dimmed">
              Direct messages
            </Text>
            <Tooltip label="Create collection" withArrow position="right">
              <ActionIcon variant="default" size={18}>
                <IconPlus size={12} stroke={1.5} />
              </ActionIcon>
            </Tooltip>
          </Group>
          <div className={classes.collections}>{userLinks}</div>
        </Navbar.Section>
      </ScrollArea>
    </Navbar>
  );
}
