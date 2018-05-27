import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import Trophy from './Trophy';
import Comments from './Comments';
import { apiPost } from '../api';

const styles = theme => ({
  root: {
    margin: -theme.spacing.unit * 3,
    marginBottom: 0,
    marginTop: 0,
    flex: 1,
  },
  actions: {
    margin: theme.spacing.unit * 3,
    marginBottom: 0,
    display: 'flex',
    justifyContent: 'space-between',
  },
  zero: {
    margin: -theme.spacing.unit * 3,
    marginBottom: 0,
  },
  margin: {
    margin: theme.spacing.unit * 3,
    marginBottom: 0,
  },
  listIcon: {
    backgroundColor: 'white',
  },
  agent: {
    display: 'flex',
    alignItems: 'center',
  },
  agentAvatar: {
    width: 140,
    height: 140,
    marginRight: 20,
  },
});

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}


class Post extends Component {
  state = {
    value: 0,
    reaction: '',
    extraComments: [],
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  solve = async o => {
    // api/challenges/${id}/complete
    const formData = new FormData();
    formData.append('user_id', o.user_id);
    const result = await apiPost(`api/challenges/${this.props.item.id}/complete`, formData);
    this.props.onStateChange(this.props.item.id, 'completed')
  }

  async onSubmitMessage(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await apiPost(`api/challenges/${this.props.item.id}/comments`, formData);
    const agent = await apiPost(`api/localOfficer/${response}./6`)

    this.setState({
      extraComments: [...this.state.extraComments, response],
      reaction: '',
    });
  }

  render() {
    const { classes, color, item, hasApplied = true, profile } = this.props;
    const { value } = this.state;

    let isOwn = false;
    if (item.requests && item.requests[0] && item.requests[0].id === profile.id) {
      isOwn = true;
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} style={{background: color}}>
            <Tab label="Description" />
            <Tab label="Data" />
            <Tab label="Reward" />
            {item.agent.data ? <Tab label="Agent" href="#basic-tabs" /> : null }
          </Tabs>
        </AppBar>
        <SwipeableViews

          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer><p>{item.description}</p></TabContainer>
          <TabContainer>
            <div className={classes.zero}>
              <List>
                {item.files.map(o => (
                  <ListItem key={o.id}>
                    <Avatar className={classes.listIcon}>
                      <Icon style={{ color: color }}>attachment</Icon>
                    </Avatar>
                    <ListItemText primary={o.name} secondary={`${o.description || '' } ${o.size}`} />
                  </ListItem>
                ))}
              </List>
            </div>
          </TabContainer>
          <TabContainer>
            <div className={classes.zero}>
              <List>
                <ListItem>
                  <Avatar className={classes.listIcon}>
                    <Trophy color={color} className={classes.pointsStar} />
                  </Avatar>
                  <ListItemText primary={`${item.rewardPoints} Points`} secondary="Receive points for all your effort" />
                </ListItem>
                <ListItem>
                  <Avatar className={classes.listIcon}>
                    <Icon style={{ color: color }}>loyalty</Icon>
                  </Avatar>
                  <ListItemText primary={item.rewardGift} secondary="Receive a present from the requester" />
                </ListItem>
              </List>
            </div>
          </TabContainer>
          {item.agent.data ? (
          <TabContainer>
            <div className={classes.agent}>
              <div>
                <Avatar src={item.agent.data.afbeelding.url.split('acceptatie.').join('')} className={classes.agentAvatar} />
              </div>
              <div>
                <Typography variant="title">{item.agent.data.naam}</Typography>
                <Typography>{item.agent.data.telefoon}</Typography>
                <Typography>@{item.agent.data.twitter.accountnaam}</Typography>
              </div>
            </div>
          </TabContainer>
          ) : null}
        </SwipeableViews>
        <Divider />
        { hasApplied ? (
          <form onSubmit={(e) => this.onSubmitMessage(e)}>
            <Comments isOwner={isOwn} comments={[...item.comments, ...this.state.extraComments]} solve={this.solve.bind(this)} />
            <div className={classes.margin}>
              <TextField
                label="Send reaction"
                onChange={e => this.setState({ reaction: e.target.value })}
                value={this.state.reaction}
                multiline
                fullWidth
                rows={3}
                name="description"
                ref="reaction"
              />
            </div>
            <div className={classes.actions}>
              <span></span>
              <Button className={classes.button} color="primary" type="submit">Send</Button>
            </div>
          </form>
        ) : (
          <div className={classes.actions}>
            <span></span>
            <Button className={classes.button} color="primary">Apply</Button>
          </div>
        )}
      </div>
    );
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Post);

