import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Upvote from 'material-ui/svg-icons/navigation/arrow-upward';
import Comments from 'material-ui/svg-icons/communication/comment';


class App extends Component {
    constructor(props) {
    super(props);

    this.state = {
      posts: [],
      comments: [],
      subposts: []
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
  getsubposts = (sub) => {
    axios.get("https://www.reddit.com/r/"+ sub + "/hot.json?limit=25")
      .then(res => {
        this.setState({ posts: res.data.data.children });
      })
  }
  getcomments = (sub, post) => {
    axios.get("https://www.reddit.com/r/"+ sub + "/comments/"+ post +".json")
      .then(res => {
        this.setState({ comments: res.data[1].data.children });
      })
  }
  render() {
    return (
      <div >
        { this.state.posts.map((post, index) =>
          <Card key={index} onClick={() => {this.getcomments(post.data.subreddit, post.data.id)}}>
            <CardHeader
              title={post.data.title}
              avatar={post.data.thumbnail}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardActions>
              <FlatButton label={post.data.score}  disabled={true} icon={<Upvote/>}/>
              <FlatButton label={post.data.num_comments}  disabled={true} icon={<Comments/>}/>
              <FlatButton label={post.data.subreddit} onClick={()=>{this.getsubposts(post.data.subreddit)}}/>
            </CardActions>
            <CardText expandable={true}>
              <div className="commentscroll"> 
                {this.state.comments.map((comment, index) =>
                  
                    <p>{comment.data.body}</p>
                  
                )}
              </div>
            </CardText>
          </Card>
        )}
      </div>
    );
  }
}

export default App;
