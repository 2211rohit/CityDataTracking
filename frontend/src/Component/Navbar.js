import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


export default class ButtonAppBar extends React.Component {
  render(){
    return (
      <div className="">
        <AppBar position="static">
          <Toolbar>
                <Link to="/">
                    <Typography variant="h6" className="text-white">
                        Home
                    </Typography>
                </Link>
                <div className="ml-5">
                    <Link to="/addcountry">
                        <Button color="inherit" className="text-white"><AddCircleOutlineIcon /> Add Country</Button>
                    </Link>

                    <Link to="/addcity">
                        <Button color="inherit" className="text-white"><AddCircleOutlineIcon /> Add City Data</Button>
                    </Link>
                </div>

            </Toolbar>
        </AppBar>
      </div>
    );
  }
}