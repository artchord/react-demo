import { Alert, Box, Typography } from "@mui/material";

interface InfoBoxProps {
  title: string;
  children: React.ReactNode;
}

export default function InfoBox({ title, children }: InfoBoxProps) {
  return (
    <Alert
      severity="info"
      icon={false}
      sx={{ p: 2, bgcolor: "grey.50", border: "1px solid grey" }}
    >
      <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      <Box sx={{ m: 0, typography: "body2" }}>{children}</Box>
    </Alert>
  );
}
