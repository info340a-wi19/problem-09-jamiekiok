import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

export class TattooGallery extends Component {
    render() {
        let tattooArray = []
        if (this.props.tattoos) {
            //renders tattoo gallery by mapping the entire library of tattoos that is passed down as a prop
            tattooArray = this.props.tattoos.map((tattoo) => {
                return <TattooCard tattoo={tattoo} key={tattoo.id} addTattooCallback={this.props.addTattooCallback} toggleActive={this.props.toggleActive} />
            })
        }
        return (
            <section>
                <div className="container" id="gallery">
                    <h2 className="highlight">Choose some tattoos!</h2>
                    <h3 className="step-icon text-center">Pick some tattoos and enter your location and we will recommend you
                    some tattoo artists you might like and some styles you could consider!</h3>
                </div>
                <div className="row">
                    {tattooArray}
                </div>
                
            </section>
        )
    }
}

export class TattooCard extends Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    //handles the toggling of each tattoo card when it is clicked 
    handleClick() {
        if (this.props.tattoo) {
            this.props.toggleActive(this.props.tattoo)
        }
    }

    render() {
        let tattooProp = this.props.tattoo
        let tattoo = []
        if (this.props.tattoo) {
            return (
                <div className="col-lg-4 col-md-6" id="tattoo-select" onClick={this.handleClick}>
                    <div className={"thumbnail text-center " + ((tattooProp.isActive) ? 'toggleClick' : '')} id={tattooProp.id} >
                        <img src={tattooProp.img} alt={tattooProp.title} />
                        <a href={tattooProp.instagram} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div>
                </div>
            )
        }
    }
}