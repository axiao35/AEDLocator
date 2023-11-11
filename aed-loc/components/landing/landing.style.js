import { StyleSheet, Dimensions } from "react-native";

screenDimensions = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: "column",
    alignItems: "center",
    top: 75
  },
  locateAED: {
    width: 300,
    margin: 20,
    height: 50,
    display: "flex",
    justifyContent: "center"
    // alignItems: "center",
  },
  emergencyButton: {
    height: 50,
    width: "50%",
    display: "flex",
    justifyContent: "center",
  },
  emergencyButtonText: {
    fontWeight: 600,
    fontSize: 18,
    color: "white",
  },
  emergencyContactButton: {
    height: 50,
    display: "flex",
    justifyContent: "center",
    marginTop: 20
  },
  modalButton: {
    marginBottom: 10,
    width: 140,
    alignSelf: 'center'
  },
  modalEmergency: {
    backgroundColor: 'white',
    borderRadius: 40,
    top: 100,
    bottom: 200,
    right: 80,
    left: 80
  },
  contentContainerModalEmergency: {
    flex: .5
  },
  instructionsButton: {
    height: 50,
    width: 300,
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    color: "#FBEBD8"
  },
  loginButton: {
    marginTop: 50,
    // padding: "100",
    width: 300,
    height: 50,
    display: "flex",
    justifyContent: "center"
  },
    wrapper: {
    flex: 3,
    backgroundColor: "white",
  },
    userWrapper: {
    justifyContent: 'center',
    alignItems: "center",
    marginTop: 40
  },
    username: {
    color: "black",
    fontSize: 35
  },
});

export default styles;
