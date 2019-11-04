import React from "react";
import Box from '@material-ui/core/Box';
import { styled as materialStyled } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const FontStyleComponent = materialStyled(Box)({
  fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
});



const ProfileImage = (name: string) => {
    return (
      <Box m={3} display="flex" flexDirection="column" alignItems="center">
        <Box><AccountCircleIcon/></Box>
        <Box>{name}</Box>
      </Box>
    )
}

const names = ['Alexander Jones', 'Daniel Brockwell', 'Guy Segev', 'Mitchell Shelton'];

const AboutUsPage = () => {
    return (
      <FontStyleComponent p={3}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box><h1>Who the heck are these guys?</h1></Box>
        <Box display="flex" flexDirection="row">
          {names.map(ProfileImage)}
        </Box>
      </Box>
      </FontStyleComponent>
    )
}
export default AboutUsPage;