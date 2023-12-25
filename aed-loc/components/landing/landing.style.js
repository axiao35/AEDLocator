import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../constants";

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
  },
  emergencyButton: {
    height: 50,
    width: "80%",
    display: "flex",
    justifyContent: "center",
  },
  image: {
    height: 80,
    width: 80
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
    margin: 10,
    width: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
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
    color: "#FAC5C5",
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
    backgroundColor: COLORS.lightWhite
  },
    userWrapper: {
    justifyContent: 'center',
    alignItems: "center",
    marginTop: 40,
    backgroundColor: COLORS.lightWhite
  },
    username: {
    color: "black",
    fontSize: 35
  },
});

export default styles;
