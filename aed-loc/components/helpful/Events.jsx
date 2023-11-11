// import axios from "axios";
// import { useState, useEffect } from "react";

// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import TextField from "@mui/material/TextField";
// import Stack from "@mui/material/Stack";
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

// const locations = {
//     "33.77509864265381,-84.39614658163087": "Clough Undergraduate Learning Commons",
//     "33.77717572728114, -84.39589086650311": "Klaus Advanced Computing Building",
//     "33.77260807592805, -84.39137794195794": "Brittain Dining Hall",
//     "33.771169303566744, -84.3915432378476": "North Ave Dining Hall",
//     "33.77377218030047, -84.39519539004799": "D.M. Smith Building",
//     "33.77319393752673, -84.39419633666199": "Georgia Tech Bursar’s Office",
//     "33.77286790530601, -84.3957282185205": "JS Coon School of Psychology",
//     "33.772295808033356, -84.393966924403": "Bill Moore Student Success Center",
//     "33.77171755529511, -84.39529159518885": "Swann Building",
//     "33.77214201779241, -84.39588362682498": "Engineering Science & Mechanics Building",
//     "33.77291096623647, -84.39646085767022": "Aerospace Systems Design Laboratory",
//     "33.773599318838386, -84.39597429273611": "Skiles Classroom Building",
//     "33.7746333604794, -84.39744348496359": "Tech Green",
//     "33.773476389568955, -84.39804784849889": "Georgia Tech Student Center",
//     "33.77510127134017, -84.39916908750803": "Ferst Center for the Arts",
//     "33.77448532647204, -84.39961595302793": "Flag Building",
//     "33.77490849518766, -84.40157876763689": "Exhibition Hall",
//     "33.77544920771476, -84.40123937610278": "Instructional Center",
//     "33.77597581143392, -84.39980261855783": "Gilbert Hillhouse Boggs Building",
//     "33.77667553656188, -84.39903716126524": "Mason Building",
//     "33.77709535088085, -84.40037384968706": "MRDC",
//     "33.775652369600294, -84.4036140927249": "Campus Recreation Center",
//     "33.77688252730029, -84.40364970780044": "E. Roe Stamps IV Field",
//     "33.778516740037766, -84.40313539032789": "Couch Park Burger Bowl",
//     "33.77950756547536, -84.40073224060184": "EcoCommons",
//     "33.77874027513652, -84.39954024319417": "Kendeda Building",
//     "33.779648766407725, -84.40470163151429": "West Village Dining Commons",
//     "33.78106523408412, -84.39855331469755": "Krone Engineering Biosystems Building",
//     "33.781059316468394, -84.39280162084255": "McCamish Pavilion",
// }
// const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 400,
//     bgcolor: "#516581",
//     border: "2px solid #000",
//     boxShadow: 24,
//     p: 4,
//     color: "#fff4d1"
// };

// const myTheme = createTheme({
//     palette: {
//         primary: {
//             main: "#fff4d1",
//             contrastText: "white",
//             label: "#fff4d1",
//             TextField: "#fff4d1"
//         }
//     }
// });

// function Event(props) {
//     const [openEvent, setOpenEvent] = useState(false);
//     const [selected, setSelected] = useState(false);
//     const [nameSelected, setNameSelected] = useState(false);
//     const [anchor, setAnchor] = useState(null);
//     const [eventForm, setEventForm] = useState({
//         name: "",
//         description: "",
//         img: "",
//         location: "",
//         time: "",
//         organization: "",
//         host: "",
//         capacity: "",
//         invite: ""
//     });

//     useEffect(() => {
//         if (props.name) {
//             setEventForm({
//                 name: props.name,
//                 description: props.description,
//                 img: props.img,
//                 location: props.location,
//                 time: props.time,
//                 organization: props.organization,
//                 host: props.host,
//                 capacity: props.capacity,
//                 invite: props.invite
//             });
//         }
//     }, []);

//     const handleOpenEvent = () => setOpenEvent(true);
//     const handleCloseEvent = () => setOpenEvent(false);

//     const onEventChange = (e) => {
//         setEventForm({ ...eventForm, [e.target.name]: e.target.value });
//     };

//     const onEventSubmit = (e) => {
//         e.preventDefault();

//         const config = {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`
//             }
//         };

//         axios
//             .patch("/api/events/" + props._id, eventForm, config)
//             .then((res) => {
//                 window.location.reload();
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     };
//     const {
//         img,
//         name,
//         location,
//         time,
//         description,
//         organization,
//         host,
//         _id,
//         invite,
//         capacity,
//         createdBy,
//         user,
//         status
//     } = props;

//     if (Object.keys(user).length === 0) {
//         return null;
//     }

