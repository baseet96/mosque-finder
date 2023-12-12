import { Typography, Container, Box } from "@mui/material";

function Header(props) {
  return (
    <>
      <Container>
        <Box padding={5} align="center">
          <Typography variant="h3">{props.header}</Typography>
        </Box>
      </Container>
    </>
  );
}

export default Header;
