import React, { Component } from 'react'; 
import { ArtistCard } from './ArtistPage.js'
import _ from 'lodash';

export class ArtistDetails extends Component { //need both or no?
  constructor(props){
    super(props);
    this.state = {artist: undefined};
  }

  componentDidMount(){
    let artistName = this.props.match.params.artistId; 
    let artistObj =  _.find(this.props.tattooData, {artist: artistName}); //find artist in data
    this.setState({artist: artistObj});
  }

  render() {
    let artist = this.state.artist
    if(!artist) return <h2>Artist not found!</h2> //if unspecified

    return (
      <div>
        {/* <ArtistInfo artist={artist} />  */}

        <ArtistCard artist={artist} /> 
      </div>
    );
  }
}

class ArtistInfo extends Component {
  render() {
    return(
      <div>

      </div>




    )
  }
}

export default ArtistDetails; //need both or no? 




// getLocation() {
//   let artist = this.props.artist

//   let continent = (Object.keys(artist.location))[0]
//   let country = artist.location[continent][0]
//   return country
// }

// handleArtistClick = () => {
//   this.setState({artistClicked: true});
// }

// render() {
//   let artist = this.props.artist

//   if (this.state.artistClicked) {
//       return (<Redirect push to={"/artists/"+ this.props.artist.artist} />);
//     }


//   return (
//       <div className="col-md-4" onClick={this.handleArtistClick}>
//           <div className="container">
//               <div className="card mb-4 thumbnail">
//                   <img className="card-style card-img-top pb-3" src={artist.artistimg}
//                       alt={artist.artist + "'s artist card"} />
//                   <h3 className="card-title artist-card">{artist.artist}</h3>
//                   <p className="artist-location">{this.getLocation()}</p>
//                   <p className="card-text artist-card">...</p>
//                   <a className="text-center" href={artist.instagram} target="_blank"
//                       rel="noopener noreferrer">
//                       <FontAwesomeIcon icon={faInstagram} />
