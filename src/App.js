import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Upvote from 'material-ui/svg-icons/navigation/arrow-upward';
import Dvote from 'material-ui/svg-icons/navigation/arrow-downward';


class App extends Component {
    constructor(props) {
    super(props);

    this.state = {
      posts: [],
      comments: []
    };
  }

  componentDidMount(){
    this.getposts()
  }
  getposts = () => {
    axios.get('https://www.reddit.com/r/all/hot.json?limit=25')
      .then(res => {
        this.setState({ posts: res.data.data.children });
      })
  }
  render() {
    return (
      <div >
        { this.state.posts.map((post, index) =>
          <Card key={index}>
            <CardHeader
              title={post.data.title}
              avatar={post.data.thumbnail}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardActions>
              <FlatButton label="Label before"  primary={true} icon={<Upvote/>}/>
              <FlatButton label="Label before"  primary={true} icon={<Dvote/>}/>
              <FlatButton label={post.data.subreddit} />
              
            </CardActions>
            <CardText expandable={true}>
              <p>Hello</p>
            </CardText>
          </Card>
        )}
      </div>
    );
  }
}

export default App;
