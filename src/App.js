import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import DashboardScreen from './DashboardScreen';
import LoginDialog from './components/LoginDialog';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  app: {
    marginTop: theme.spacing.unit * 2,
    flexGrow: 1,
    maxWidth: 1200,
    margin: '0 auto',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function findGetParameter(parameterName) {
  var result = null,
      tmp = [];
  document.location.search
      .substr(1)
      .split("&")
      .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      });
  return result;
}

class ButtonAppBar extends Component {
  state = {
    isLoggedIn: findGetParameter('token') ? true : false,
  };

  render() {
    const props = this.props;
    const { classes } = props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Politie Community
            </Typography>
            <Button color="inherit" onClick={() => localStorage.clear()}>Logout</Button>
          </Toolbar>
        </AppBar>
        <div className={classes.app}>
          {this.state.isLoggedIn ? <DashboardScreen /> : null}
        </div>
        <LoginDialog open={!this.state.isLoggedIn} onLogin={() => this.setState({ isLoggedIn: true })} />
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
