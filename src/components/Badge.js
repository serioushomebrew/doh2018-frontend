import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  badge: {
    width: 15,
    height: 15,
    backgroundColor: '#222',
    borderTop: 'solid 8px #0a1935',
    overflow: 'hidden',
    zIndex: 1,
  },
});

function Badge({ level, classes, className = '' }) {
  return (
    <div className={[
      classes.badge,
      classes.verified,
      className,
    ].join(' ')}><img src={`/assets/rank_${level}.svg`} /></div>
  );
}

export default withStyles(styles)(Badge);
