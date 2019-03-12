import React, { Component } from 'react'; //import React Component
import Moment from 'react-moment';
import './Chirper.css'; //load module-specific CSS
import firebase from 'firebase/app';
import 'firebase/database'; 


//A list of chirps that have been posted
export default class ChirpList extends Component {
  constructor(props){
    super(props);
    this.state = {chirps:[]};
  }

  componentDidMount() {
    this.chirpsRef = firebase.database().ref('chirps');

    this.chirpsRef.on('value', (snapshot) => {
      let value = snapshot.val();
      this.setState({chirps: value});
    });
  }

  componentWillUnmount() {
    this.chirpsRef.off();
  }

  render() {
    if(!this.state.chirps) return null; //if no chirps, don't display

    /* TODO: produce a list of `<ChirpItems>` to render */
    let chirpKeys = Object.keys(this.state.chirps);
    let mappedKeys = chirpKeys.map((key) => {
      let chirpObj = this.state.chirps[key];
      chirpObj.id = key;
      return chirpObj;
    })

    mappedKeys.sort(function(a,b){
      // Access timestamps, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return b.time - a.time;
    });

    let chirpItems = mappedKeys.map((chirpObj) => {
      return <ChirpItem chirp={chirpObj} currentUser={this.props.currentUser} key={chirpObj.id} />   
    });

    return (
      <div className="container">
          {chirpItems}
      </div>);
  }
}

//A single Chirp
class ChirpItem extends Component {

  likeChirp = () => {
    /* TODO: update the chirp when it is liked */
    let chirp = this.props.chirp; //current chirp (convenience)

    chirp.likes = {};


    let idPath = "chirps/" + chirp.id + "/likes"
    this.likesRef = firebase.database().ref(idPath);

    let updatedChirpLikes = {};

    if (this.props.chirp.likes) {
      updatedChirpLikes = this.props.chirp.likes;
    }

    let uid = this.props.currentUser.uid;
    if (uid in updatedChirpLikes){
      updatedChirpLikes[uid] = null;
    } else {
      updatedChirpLikes[uid] = true;
    }

    this.likesRef.set(updatedChirpLikes)
      .catch(err => console.log(err)); 
  }
 
  render() {
    let chirp = this.props.chirp; //current chirp (convenience)

    //counting likes
    let likeCount = 0; //count likes
    let userLikes = false; //current user has liked
    if(chirp.likes){
      likeCount = Object.keys(chirp.likes).length;
      if(chirp.likes[this.props.currentUser.uid]) //if user id is listed
        userLikes = true; //user liked!
    }

    return (
      <div className="row py-4 bg-white border">
        <div className="col-1">
          <img className="avatar" src={chirp.userPhoto} alt={chirp.userName+' avatar'} />
        </div>
        <div className="col pl-4 pl-lg-1">

          <span className="handle">{chirp.userName} {/*space*/}</span>

          <span className="time"><Moment date={chirp.time} fromNow/></span>

          <div className="chirp">{chirp.text}</div>

          {/* A section for showing chirp likes */}
          <div className="likes">          
            <i className={'fa fa-heart '+(userLikes ? 'user-liked': '')} aria-label="like" onClick={this.likeChirp} ></i>
            <span>{/*space*/} {likeCount}</span>
          </div>
        </div>
      </div>      
    );
  }
}
