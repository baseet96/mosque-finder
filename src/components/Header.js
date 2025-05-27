import { Typography, Container, Box } from "@mui/material";

function Header() {
  const header = "Mosque Finder";

  return (
    <>
      <Container>
        <Box padding={5} align="center">
          <Typography variant="h3">{header}</Typography>
        </Box>
      </Container>
    </>
  );
}

export default Header;
