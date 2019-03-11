import React, { Component } from 'react';
import SignUpForm from './components/signup/SignUpForm';
import firebase from 'firebase/app';
import 'firebase/auth'; 



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading:true
    };
  }

  //A callback function for registering new users
  handleSignUp = (email, password, handle, avatar) => {
    this.setState({errorMessage:null}); //clear any old errors

    /* TODO: sign up user here */
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        userCredentials.updateProfile({
          displayName : handle,
          photoURL : avatar
        }).catch((error) => {
          // An error happened.
          this.setState = ({errorMessage: error.message});
        }); 
      })
      .catch((error) => { //report any errors
        this.setState = ({errorMessage: error.message});
        console.log(this.state.errorMessage);
      });
    }

  componentDidMount = () => {
    this.authUnSubFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if(firebaseUser) { //if exists, then we logged in
        this.setState({user: firebaseUser});
      } else {
        this.setState({user: null});
      }
      this.setState({loading:false});
    })
  }

  componentWillUnmount = () => {
    this.authUnSubFunction();
  }

  //A callback function for logging in existing users
  handleSignIn = (email, password) => {
    this.setState({errorMessage:null}); //clear any old errors

    /* TODO: sign in user here */
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((err) => {  //log any errors for debugging
        console.log(err.message);
        this.setState({errorMessage: err.message})
       })
   }

  //A callback function for logging out the current user
  handleSignOut = () => {
    this.setState({errorMessage:null}); //clear any old errors

    /* TODO: sign out user here */
    firebase.auth().signOut();
  }

  render() {

    let content = null; //content to render

    if (this.state.loading) {
      content = (
        <div className="text-center">
          <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
        </div>
      )
    } else if (!this.state.user) { //if logged out, show signup form
      content = (
        <div className="container">
          <h1>Sign Up</h1>
          <SignUpForm 
            signUpCallback={this.handleSignUp} 
            signInCallback={this.handleSignIn} 
            />
        </div>
      );
    } 
    else { //if logged in, show welcome message
      content = (
        <div>
          <WelcomeHeader user={this.state.user}>
            {/* log out button is child element */}
            {this.state.user &&
              <button className="btn btn-warning" onClick={this.handleSignOut}>
                Log Out {this.state.user.displayName}
              </button>
            }
          </WelcomeHeader>
        </div>
      );
    }

    return (
      <div>
        {this.state.errorMessage &&
          <p className="alert alert-danger">{this.state.errorMessage}</p>
        }
        {content}
      </div>
    );
  }
}

//A component to display a welcome message to a `user` prop (for readability)
class WelcomeHeader extends Component {
  render() {
    return (
      <header className="container">
        <h1>
          Welcome {this.props.user.displayName}!
          {' '}
          <img className="avatar" src={this.props.user.photoURL} alt={this.props.user.displayName} />
        </h1>
        {this.props.children} {/* for button */}
      </header>
    );
  }
}

export default App;