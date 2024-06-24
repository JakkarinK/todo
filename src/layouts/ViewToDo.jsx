import { Box, Container } from "@mui/material";
import React from "react";

const ViewToDo = ({ children }) => {
  return (
    <>
      <Box
        bgcolor={"#0f1214"}
        height={"100vh"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Container>
          <Box bgcolor={"white"} borderRadius={3} sx={{p:{xs: "2rem 1rem", mobile:5}}}>
            {children}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ViewToDo;
