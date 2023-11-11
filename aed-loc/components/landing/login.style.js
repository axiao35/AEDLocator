import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";

screenDimensions = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    display: 'flex',
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    top: 150,
  },
  textInput: {
    width: 350,
    color: "lightgrey",
    margin: 10,
  },
  button: {
    width: 300,
    marginTop: 20,
    marginBottom: 150
  },
  createAccount: {
    width: 300,
  }
});

export default styles;
