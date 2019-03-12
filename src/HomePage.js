import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom';
import firebase from 'firebase/app'


class HomePage extends Component {
    render() {
        return (
            <div>
                <ArtistHighlights />
                <SuggestedArtists />
                <Directions />
            </div>
        )
    }
}

class ArtistHighlights extends Component {
    render() {
        return (
            <section>
                <div className="container">
                    <h2 className="highlight">Artist Highlight</h2>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="container">
                                <div className="card mb-4">
                                    <img className="card-style card-img-top pb-3" src="img/pitta-kkm.jpg"
                                        alt="pitta kmm's abstract tattoo of trees over a hill with clouds" />
                                    <h3 className="card-title artist-card">Pitta Kmm</h3>
                                    <p className="artist-location">Seoul, South Korea</p>
                                    <p className="card-text artist-card">Pitta Kmm blends traditional Korean aesthetics with
                                    old-school Americana motifs.</p>
                                    <a className="text-center" href="https://www.instagram.com/pitta_kkm" target="_blank"
                                        rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="container">
                                <div className="card mb-4">
                                    <img className="card-style card-img-top pb-3" src="img/luke-jinks.jpg"
                                        alt="luke jink's traditional tattoo of a tiger" />
                                    <h3 className="card-title artist-card">Luke Jinks</h3>
                                    <p className="artist-location">London, England</p>
                                    <p className="card-text artist-card">Luke Jinks tattoos are a traditional style inspired by
                                    folk art and American imagery.</p>
                                    <a className="text-center" href="https://www.instagram.com/lukejinks" target="_blank"
                                        rel="noopener">
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="container">
                                <div className="card mb-4">
                                    <img className="card-style card-img-top pb-3" src="img/josh-leahy.jpg"
                                        alt="josh leahy's tattoo of an alien and a pyramid" />
                                    <h3 className="card-title artist-card">Josh Leahy</h3>
                                    <p className="artist-location">Brisbane, Australia</p>
                                    <p className="card-text artist-card">Josh Leahy welcomes all styles of tattooing, but his
                                    most popular pieces are traditional.</p>
                                    <a className="text-center" href="https://www.instagram.com/joshleahytattooer"
                                        target="_blank" rel="noopener">
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}


class SuggestedArtists extends Component {
    constructor(props) {
        super(props)

        this.state = {
            suggested: []
        }

    }

    componentDidMount() {
        this.suggestedRef = firebase.database().ref('suggestions')
        this.suggestedRef.once('value', (snapshot) => {
            let value = snapshot.val()
            this.setState({ suggested: value })
        })
    }


    render() {
        console.log(this.state.suggested)
        let suggestedKeys = Object.keys(this.state.suggested)
        let suggestedArray = suggestedKeys.map((key) => {
            let suggestedObj = this.state.suggested[key]
            suggestedObj.id = key
            return suggestedObj
        })

        let suggestedGallery = suggestedArray.map((item) => {
            return <SuggestedCards suggested={item} key={item.id} />
        })

        return (

            <div className="container">
                <h2 className="highlight">Suggested Artists</h2>
                <div className="row">
                    {suggestedGallery}
                </div>
            </div>


        )
    }
}

class SuggestedCards extends Component {
    render() {
        return (
            <div className="col-md-4">
                <div className="container">
                    <div className="card mb-4 thumbnail-no-hover">
                        <img className="card-style card-img-top pb-3" src="img/pitta-kkm.jpg"
                            alt="pitta kmm's abstract tattoo of trees over a hill with clouds" />
                        <h3 className="card-title artist-card">{this.props.suggested.name}</h3>
                        <p className="artist-location">{this.props.suggested.location}</p>
                        <p className="card-text artist-card">{this.props.suggested.description}</p>
                        <a className="text-center" href="https://www.instagram.com/pitta_kkm" target="_blank"
                            rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div>


                </div>
            </div>
        )
    }
}

class Directions extends Component {

    render() {
        return (
            <section>
                <div className="container instruction-img">
                    <h2 className="highlight">Get Started</h2>
                    <div className="instructions" aria-label="background image of a tattoo gun">
                        <p className="text-center lead instruction-text">So you want a tattoo? Tattoo virgin or long
                            time veteran? It doesn’t matter, because we made it easier for you to find your next
                        tattoo.</p>
                    </div>
                    <h3 className="lead text-center">Here at Ink Me, we understand the difficulties surrounding the process of
                        getting a tattoo. It might be your first tattoo or your fifteenth but the struggle of finding the
                        right style and the right artist remains the same. Our goal is to make the process of getting a
                    tattoo easier for you by simplifying the way you plan and search for tattoos.</h3>
                </div>

                <div className="container">
                    <div className="row">

                        <div className="col-lg-3 text-center">
                            <img className="step-icon" src="img/step-1.png" alt="icon for step 1" />
                            <p className="lead mid-steps">Have at it! Pick as many tattoos that you like from our gallery.</p>
                        </div>

                        <div className="col-lg-3 text-center">
                            <img className="step-icon" src="img/step-2.png" alt="icon for step 2" />
                            <p className="lead mid-steps">Enter in your continent, so we can snoop to find your next
                            tattoo artist.</p>
                        </div>

                        <div className="col-lg-3 text-center">
                            <img className="step-icon" src="img/step-3.png" alt="icon for step 3" />
                            <p className="lead mid-steps">Browse the results for the artists that match your preference.</p>
                        </div>

                        <div className="col-lg-3 text-center">
                            <img className="step-icon" src="img/tattoo-icon.png" alt="tattoo gun icon" />
                            <p ><Link className="lead mid-steps" to="/inkme">Let's Get Inked!</Link></p>
                        </div>
                    </div>

                </div>

            </section>
        )
    }

}

export default HomePage;