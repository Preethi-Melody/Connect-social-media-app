import { Outlet } from "react-router-dom";
import { CircularProgress, Container } from "@mui/material";
import NavBar from "./NavBar";
import SearchDrawer from "./SearchDrawer";

const Layout = ({ props }) => {
    return (
        <div style={{ display: "flex" }}>
          <NavBar
            user={props.CircularProgressuser}
            setUser={props.setUser}
            setLoad={props.setLoad}
            toggleDrawer={props.toggleDrawer}
          />
          <div
            style={{
              height: "100vh",
              width: "calc(100vw - 70px)",
              overflow: "auto",
            }}
          >
            {props.load && (
              <div
                style={{
                  height: "100vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </div>
            )}
            <Container
              style={{
                paddingTop: !props.load ? "20px" : "0px",
                paddingBottom: !props.load ? "20px" : "0px",
                boxSizing: "border-box",
                minHeight: !props.load ? "100vh" : "0px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SearchDrawer drawerOpen={props.drawerOpen} drawerToggle={props.toggleDrawer} />
              <Outlet />
            </Container>
          </div>
        </div>
      );
}