//     const deleteEvent = () => {
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`
//             }
//         };

//         axios
//             .delete("/api/events/" + _id, config)
//             .then((res) => {
//                 console.log(res);
//                 window.location.reload();
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     };

//     const options = ["Going", "Maybe", "Not Going", "Delete RSVP"];

//     const openMenu = (event) => {
//         setAnchor(event.currentTarget);
//     };

//     const closeMenu = () => {
//         setAnchor(null);
//     };

//     const handleRSVP = async (index) => {
//         let rsvpStatus;
//         switch (index) {
//             case 0:
//                 rsvpStatus = options[0];
//                 break;
//             case 1:
//                 rsvpStatus = options[1];
//                 break;
//             case 2:
//                 rsvpStatus = options[2];
//                 break;
//             default:
//                 rsvpStatus = options[3];
//         }

//         const config = {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`
//             },
//             params: {
//                 rsvp: rsvpStatus
//             }
//         };

//         await axios.get("/api/events/rsvp/" + _id, config).then((res) => {
//             window.location.reload();
//         });
//     };

//     const onMenuItemClick = (event, index) => {
//         setAnchor(null);
//         setSelected(index);
//         handleRSVP(index);
//     };

//     return (
//         <div className='event'>
//             <div className='event-image'>
//                 <img src={img} width='250' height='250' alt='Event' />
//             </div>
//             <div className='event-details'>
//                 <p
//                     id='eventname'
//                     style={{ fontSize: "20px", fontWeight: "bold" }}
//                 >
//                     {name}
//                 </p>
//                 <p id='location'> {"Location: " + locations[location]}</p>
//                 <p id='time'> {"Time: " + Date(time).toString().substring(0, 21)}</p>
//                 <p id='organization'>{"Organization: " + organization}</p>
//                 <p id='organization'>{"Host: " + host}</p>
//                 <p id='description'>{"Description: " + description}</p>
//                 <p id='description'>{"Capacity: " + capacity}</p>
//                 {/* <p id='description'>{"Invite Only?: " + invite}</p> */}

//                 <button onClick={openMenu} className='attend'>
//                     RSVP
//                     {(() => {
//                         const i = props.user.events.findIndex(
//                             (x) => x._id === props._id
//                         );

