import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { Button, Modal, ModalHeader, ModalBody, Col, Form, FormGroup, Label, Input, FormText, Navbar } from 'reactstrap'
import { AvForm, AvField, AvGroup, AvFeedback, AvInput } from 'availity-reactstrap-validation';
import { Redirect } from 'react-router-dom';

import firebase from 'firebase/app'
import { HeaderNavBar } from './NavAndContact';

export class ArtistPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            modal: false
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    render() {
        return (
            <div className="container">
                <h2 className="highlight col-9">Artists</h2>
                <ArtistGallery libraryTattoos={this.props.libraryTattoos} />
                <ArtistSuggestModal open={this.state.modal} toggle={this.handleClick} />
                <Navbar className="fixed justify-content-center flex-column" >
                        <Button id="ink-me-btn" className="btn btn-light" type="submit" role="button" onClick={this.handleClick}>Suggest An Artist</Button>
                </Navbar>

            </div>
        )
    }
}

export class ArtistCard extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }
    
    
    getLocation() {
        let artist = this.props.artist

        let continent = (Object.keys(artist.location))[0]
        let country = artist.location[continent][0]
        return country
    }

    handleArtistClick = () => {
        this.setState({artistClicked: true});
    }

    render() {
        let artist = this.props.artist

        if (this.state.artistClicked) {
            return (<Redirect push to={"/artists/"+ this.props.artist.artist} />);
          }
      

        return (
            <div className="col-md-4" onClick={this.handleArtistClick}>
                <div className="container">
                    <div className="card mb-4 thumbnail">
                        <img className="card-style card-img-top pb-3" src={artist.artistimg}
                            alt={artist.artist + "'s artist card"} />
                        <h3 className="card-title artist-card">{artist.artist}</h3>
                        <p className="artist-location">{this.getLocation()}</p>
                        <p className="card-text artist-card">...</p>
                        <a className="text-center" href={artist.instagram} target="_blank"
                            rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

class ArtistGallery extends Component {
    render() {
        let artistArray = [];
        artistArray = this.props.libraryTattoos.map((artist) => {
            return <ArtistCard key={artist.artist} artist={artist} />
        })
        return (

            <div className="container">
                <div className="row">
                    {artistArray}
                </div>
            </div>
        )
    }
}

class ArtistSuggestModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            location: 'North America',
            style: 'Korean',
            description: '',
            website: ''
        }

        this.formSubmit = this.formSubmit.bind(this)
        this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this)
    }

    formSubmit(event) {
        event.preventDefault();

        let newSuggestion = {
            name: this.state.name,
            location: this.state.location,
            style: this.state.style,
            description: this.state.description,
            website: this.state.website
        }

        let suggestionRef = firebase.database().ref('suggestions')
        suggestionRef.push(newSuggestion)
        this.setState({
            name: '', location: 'North America', style: 'Korean',
            description: '', website: ''
        })

        this.props.toggle()

    }

    handleInvalidSubmit(event, errors, values) {
        console.log('error')
        console.log(values)
    }

    render() {
        return (
            <Modal isOpen={this.props.open} size="lg" >
                <ModalHeader toggle={this.props.toggle}>
                    Suggest an Artist!
                </ModalHeader>
                <ModalBody>
                    <AvForm onValidSubmit={this.formSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
                        <AvGroup row>
                            <Label for="ArtistName" sm={2}>Artist Name</Label>
                            <Col sm={10}>
                                <AvInput type="text" name="ArtistName" id="ArtistName" value={this.state.name}
                                    onChange={e => this.setState({ name: e.target.value })}
                                    placeholder="This project has ruined me" required />
                                <AvFeedback>This is an error!</AvFeedback>
                            </Col>
                        </AvGroup>

                        <AvGroup row>
                            <Label for="locationSelect" sm={2}>Select</Label>
                            <Col sm={10}>
                                <AvField type="select" id="locationSelect" name="location" value={this.state.location}
                                    onChange={e => this.setState({ location: e.target.value })}>
                                    <option>North America</option>
                                    <option>Asia</option>
                                    <option>Europe</option>
                                    <option>South America</option>
                                </AvField>
                            </Col>
                        </AvGroup>
                        <AvGroup row>
                            <Label for="styleSelect" sm={2}>Styles</Label>
                            <Col sm={10}>
                                <AvField type="select" name="Stye" id="styleSelect"
                                    value={this.state.style}
                                    onChange={e => this.setState({ style: e.target.value })}>
                                    <option>Korean</option>
                                    <option>Japanese</option>
                                    <option>American Traditional</option>
                                    <option>Handpoked</option>
                                    <option>Script</option>
                                    <option>Line</option>
                                    <option>Minimal</option>
                                    <option>Portrait</option>
                                    <option>Tribal</option>
                                    <option>Realism</option>
                                    <option>Blast Over</option>
                                    <option>Geometric</option>
                                    <option>White Ink</option>
                                    <option>Detail</option>
                                    <option>Watercolor</option>
                                    <option>Neo Traditional</option>
                                    <option>Cartoon</option>
                                    <option>Illustrative</option>
                                    <option>Black Work</option>
                                    <option>UV</option>
                                </AvField>
                            </Col>
                        </AvGroup>
                        <AvGroup row>
                            <Label for="artistWebsite" sm={2}>Artist website</Label>
                            <Col sm={10}>
                                <Input type="email" name="email" id="artistWebsite"
                                    value={this.state.website}
                                    onChange={e => this.setState({ website: e.target.value })}
                                    placeholder="with a placeholder" />
                            </Col>
                        </AvGroup>
                        <AvGroup row>
                            <Label for="artistDescription" sm={2}>Artist Description</Label>
                            <Col sm={10}>
                                <AvInput type="textarea" name="text"
                                    value={this.state.description}
                                    onChange={e => this.setState({ description: e.target.value })}
                                    id="artistDescription" />
                            </Col>
                        </AvGroup>
                        <AvGroup check row>
                            <Col sm={{ size: 10, offset: 5 }}>
                                <Button id="ink-me-btn" className="btn btn-light" type="submit" role="button" >Submit</Button>
                            </Col>
                        </AvGroup>
                    </AvForm>
                </ModalBody>
            </Modal>
        )
    }
}

export default ArtistPage;