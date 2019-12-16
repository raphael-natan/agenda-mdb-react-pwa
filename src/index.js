import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'
import {
    MDBBtn, MDBIcon, MDBBadge, MDBContainer, MDBRow, MDBCol, MDBModal, MDBModalBody, MDBModalHeader,
    MDBModalFooter, MDBInput
} from 'mdbreact'
import './index.css'

const App = () => {
    const [events, setEvents] = useState([
        {
            id: 1,
            time: "10:00",
            title: "Breakfast with Simon",
            location: "Lounge Caffe",
            description: "Discuss Q3 targets"
        },
        {
            id: 2,
            time: "10:30",
            title: "Daily Standup Meeting (recurring)",
            location: "Warsaw Spire Office"
        },
        {
            id: 3,
            time: "11:00",
            title: "Call with HRs"
        },
        {
            id: 4,
            time: "11:00",
            title: "Lunch with Timothy",
            location: "Canteen",
            description: "Project evaluation ile declaring a variable and using an if statement is a fine way to conditionally render a component, sometimes you might want to use a"
        }
    ])
    const [modal, setModal] = useState(false)
    const [eventsTemp, setEventsTemp] = useState()

    const handleDelete = eID => {
        const eventsNew = events.filter(e => e.id !== eID)
        setEvents(eventsNew)
    }

    const toggleModal = () => {
        setModal(!modal)
    }

    const handleInputChange = inputName => value => {
        const nextValue = value
        setEventsTemp({...eventsTemp,
            [inputName]: nextValue
          })
        console.log("setei eventsTemp no input")
        console.log(eventsTemp)
    }

    const addEvent = () => {
        let newArray = {
            id: events.length ? events[events.length - 1].id + 1 : 1,
            time: eventsTemp.time,
            title: eventsTemp.title,
            location: eventsTemp.location,
            description: eventsTemp.description,
            value: events.length > 5 ? "Its's grater then 5" : "Its lower or equal 5"
        }
        console.log('let new array')
        console.log(newArray)

        console.log('setei new array no temp')
        setEventsTemp(newArray)
        console.log(eventsTemp)

        console.log('setei novo events temp no array de events')
        setEvents([...events, eventsTemp])
        console.log(events)

        setEventsTemp({
            time: "",
            title: "",
            location: "",
            description: ""
        })
        console.log('limpei events temp')
        console.log(eventsTemp)
    }

    return (
        <React.Fragment>
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="9" className="mb-r">
                        <h2 className="text-uppercase my-3">Today:</h2>
                        <div id="schedule-items">
                            {events.map(event => (
                                <Event
                                    key={event.id}
                                    id={event.id}
                                    time={event.time}
                                    title={event.title}
                                    location={event.location}
                                    description={event.description}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                        <MDBRow className="mb-4">
                            <MDBCol xl="3" md="6" className="mx-auto text-center">
                                <MDBBtn color="info" rounded onClick={toggleModal}>
                                    Add Event
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                    <MDBCol md="3">
                        <h3 className="text-uppercase my-3">Schedule</h3>
                        <h6 className="my-3">
                            It's going to be busy that today. You have{" "}
                            <b>{events.length} events </b> today.
                        </h6>
                        <h1 className="my-3">
                            <MDBRow>
                                <MDBCol xs="3" className="text-center">
                                    <MDBIcon icon="sun" fixed />
                                </MDBCol>
                                <MDBCol xs="9">Sunny</MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol xs="3" className="text-center">
                                    <MDBIcon icon="thermometer-three-quarters" fixed />
                                </MDBCol>
                                <MDBCol xs="9">23°C</MDBCol>
                            </MDBRow>
                        </h1>
                        <p>
                            Don't forget your sunglasses. Today will dry and sunny, becoming
                            warm in the afternoon with temperatures of between 20 and 25
                            degrees.
                        </p>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            {/* Modal code below: */}
            <MDBModal isOpen={modal} toggle={toggleModal}> {/*NÃO FUNCIONA DEVIDO A TAG MDB SER CLASS???*** toggle={toggleModal}*/}
                <MDBModalHeader
                    className="text-center"
                    titleClass="w-100 font-weight-bold"
                    toggle={toggleModal}
                >
                    Add new event
                </MDBModalHeader>
                <MDBModalBody>
                    <form className="mx-3 grey-text">
                        <MDBInput
                            name="time"
                            label="Time"
                            icon="clock"
                            hint="12:30"
                            group
                            type="text"
                            getValue={handleInputChange("time")}
                        />
                        <MDBInput
                            name="title"
                            label="Title"
                            icon="edit"
                            hint="Briefing"
                            group
                            type="text"
                            getValue={handleInputChange("title")}
                        />
                        <MDBInput
                            name="location"
                            label="Location (optional)"
                            icon="map"
                            group
                            type="text"
                            getValue={handleInputChange("location")}
                        />
                        <MDBInput
                            name="description"
                            label="Description (optional)"
                            icon="sticky-note"
                            group
                            type="textarea"
                            getValue={handleInputChange("description")}
                        />
                    </form>
                </MDBModalBody>
                <MDBModalFooter className="justify-content-center">
                    <MDBBtn color="info" onClick={toggleModal, addEvent}>
                        Add
                    </MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </React.Fragment>
    )
}

const Event = props => {
    return (
        <React.Fragment>
            <div className="media mt-1">
                <h3 className="h3-responsive font-weight-bold mr-3">{props.time}</h3>
                <div className="media-body mb-3 mb-lg-3">
                    <MDBBadge color="danger" className="ml-2 float-right" onClick={() => props.onDelete(props.id)}>-</MDBBadge>
                    <h6 className="mt-0 font-weight-bold">{props.title}</h6>{" "}
                    <hr className="hr-bold my-2" />
                    {props.location && (
                        <React.Fragment>
                            <p className="font-smaller mb-0">
                                <MDBIcon icon="location-arrow" />{props.location}
                            </p>
                        </React.Fragment>
                    )}
                </div>
            </div>
            {props.description && (
                <p className="p-2 mb-4  blue-grey lighten-5 blue-grey lighten-5">
                    {props.description}
                </p>
            )}
        </React.Fragment>
    )
}

ReactDOM.render(<><App /></>, document.getElementById("root"))