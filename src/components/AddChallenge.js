import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { apiPost } from '../api';

const styles = theme => ({
  formControl: {
    width: '100%',
  }
});

class AddChallenge extends Component {
  state = {
    skills: [],
    skill: '',
  }

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    const skills = await apiPost('api/skills', undefined, 'GET');
    this.setState({ skills });
  }

  async onSubmit(e) {
    e.preventDefault();
    var formData = new FormData(e.target)
    formData.append('reward_points', 200);
    formData.append('skills[]', this.state.skill);

    const result = await apiPost('api/challenges', formData);
    this.props.handleClose();
    document.location.reload();
  }

  handleSkillChange = event => {
    this.setState({ skill: event.target.value });
  };

  render() {
    const { classes } = this.props;

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
              name="name"
              label="Title"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={4}
            />
            <TextField
              autoFocus
              margin="dense"
              name="house_number"
              label="House number"
              fullWidth
            />

            <TextField
              autoFocus
              margin="dense"
              name="postal_code"
              label="Postal code"
              fullWidth
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">Required skill</InputLabel>
              <Select
                value={this.state.skill}
                onChange={this.handleSkillChange}
                inputProps={{
                  name: 'skill',
                  id: 'skill',
                }}
              >
                {this.state.skills.map(s => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Create
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
