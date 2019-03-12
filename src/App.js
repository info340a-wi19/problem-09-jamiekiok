import React, { Component } from 'react'
import 'whatwg-fetch';
import { TattooGallery } from './TattooGallery.js'
import { HeaderNavBar, ContactInformation } from './NavAndContact.js'
import { ModalResults } from './Modal.js'
import { ArtistPage } from './ArtistPage.js'
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './HomePage.js';
import {ArtistDetails} from './ArtistDetails.js';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            libraryTattoos: [],
            styleList: [],
            addedTattoos: [],
            locationInput: "North America",
            modal: false
        }

        this.toggle = this.toggle.bind(this)
        this.addTattoo = this.addTattoo.bind(this)
        this.findStyles = this.findStyles.bind(this)
        this.sortTopStyles = this.sortTopStyles.bind(this)
        this.setLocationInput = this.setLocationInput.bind(this)
        this.getArtistByLocation = this.getArtistByLocation.bind(this)
        this.getStyles = this.getStyles.bind(this)
        this.resetGallery = this.resetGallery.bind(this)
        this.toggleActive = this.toggleActive.bind(this)
    }

    // Fisher-Yates Shuffle 
    // Code adapted from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    //shuffles the tattoo gallery lay out whenever user refreshes the page 
    shuffle(array) {
        var currentI = array.length, tempVal, randomI
        while (0 !== currentI) {
            randomI = Math.floor(Math.random() * currentI)
            currentI -= 1
            tempVal = array[currentI]
            array[currentI] = array[randomI]
            array[randomI] = tempVal
        }
        return array
    }

    //toggles visibility of modal when inkMe button is clicked and when user closes modal
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    //toggles a border around the specific tattoo that a user chooses by referencing each tattoo's isActive state, 
    //also used to untoggle all tattoos when reset button is clicked 
    toggleActive(tattooObj) {
        let libraryTattoos = this.state.libraryTattoos
        let indexFound = libraryTattoos.findIndex((obj) => obj.id === tattooObj.id)
        if (tattooObj.isActive) {
            libraryTattoos[indexFound].isActive = false
        } else {
            libraryTattoos[indexFound].isActive = true
        }
        this.setState({ libraryTattoos: libraryTattoos }, () => {
            this.addTattoo(tattooObj, libraryTattoos[indexFound].isActive)
        })
    }

    //adds the tattoos selected by the user (if isActive is true) into an 'addedTattoos' state 
    //by iterating through the entire tattoo library and finding the selected tattoo by id
    addTattoo(tattooSelected, isActive) {
        let libraryTattoo = this.state.libraryTattoos
        if (isActive) {
            for (let i = 0; i < libraryTattoo.length; i++) {
                if (libraryTattoo[i].id === tattooSelected.id) {
                    let foundTattoo = libraryTattoo[i]
                    let updatedTattooState = this.state.addedTattoos.concat(foundTattoo)

                    this.setState(() => {
                        return { addedTattoos: updatedTattooState }
                    })
                }
            }
        } else {
            //allows user to unselect a tattoo and remove it from the addedTattoos state
            let addedTattoos = this.state.addedTattoos
            for (let i = 0; i < addedTattoos.length; i++) {
                if (addedTattoos[i].id === tattooSelected.id) {
                    let updatedTattooState = this.state.addedTattoos.filter(function (tattoo) {
                        return tattoo !== addedTattoos[i]
                    })
                    this.setState(() => {
                        return { addedTattoos: updatedTattooState }
                    })
                }
            }
        }
    }

    //takes in the addedTattoos state that tracks all the tattoos a user 
    //has selected and tallies each occurence of each style, sends that array 
    //through to sortTopSyles to return the top 3 styles that the user has selected
    getStyles() {
        let favList = {}
        let likedTattoos = this.state.addedTattoos
        likedTattoos.forEach((tattoo) => {
            let styleList = tattoo.style
            styleList.forEach((style) => {
                let isIn = style in favList
                if (!isIn) {
                    favList[style] = 1;
                } else {
                    let val = favList[style]
                    favList[style] = val + 1
                }
            })
        })
        return this.sortTopStyles(favList)
    }

    //sorts the array of styles returned by getStyles and returns the top 3
    //is referenced in getStyles
    sortTopStyles(listStyles) {
        let stylesArray = Object.keys(listStyles)
        stylesArray.sort((i, j) => {
            return listStyles[j] - listStyles[i]
        })
        return stylesArray.slice(0, 3)
    }

    //finds the top3 styles returned by getStyles in styleList found in state
    findStyles() {
        let top3 = this.getStyles()
        let styleList = this.state.styleList
        let styleObjects = []
        top3.forEach((styleString) => {
            styleList.forEach((styleObj) => {
                if (styleObj.style === styleString) {
                    styleObjects.push(styleObj)
                }
            })
        })
        return styleObjects
    }

    //updates the locationInput state with the location that the user chooses
    //the default for locationInput is "North America"
    setLocationInput(updatedLocation) {
        this.setState(() => { return { locationInput: updatedLocation } })
    }

    //takes in the locationInput state and returns all the tattoo objets in that location, 
    //then takes the top3 styles found from getStyles and the location the user chooses 
    //and passes it to matchArtistStyle 
    getArtistByLocation(top3) {
        let locationMatch = []
        let libraryTattoos = this.state.libraryTattoos
        let wantedLocation = this.state.locationInput

        libraryTattoos.forEach((tattoo) => {
            let area = Object.keys(tattoo.location)
            if (area[0] = wantedLocation) {
                locationMatch.push(tattoo)
            }
        })
        return this.matchArtistStyle(top3, locationMatch)
    }

    //takes in the predetermined top3 styles and the users selected location and returns 
    //the artists that matches at least 1 of the top3 styles in the specified location
    matchArtistStyle(top3, locationMatch) {
        let results = []
        var style = locationMatch.filter((obj) => {
            return obj.style == (top3[0] || top3[1] || top3[2])
        })

        style.forEach((tattoo) => {
            let tattooArtist = tattoo.artist
            if (results.length == 0) {
                results.push(tattoo)
            } else {
                let dupVal = false
                results.forEach((resultTattoo) => {
                    if (resultTattoo.artist == tattooArtist) {
                        dupVal = true
                    }
                })
                if (!dupVal) {
                    results.push(tattoo)
                }
            }
        })
        return results
    }

    //resets gallery when the reset button is clicked by clearing the added tattoos state 
    //and setting the isActive state of each tattoo to false, toggling the border to off
    resetGallery() {
        let libraryTattoos = this.state.libraryTattoos

        libraryTattoos.forEach((tattoo) => {
            tattoo.isActive = false
        })
        this.setState({ libraryTattoos: libraryTattoos, addedTattoos: [] })
    }

    //fetches JSON file for tattoo library data that loads in the tattoo gallery 
    //and a style JSON for the reccomended styles that appear in the results Modal
    componentDidMount() {
        // allows for data to be accessed based on pathname, if a more specific
        // pathname it will still have access to fetched data
        let urlPrefix = "./";
        if(this.props.location.pathname.includes("/artists/")) {
            urlPrefix = "../"
        }

        fetch(urlPrefix + 'tattoo_data.json').then((response) => {
            return response.json()
        })
            .then((data) => {
                this.shuffle(data)
                data.forEach((tattoo) => {
                    //gives each tattoo an isActive property that allows for toggling
                    tattoo.isActive = false
                })
                this.setState({ libraryTattoos: data })
            })
        fetch(urlPrefix + 'tattoo_style.json').then((response) => {
            return response.json()
        })
            .then((data) => {
                this.setState({ styleList: data })
        })
    }

    render() {
        if (this.state.libraryTattoos.length != 0) {
            return (
                <div>
                    < HeaderNavBar />

                    <main>
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                            <Route path ="/artists/:artistId" render={ props => <ArtistDetails {...props} tattooData={this.state.libraryTattoos} />}/>
                            <Route path="/artists" render={() => <ArtistPage libraryTattoos={this.state.libraryTattoos} />} />
                            <Route path="/inkme" render={() => <InkMeMain
                                tattoos={this.state.libraryTattoos} addTattooCallback={this.addTattoo} reset={this.resetGallery}
                                toggleActive={this.toggleActive} open={this.state.modal} toggle={this.toggle} style={this.findStyles}
                                getStyle={this.getStyles} getArtistByLocation={this.getArtistByLocation} setLocationInput={this.setLocationInput} />} />
                            <Redirect to ='/' />
                        </Switch>
                    </main>
                    <hr />
                    <footer className="page-footer font-small pt-4">
                        <ContactInformation />
                    </footer>
                </div>
            )
        } else {
            return (
                <div>
                    < HeaderNavBar />
                    <main>
                        <section>
                            <div className="alert alert-danger" role="alert">Sorry, we couldn't fetch the tattoos. We're working on it, try again later!</div>
                        </section>
                        <section>
                            <ModalResults open={this.state.modal} toggle={this.toggle} style={this.findStyles} getStyle={this.getStyles} getArtistByLocation={this.getArtistByLocation} setLocationInput={this.setLocationInput} />

                        </section>
                    </main>
                    <hr />
                    <footer className="page-footer font-small pt-4">
                        <ContactInformation />
                    </footer>
                </div>
            )
        }
    }
}

export class InkMeMain extends Component {
    render() {
        return (
            <div>
                <section>
                    <TattooGallery tattoos={this.props.tattoos} addTattooCallback={this.props.addTattooCallback} toggleActive={this.props.toggleActive} />
                </section>
                <section>
                    <ModalResults open={this.props.open} toggle={this.props.toggle} style={this.props.style} getStyle={this.props.getStyle}
                        getArtistByLocation={this.props.getArtistByLocation} setLocationInput={this.props.setLocationInput} reset={this.props.reset} />

                </section>
            </div>
        )
    }
}

export default App;