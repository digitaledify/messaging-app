import { useEffect, useState } from "react";
import { Text, Image, Box } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { Control, useController } from "react-hook-form";
import { UpdateUserData } from "../lib/zod-schemas";
import { encodeImageFileAsURL } from "../lib/files";

type UploadAvatarProps = {
  control: Control<UpdateUserData>;
  name: keyof UpdateUserData;
};

function UploadAvatar(props: UploadAvatarProps) {
  const { field } = useController({
    name: props.name,
    control: props.control,
  });

  const [files, setFiles] = useState<FileWithPath[]>([]);

  useEffect(() => {
    if (files.length === 0) {
      return;
    }
    
    const updateImageValue = async () => {
      const file = files[0];
      field.onChange(await encodeImageFileAsURL(file));
    };

    updateImageValue();
  }, [files]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        width={200}
        height={200}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });

  return (
    <div>
      <Dropzone
        maxFiles={1}
        ref={field.ref}
        accept={IMAGE_MIME_TYPE}
        onDrop={setFiles}
      >
        <Text align="center">Drop images here</Text>
      </Dropzone>

      <Box mt={"md"}>{previews}</Box>
    </div>
  );
}

export default UploadAvatar;
