import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import blue from '@material-ui/core/colors/blue';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

import Post from './Post';
import Badge from './Badge';
import { apiPost } from '../api';

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
  },
  tags: {
    position: 'absolute',
    top: -14,
    right: 52,
  },
  tag: {
    background: green[400],
    float: 'right',
    padding: '3px 16px',
    marginLeft: 5,
  },
  tagText: {
    fontSize: 10,
    color: 'white',
  },
  badge: {
    position: 'absolute',
    top: -14,
    right: 32,
  },
  status: {
    display: 'inline-block',
    margin: '0 8px 0 -4px',
    // backgroundColor: green[500],
    width: 12,
    height: 12,
    borderRadius: 12,

  }
});

const colors = {
  Phishing: blue[600],
  Ransomware: green[600],
  Blockchain: yellow[800],
  Privacy: red[600],
  WordPress: blue[600],
  DDoS: green[600],
};

const statusColors = {
  'open': red[600],
  'in review': yellow[800],
  'completed': green[600],
}

class PostList extends Component {
  state = {
    expanded: false,
    items: [],
  };

  async componentDidMount() {
    const items = await apiPost('api/challenges?include=comments,level,skills,reward_points,reward_gift,files,requests,participants', undefined, 'GET');
    const withAgent = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const agent = await apiPost(`api/localOfficer/${item.latitude}/${item.longitude}`, undefined, 'GET');
      withAgent.push(Object.assign({}, item, { agent: agent }));
    }

    this.setState({ items: withAgent.map(o => ({
      id: o.id,
      title: o.name,
      level: o.level.id,
      tags: o.skills.map(o => o.name),
      rewardPoints: o.reward_points,
      rewardGift: o.reward_gift,
      description: o.description,
      files: o.files,
      comments: o.comments,
      requests: o.requests,
      status: o.status_name,
      agent: o.agent,
      // status:
    })) });
    /*
    [{
      id: 1,
      tags: ['Phishing'],
      title: 'Rare e-mail ontvangen van mijn bank',
      level: 1,
      status: 'open',
    }, {
      id: 2,
      tags: ['Blockchain'],
      title: 'Ik heb een bedrag overgemaakt naar een bitcoin adres uit een e-mail.',
      level: 2,
      status: 'in-progress',
    }, {
      id: 3,
      tags: ['Ransomware'],
      title: 'Mijn laptop start niet meer op en moet nu een sleutel kopen.',
      level: 5,
      status: 'done',
    }]
    */
  }

  setItemState(itemId, status) {
    const items = [...this.state.items].map(o => o.id === itemId
      ? Object.assign({}, o, { status })
      : o);
    this.setState({ items, expanded: undefined });
  }

  handleChange = panel => (e, expanded) => this.setState({ expanded: expanded ? panel : false });

  render() {
    const items = this.state.items;

    const { expanded } = this.state;
    const { classes, profile } = this.props;

    return items.map(item => (
      <ExpansionPanel
        expanded={expanded === item.id}
        elevation={expanded === item.id ? 10 : 2}
        key={item.id}
        onChange={this.handleChange(item.id)}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Typography className={classes.heading}>
              <Tooltip title={`Status: ${item.status}`} placement="top">
                <span className={classes.status} style={{ background: statusColors[item.status] }}></span>
              </Tooltip>
              {item.title}
            </Typography>
            <div className={classes.tags}>
              {item.tags.map(o => (
                <span key={o} className={classes.tag} style={{ background: colors[o] }}>
                  <Typography className={classes.tagText}>{o}</Typography>
                </span>
              ))}
            </div>
            <Badge level={item.level} className={classes.badge} />
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Post profile={profile} item={item} color={colors[item.tags[0]]} onStateChange={this.setItemState.bind(this)} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ));
  }
}


PostList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostList);
