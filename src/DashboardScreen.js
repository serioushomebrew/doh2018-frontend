import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import deepPurple from '@material-ui/core/colors/deepPurple';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import Badge from '@material-ui/core/Badge';
import Icon from '@material-ui/core/Icon';

import UserAvatar from './components/UserAvatar';
import PostList from './components/PostList';
import AddChallenge from './components/AddChallenge';
import { apiPost } from './api';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  avatar: {
    width: 100,
    height: 100,
    fontSize: 42,
    backgroundColor: deepPurple[500],
    margin: '20px auto',
  },
  verified: {
    display: 'inline-block',
    background: '#29B6F6',
    padding: 5,
    borderRadius: 10,
    height: 10,
    fontSize: 10,
    lineHeight: '10px',
    position: 'relative',
    top: -2,
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  points: {
    display: 'inline-block',
    padding: '4px 16px 6px 16px',
    borderRadius: 20,
    background: green[600],
    color: 'white',
    boxShadow: `0 4px 0 ${green[800]},
    0 5px 10px rgba(0, 0, 0, 0.2)`,
    fontWeight: '900',
  },
  pointsStar: {
    height: 20,
    width: 20,
    position: 'relative',
    top: 3,
    color: yellow[500],
    filter: `drop-shadow(0 2px 0 ${yellow[800]})`,
  },
  skills: {
    // borderTop: 'solid thin rgba(0, 0, 0, 0.2)',
    marginTop: 10,
    marginLeft: -theme.spacing.unit * 2,
    marginRight: -theme.spacing.unit * 2,
    marginBottom: -(theme.spacing.unit * 2) - 1,
  },
  skill: {
    textAlign: 'left',
    padding: theme.spacing.unit * 2,
    borderBottom: 'solid thin rgba(0, 0, 0, 0.2)',
  },
  userCard: {
    overflow: 'hidden',
  },
  fab: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: 20,
    right: 20,
  },
  levelUpBanner: {
    display: 'flex',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

function Skill({ name, classes, bold, ...props }) {
  return (
    <div className={classes.skill}>
      {bold ? <strong>{name}</strong> : name}
    </div>
  );
}

class DashboardScreen extends Component {
  state = {
    addOpen: false,
    levelUpOpen: true,
    profile: {
      name: '',
      points: 0,
      current_level: {
        points: 0,
        id: 1,
      },
      skills: [],
    },
  };

  async componentDidMount() {
    const profile = await apiPost('api/profile?include=current_level,skills', undefined, 'GET');
    this.setState({ profile });
    console.log(profile);
  }

  render() {
    const { addOpen, profile } = this.state;
    const { classes } = this.props;

    let levelUp = null;

    if (profile.current_level.id === 5 && localStorage.getItem('level') !== '5' && this.state.levelUpOpen) {
      localStorage.setItem('level', '5');
      levelUp = (
        <div className={classes.levelUpBanner} onClick={() => this.setState({ levelUpOpen: false })}>
          <div><img src="/assets/Congratz.png" /></div>
        </div>
      );
    }

    return (
      <Grid container spacing={24}>
        <Grid item xs={4}>
          <Paper className={[classes.paper, classes.userCard].join(' ')}>
            <div className={classes.points}><img src="/assets/trophy-yellow.svg" className={classes.pointsStar} /> {profile.points} pt.</div>
            <UserAvatar profile={profile} level={profile.current_level} />
            <h1>{profile.name}</h1>
            <div className={classes.info}>Zoetemeer {/* <span className={classes.verified}>Verified</span> */}</div>
            <div className={classes.skills}>
              <Skill classes={classes} name="Skills:" bold />
              {profile.skills.map(s => <Skill classes={classes} name={s.name} key={s.id} />)}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <PostList profile={profile} />
        </Grid>
        <Button variant="fab" color="primary" aria-label="add" className={classes.fab} onClick={() => this.setState({ addOpen: true })}>
          <Icon>add</Icon>
        </Button>
        <AddChallenge open={addOpen} handleClose={() => this.setState({ addOpen: false })} />
        {levelUp}
      </Grid>
    );
  }
}

DashboardScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardScreen);
