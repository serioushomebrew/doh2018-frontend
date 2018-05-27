import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import deepPurple from '@material-ui/core/colors/deepPurple';

const styles = theme => ({
  wrapper: {
    position: 'relative',
  },
  badge: {
    width: 30,
    height: 30,
    backgroundColor: '#222',
    borderTop: 'solid 15px #0a1935',
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: 15,
    zIndex: 1,
  },
  verified: {
    boxShadow: '0 -3px 0 #29B6F6',
  },
  avatar: {
    width: 100,
    height: 100,
    fontSize: 42,
    backgroundColor: deepPurple[500],
    margin: '20px auto',
  }
});

function UserAvatar({ classes, profile, level, ...props }) {
  console.log(level);
  return (
    <div className={classes.wrapper}>
      <div className={[
        classes.badge,
        classes.verified,
      ].join(' ')}><img src={`/assets/rank_${level.id}.svg`} /></div>
      <Avatar className={classes.avatar} src={`https://randomuser.me/api/portraits/men/${profile.id}.jpg`}></Avatar>
    </div>
  );
}

export default withStyles(styles)(UserAvatar);
