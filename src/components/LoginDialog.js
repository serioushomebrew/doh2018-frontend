import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import { login } from '../api';

const styles = theme => ({

});

class AddChallenge extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(e) {
    e.preventDefault();
    var formData = new FormData(e.target)
    formData.append('reward_points', 200);

    const result = await login(formData.get('email'), formData.get('password'));
    console.log(result);
    if (result.api_token) {
     this.props.onLogin();
    }
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add crime</DialogTitle>
        <form onSubmit={this.onSubmit}>
          <DialogContent>
            <DialogContentText>
              Fill in the form below with as much details as possible. Note: try to not submit personal data.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="email"
              label="Emailaddress"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="password"
              label="Password"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>

            <Button type="submit" color="primary">
              Login
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

AddChallenge.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddChallenge);
