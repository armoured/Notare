import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import { styled as materialStyled } from "@material-ui/core/styles";
import { ORANGE_COLOR } from "../colorConstants";
import Navbar from "../components/Navbar";

const FontStyleComponent = materialStyled(Box)({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
});

export const Home = () => <h1></h1>;

interface Props {}

class HomePage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const email = localStorage.getItem("email") || "";
    const username = email.substring(0, email.indexOf("@"));
    return (
      <FontStyleComponent>
        <Navbar username={username}/>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box>
            <h1>
              What if you could take notes <i>on YouTube?</i>
            </h1>
          </Box>
          <Box style={{ color: ORANGE_COLOR }}>
            <h3>
              Meet Notare, a free Google Chrome extension made by sutdents to
              help make learning online easier.
            </h3>
          </Box>
          <Box mt={3}>
            <Button variant="contained" color="secondary">
              Try Notare Now <GetAppIcon />
            </Button>
          </Box>
          <Box mt={6}>
            WARNING: May contain blood, sweat and tears from the following
            individuals:
          </Box>
          <Box>
            <b>
              Alexander Jones | Daniel Brockwell | Guy Segev | Mitchell Shelton
            </b>
          </Box>
        </Box>
      </FontStyleComponent>
    );
  }
}

export default HomePage;
