import { Button, Container, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";

export function Home() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          React Demo
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="/todo"
          sx={{ my: 1 }}
        >
          ToDo デモへ
        </Button>
      </Paper>
    </Container>
  );
}
