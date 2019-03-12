import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Navbar } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

export class ModalResults extends Component {

    constructor(props) {
        super(props)

        this.state = {
            location: ''
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleLocationChange = this.handleLocationChange.bind(this)
    }

    //handles toggling when an individual tattoo is clicked 
    handleClick = () => {
        this.props.toggle()
    }

    //updates the locationInput state when user chooses a different state
    handleLocationChange(UpdatedLocation) {
        let locationChange = UpdatedLocation.target.value
        this.setState({ location: locationChange }, () => {
            this.props.setLocationInput(locationChange)
        })
    }

    render() {
        let top3 = this.props.style()
        let arrayStringsStyle = this.props.getStyle()
        let stylesArray = []
        if (top3.length !== 0) {
            stylesArray = top3.map((style) => {
                //renders style card based on the users top 3 styles derived from the styleList
                return <StyleCard style={style} key={style.id} />
            })
        } else {
            //handles error when user doesn't pick any tattoos 
            stylesArray = <p className="alert alert-danger">Sorry, you need to pick more tattoos!</p>
        }
        let artistMatched = this.props.getArtistByLocation(arrayStringsStyle)

        let artistArray = []
        if (artistMatched.length !== 0) {
            artistArray = artistMatched.map((artist) => {
                //renders recommened artist card based on the matched artists
                return <ArtistCard artist={artist} key={artist.id} />
            })
        }

        return (
            <section>
                <Navbar className="fixed  ">
                    <div className=" container">
                        <div className="info-form">
                            <form action="ink-me-results.html" className="form-inline justify-content-center">
                                <div className="form-group">
                                    <select name="area" ref="locationInput" className="form-control form-control-sm" value={this.state.location} onChange={this.handleLocationChange}>
                                        <option value="North America">North America</option>
                                        <option value="South America">South America</option>
                                        <option value="Asia">Asia</option>
                                        <option value="Europe">Europe</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <Button id="ink-me-btn" className="btn btn-light " type="submit" role="button" onClick={this.handleClick}>Ink Me!</Button>
                        <Button id="reset-btn" type="button" className="btn btn-secondary" role="button" onClick={this.props.reset}>Reset</Button>

                    </div>
                </Navbar>
                <Modal id="resultModal" isOpen={this.props.open} toggle={this.props.toggle} size="lg">
                    <ModalHeader toggle={this.props.toggle}>
                        Tattoo Results
                    </ModalHeader>
                    <ModalBody>
                        <div id="tattooResults" className="container">
                            <div id="styleRecTitle">
                                <h3>Recommended Styles</h3>
                            </div>
                            <div id="recommendedStyles" className="row">
                                {stylesArray}
                            </div>
                            <div id="artistRecTitle">
                                <h3>Recommended Artists</h3>
                            </div>
                            <div id="recommendedArtist" className="row">
                                {artistArray}
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </section>
        )
    }
}

export class StyleCard extends Component {
    render() {
        return (
            <div className="col-auto">
                <div className="container">
                    <div className="card mb-4">
                        <img className="card-style card-img-top pb-3 cardnail" src={this.props.style.img}
                            alt={this.props.style.style}></img>
                        <h4 className="card-title text-center">{this.props.style.style}</h4>
                    </div>
                </div>
            </div>
        )
    }
}

export class ArtistCard extends Component {
    render() {
        return (
            <div className="col-auto">
                <div className="container">
                    <div className="card mb-4">
                        <img className="card-style card-img-top pb-3 cardnail" src={this.props.artist.artistimg}
                            alt={this.props.artist.artist}></img>
                        <h4 className="card-title text-center">{this.props.artist.artist}</h4>
                        <a className="text-center" href={this.props.artist.instagram} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}