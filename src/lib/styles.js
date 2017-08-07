import { StyleSheet } from "react-native"

const primary = {
  light: "#cf5ce2",
  normal: "#9b27af",
  dark: "#69007f"
}
const secondaryColour = "#2980b9"

export default StyleSheet.create({
  navbar: {
    backgroundColor: primary.dark
  },
  navbarButton: {
    backgroundColor: primary.dark
  },

  navbarTitle: {
    padding: 8,
    color: "#fff"
  },

  navigator: {
    flex: 1,
    paddingTop: 64
  },

  button: {
    padding: 8,
    backgroundColor: primary.normal
  },
  buttonText: {
    color: "#fff"
  }
})
