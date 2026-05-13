import useFormBuilder from "@hooks/useFormBuilder";
import { Box, FormLabel, Stack } from "@mui/material";
import type { FormField } from "@type/formItem";
import React from "react";

interface FormPreviewProps {
  formFields: FormField[];
}

export default function FormPreview({ formFields }: FormPreviewProps) {
  const { formComponents } = useFormBuilder();
  return (
    <Stack spacing={2}>
      {formFields.map((field) => (
        <Box key={field.id}>
          {field.type === "group" && field.childItems && (
            <Box key={field.id} sx={{ ml: 2 }}>
              <FormLabel sx={{ fontWeight: "bold" }}>
                {field?.settings.label}
              </FormLabel>
              <Stack spacing={2}>
                {field.childItems.map((childField) => (
                  <Box key={childField.id}>
                    <FormPreview formFields={[childField]} />
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
          {field.type !== "group" && (
            <Box key={field.id}>
              {React.cloneElement(formComponents[field.type], {
                item: field,
                fullWidth: true,
              })}
            </Box>
          )}
        </Box>
      ))}
    </Stack>
  );
}