//                         if (i !== -1) {
//                             return ": " + props.user.rsvps[i];
//                         }
//                     })()}
//                 </button>
//                 <Menu
//                     open={Boolean(anchor)}
//                     anchorEl={anchor}
//                     onClose={closeMenu}
//                     keepMounted
//                     className='dropdown'
//                     style={{ color: "blue" }}
//                 >
//                     {options.map((option, index) => (
//                         <MenuItem
//                             key={option}
//                             //if invite only disable buttons
//                             disabled={index === -1}
//                             selected={index === selected}
//                             onClick={(event) => {
//                                 onMenuItemClick(event, index);
//                             }}
//                         >
//                             {option}
//                         </MenuItem>
//                     ))}
//                 </Menu>
//                 {user.id === createdBy || user.type === "Admin" ? (
//                     <>
//                         <button className='attend' onClick={deleteEvent}>
//                             Delete Event
//                         </button>
//                         <button className='attend' onClick={handleOpenEvent}>
//                             Edit Event
//                         </button>
//                     </>
//                 ) : null}
//             </div>
//             <Modal
//                 open={openEvent}
//                 onClose={handleCloseEvent}
//                 aria-labelledby='modal-modal-title'
//                 aria-describedby='modal-modal-description'
//             >
//                 <Box sx={style}>
//                     <p
//                         id='modal-modal-title'
//                         variant='h6'
//                         component='h2'
//                         style={{ fontSize: "25px", fontWeight: "bold" }}
//                     >
//                         Edit Event
//                     </p>
//                     <form onSubmit={onEventSubmit}>
//                             <label style={{ display: "block" }}>
//                                 Name:
//                                 <input
//                                     type='text'
//                                     value={eventForm.name}
//                                     onChange={onEventChange}
//                                     name='name'
//                                 />
//                             </label>
//                             <p></p>
//                             <label style={{ display: "block" }}>
//                                 Description:
//                                 <input
//                                     type='text'
//                                     value={eventForm.description}
//                                     onChange={onEventChange}
//                                     name='description'
//                                 />
//                             </label>
//                             <p></p>
//                             <ThemeProvider theme={myTheme}>
//                                 <Stack
//                                     color='primary'
//                                     component='form'
//                                     noValidate
//                                     spacing={3}
//                                 >
//                                     <ThemeProvider theme={myTheme}>
//                                         <TextField
//                                             color='primary'
//                                             style={{ myTheme }}
//                                             id='datetime-local'
//                                             label='Time and Date'
//                                             type='datetime-local'
//                                             name="time"
//                                             onChange={onEventChange}
//                                             sx={{ width: 250 }}
//                                             InputLabelProps={{
//                                                 shrink: true,
//                                                 style: { color: "primary" }
//                                             }}
//                                         />
//                                     </ThemeProvider>
//                                 </Stack>
//                             </ThemeProvider>
//                             <p></p>
//                             <label style={{ display: "block" }}>
//                                 Location:
//                                 <select defaultValue="Select..." onChange={onEventChange} name="location">
//                                     <option disabled>Select...</option>
//                                      <option value='33.77509864265381,-84.39614658163087'>
//                                         Clough Undergraduate Learning Commons
//                                     </option>
//                                     <option value='33.77717572728114, -84.39589086650311'>
//                                         Klaus Advanced Computing Building
//                                     </option>
//                                     <option value='33.77260807592805, -84.39137794195794'>
//                                         Brittain Dining Hall
//                                     </option>
//                                     <option value='33.771169303566744, -84.3915432378476'>
//                                         North Ave Dining Hall
//                                     </option>
//                                     <option value='33.77377218030047, -84.39519539004799'>
//                                         D.M. Smith Building
//                                     </option>
//                                     <option value='33.77319393752673, -84.39419633666199'>
//                                         Georgia Tech Bursar’s Office
//                                     </option>
//                                     <option value='33.77286790530601, -84.3957282185205'>
//                                         JS Coon School of Psychology
//                                     </option>
//                                     <option value='33.772295808033356, -84.393966924403'>
//                                         Bill Moore Student Success Center
//                                     </option>
//                                     <option value='33.77171755529511, -84.39529159518885'>
//                                         Swann Building
//                                     </option>
//                                     <option value='33.77214201779241, -84.39588362682498'>
//                                         Engineering Science & Mechanics Building
//                                     </option>
//                                     <option value='33.77291096623647, -84.39646085767022'>
//                                         Aerospace Systems Design Laboratory
//                                     </option>
//                                     <option value='33.773599318838386, -84.39597429273611'>
//                                         Skiles Classroom Building
//                                     </option>
//                                     <option value='33.7746333604794, -84.39744348496359'>
//                                         Tech Green
//                                     </option>
//                                     <option value='33.773476389568955, -84.39804784849889'>
//                                         Georgia Tech Student Center
//                                     </option>
//                                     <option value='33.77510127134017, -84.39916908750803'>
//                                         Ferst Center for the Arts
//                                     </option>
//                                     <option value='33.77448532647204, -84.39961595302793'>
//                                         Flag Building
//                                     </option>
//                                     <option value='33.77490849518766, -84.40157876763689'>
//                                         Exhibition Hall
//                                     </option>
//                                     <option value='33.77544920771476, -84.40123937610278'>
//                                         Instructional Center
//                                     </option>
//                                     <option value='33.77597581143392, -84.39980261855783'>
//                                         Gilbert Hillhouse Boggs Building
//                                     </option>
//                                     <option value='33.77667553656188, -84.39903716126524'>
//                                         Mason Building
//                                     </option>
//                                     <option value='33.77709535088085, -84.40037384968706'>
//                                         MRDC
//                                     </option>
//                                     <option value='33.775652369600294, -84.4036140927249'>
//                                         Campus Recreation Center
//                                     </option>
//                                     <option value='33.77688252730029, -84.40364970780044'>
//                                         E. Roe Stamps IV Field
//                                     </option>
//                                     <option value='33.778516740037766, -84.40313539032789'>
//                                         Couch Park Burger Bowl
//                                     </option>
//                                     <option value='33.77950756547536, -84.40073224060184'>
//                                         EcoCommons
//                                     </option>
//                                     <option value='33.77874027513652, -84.39954024319417'>
//                                         Kendeda Building
//                                     </option>
//                                     <option value='33.779648766407725, -84.40470163151429'>
//                                         West Village Dining Commons
//                                     </option>
//                                     <option value='33.78106523408412, -84.39855331469755'>
//                                         Krone Engineering Biosystems Building
//                                     </option>
//                                     <option value='33.781059316468394, -84.39280162084255'>
//                                         McCamish Pavilion
//                                     </option>
//                                 </select>
//                             </label>
//                             <p></p>

//                             <p></p>
//                             <label style={{ display: "block" }}>
//                                 Organization:
//                                 <input
//                                     type='text'
//                                     value={eventForm.organization}
//                                     onChange={onEventChange}
//                                     name='organization'
//                                 />
//                             </label>
//                             <p></p>
//                             <label style={{ display: "block" }}>
//                                 Host:
//                                 <input
//                                     type='text'
//                                     value={eventForm.host}
//                                     onChange={onEventChange}
//                                     name='host'
//                                 />
//                             </label>
//                             <label style={{ display: "block" }}>
//                                 Invite Only?:
//                                 <FormControlLabel
//                                     control={
//                                         <Checkbox
//                                             defaultChecked={false}
//                                             color='primary'
//                                             name="invite"
//                                             onChange={onEventChange}
//                                         />
//                                     }
//                                 />
//                             </label>
//                             <label style={{ display: "block" }}>
//                                 Capacity:
//                                 <input
//                                     type='text'
//                                     value={eventForm.capacity}
//                                     onChange={onEventChange}
//                                     name='capacity'
//                                 />
//                             </label>
//                             <p></p>
//                             <label style={{ display: "block" }}>
//                                 Image:
//                                 <input
//                                     typ='text'
//                                     value={eventForm.img}
//                                     onChange={onEventChange}
//                                     name='img'
//                                 />
//                             </label>
//                             <p></p>

//                             <input
//                                 type='submit'
//                                 value='Submit'
//                                 className='attend'
//                             />
//                         </form>
//                     </Box>
//                 </Modal>
//         </div>
//     );
// }

// export default Event;