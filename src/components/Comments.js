import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 3,
    display: 'flex',
    flexDirection: 'column',
  },
  comment: {
    background: '#efefef',
    alignSelf: 'flex-end',
    padding: 5,
    borderRadius: 5,
    marginTop: 3,
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    margin: '-10px 0 -10px 5px'
  }
});

function Comments(props) {
  const { classes, isOwner } = props;
  const comments = (props.comments || []).map(o => (
    <div key={o.id} className={classes.comment} style={{ alignSelf: o.is_own ? 'flex-end' : 'flex-start' }}>
      <Typography>{o.description}</Typography>
      {isOwner && !o.is_own ? (
        <IconButton size="small" color="secondary" className={classes.button} aria-label="Mark as solved" onClick={() => props.solve(o)}>
          <Icon>check</Icon>
        </IconButton>
      ) : null}
    </div>
  ))
  return (
    <div className={classes.root}>
      {comments}
    </div>
  );
}

export default withStyles(styles)(Comments);
