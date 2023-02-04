import { Alert } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons";

function GenericError() {
  return (
    <Alert icon={<IconAlertTriangle />} color={"red"}>
      Something went wrong!
    </Alert>
  );
}

export default GenericError;
