import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Box } from "@chakra-ui/react";

function Layout() {
  return (
    <>
      <Header />
      <Box as="main">
        <Outlet />
      </Box>
    </>
  );
}

export default Layout;
