import { Box, Text, ScrollArea, Group, Stack, Card } from "@mantine/core";

function Comments() {
  return (
    <ScrollArea
      sx={{
        height: "100%",
      }}
    >
      <Stack spacing={"xs"}>
        <Card
          shadow={"sm"}
          withBorder
          radius={"md"}
          w={"60%"}
          mr="auto"
          sx={(theme) => ({
            background: theme.colors.blue[9],
            color: theme.white,
          })}
        >
          <Card.Section>
            <Text
              sx={(theme) => ({
                padding: theme.spacing.xs,
                borderRadius: theme.radius.md,
                width: "60%",
              })}
              size="sm"
            >
              Dolor est nulla culpa eu occaecat amet culpa excepteur velit sint.
              Tempor esse pariatur ad aliqua consectetur ullamco et.
            </Text>
            <Text
              color={"dimmed"}
              sx={(theme) => ({
                color: theme.white,
              })}
              size="xs"
              p={"xs"}
            >
              23:23 Sent
            </Text>
          </Card.Section>
        </Card>
        <Card shadow={"sm"} radius={"md"} withBorder w={"60%"} ml="auto">
          <Card.Section>
            <Text
              sx={(theme) => ({
                // background: theme.colors.blue[9],
                color:
                  theme.colorScheme === "light" ? theme.black : theme.white,
                padding: theme.spacing.xs,
                borderRadius: theme.radius.md,
                width: "60%",
              })}
              size="sm"
            >
              Dolor est nulla culpa eu occaecat amet culpa excepteur velit
              cupidatat proident ut quis aliqua. Esse ad nostrud nulla sint
            </Text>
            <Text color={"dimmed"} size="xs" p={"xs"}>
              23:23 Sent
            </Text>
          </Card.Section>
        </Card>
        <Card shadow={"sm"} radius={"md"} withBorder w={"60%"} ml="auto">
          <Card.Section>
            <Text
              sx={(theme) => ({
                // background: theme.colors.blue[9],
                color:
                  theme.colorScheme === "light" ? theme.black : theme.white,
                padding: theme.spacing.xs,
                borderRadius: theme.radius.md,
                width: "60%",
              })}
              size="sm"
            >
              Dolor est nulla culpa eu occaecat amet culpa excepteur velit
              cupidatat proident ut quis aliqua. Esse ad nostrud nulla sint
              occaecat laborum officia. Fugiat velit nulla velit sit. Do anim
              proident id reprehenderit occaecat commodo cillum id adipisicing
              in culpa amet. Nostrud non consequat irure exercitation duis magna
              sint. Tempor esse pariatur ad aliqua consectetur ullamco et.
            </Text>
            <Text color={"dimmed"} size="xs" p={"xs"}>
              23:23 Sent
            </Text>
          </Card.Section>
        </Card>
        <Card
          shadow={"sm"}
          withBorder
          w={"60%"}
          mr="auto"
          radius={"md"}
          sx={(theme) => ({
            background: theme.colors.blue[9],
            color: theme.white,
          })}
        >
          <Card.Section>
            <Text
              sx={(theme) => ({
                padding: theme.spacing.xs,
                borderRadius: theme.radius.md,
                width: "60%",
              })}
              size="sm"
            >
              Dolor est nulla culpa eu occaecat amet culpa excepteur velit
            </Text>
            <Text
              color={"dimmed"}
              sx={(theme) => ({
                color: theme.white,
              })}
              size="xs"
              p={"xs"}
            >
              23:23 Sent
            </Text>
          </Card.Section>
        </Card>
        <Card shadow={"sm"} radius={"md"} withBorder w={"60%"} ml="auto">
          <Card.Section>
            <Text
              sx={(theme) => ({
                // background: theme.colors.blue[9],
                color:
                  theme.colorScheme === "light" ? theme.black : theme.white,
                padding: theme.spacing.xs,
                borderRadius: theme.radius.md,
                width: "60%",
              })}
              size="sm"
            >
              Dolor est nulla culpa eu occaecat amet culpa excepteur velit
              cupidatat proident ut quis aliqua. Esse ad nostrud nulla sint
              occaecat laborum officia. Fugiat velit nulla velit sit. Do anim
              proident id reprehenderit occaecat commodo cillum id adipisicing
              in culpa amet. Nostrud non consequat irure exercitation duis magna
              sint. Tempor esse pariatur ad aliqua consectetur ullamco et.
            </Text>
            <Text color={"dimmed"} size="xs" p={"xs"}>
              23:23 Sent
            </Text>
          </Card.Section>
        </Card>
        <Card
          shadow={"sm"}
          withBorder
          w={"60%"}
          mr="auto"
          radius={"md"}
          sx={(theme) => ({
            background: theme.colors.blue[9],
            color: theme.white,
          })}
        >
          <Card.Section>
            <Text
              sx={(theme) => ({
                padding: theme.spacing.xs,
                borderRadius: theme.radius.md,
                width: "60%",
              })}
              size="sm"
            >
              Dolor est nulla culpa eu occaecat amet culpa excepteur velit
              cupidatat proident ut quis aliqua. Esse ad nostrud nulla sint
              sint. Tempor esse pariatur ad aliqua consectetur ullamco et.
            </Text>
            <Text
              color={"dimmed"}
              sx={(theme) => ({
                color: theme.white,
              })}
              size="xs"
              p={"xs"}
            >
              23:23 Sent
            </Text>
          </Card.Section>
        </Card>
        <Card
          shadow={"sm"}
          withBorder
          w={"60%"}
          mr="auto"
          radius={"md"}
          sx={(theme) => ({
            background: theme.colors.blue[9],
            color: theme.white,
          })}
        >
          <Card.Section>
            <Text
              sx={(theme) => ({
                padding: theme.spacing.xs,
                borderRadius: theme.radius.md,
                width: "60%",
              })}
              size="sm"
            >
              Dolor est nulla culpa eu occaecat amet culpa excepteur velit
              cupidatat proident ut quis aliqua. Esse ad nostrud nulla sint
              occaecat laborum officia. Fugiat velit nulla velit sit. Do anim
              proident id reprehenderit occaecat commodo cillum id adipisicing
              in culpa amet. Nostrud non consequat irure exercitation duis magna
              sint. Tempor esse pariatur ad aliqua consectetur ullamco et.
            </Text>
            <Text
              color={"dimmed"}
              sx={(theme) => ({
                color: theme.white,
              })}
              size="xs"
              p={"xs"}
            >
              23:23 Sent
            </Text>
          </Card.Section>
        </Card>
      </Stack>
    </ScrollArea>
  );
}

export default Comments;
