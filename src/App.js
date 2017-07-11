import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


import Drawer from 'material-ui/Drawer';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Upvote from 'material-ui/svg-icons/navigation/arrow-upward';
import Comments from 'material-ui/svg-icons/communication/comment';
import Author from 'material-ui/svg-icons/social/person';


class App extends Component {
    constructor(props) {
    super(props);

    this.state = {
      posts: [],
      comments: [],
      subposts: [],
      subreddits: ["all", "soccer", "askreddit", "videos"],
      subopen: false
    };
  }

  componentDidMount(){
    this.getposts()
  }
  openmenu = () => this.setState({subopen: !this.state.subopen})
  getposts = () => {
    axios.get('https://www.reddit.com/r/all/hot.json?limit=25')
      .then(res => {
        this.setState({ posts: res.data.data.children });
      })
  }
  getpostsmenu = (sub) => {
    this.setState({subopen: false})
    axios.get("https://www.reddit.com/r/"+sub+"/hot.json?limit=25")
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
    this.setState({comments: []})
    axios.get("https://www.reddit.com/r/"+ sub + "/comments/"+ post +".json")
      .then(res => {
        this.setState({ comments: res.data[1].data.children });
      })
  }
  getuser = (user) => {
    this.setState({posts: []})
    axios.get("https://www.reddit.com/user/"+ user + ".json?sort=top")
      .then(res => {
        this.setState({ posts: res.data.data.children });
      })
  }
  render() {
    return (
      <div >
        <AppBar title="RedditLite" onLeftIconButtonTouchTap={this.openmenu}/>
        <Drawer open={this.state.subopen} >
          {this.state.subreddits.map((sub, index)=> <MenuItem onClick={()=>{this.getpostsmenu(sub)}}>{sub}</MenuItem>)}
        </Drawer>
        { this.state.posts.map((post, index) =>
          <Card key={index} onExpandChange={() => {this.getcomments(post.data.subreddit, post.data.id)}} >
            <CardHeader
              title={post.data.title}
              avatar={post.data.thumbnail}
            />
            
              <FlatButton label={post.data.score}  disabled={true} icon={<Upvote/>}/>
              <FlatButton label={post.data.num_comments} actAsExpander={true}  icon={<Comments/>} onClick={() => {this.getcomments(post.data.subreddit, post.data.id)}}/>
              <FlatButton label={post.data.subreddit} onClick={()=>{this.getsubposts(post.data.subreddit)}}/>
              <FlatButton label={post.data.author}  onClick={()=>{this.getuser(post.data.author)}} icon={<Author/>}/>
            
            <CardText expandable={true}>
              <div className="commentscroll"> 
                {this.state.comments.map((comment, index) =>
                  
                    <p key={index}>{comment.data.body}</p>
                      
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
