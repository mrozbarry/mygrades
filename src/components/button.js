import React, { Component } from "react"
import {
  TouchableHighlight,
  Text
} from "react-native"
import PropTypes from "prop-types"
import Styles from "../lib/styles.js"

const Button = (props) => {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      style={Styles.button}
    >
      <Text style={Styles.buttonText}>{props.children}</Text>
    </TouchableHighlight>
  )
}

Button.propTypes = {
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  children: PropTypes.node.isRequired
}

Button.Dark = (props) => {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      style={[Styles.button, Styles.navbarButton]}
    >
      <Text style={Styles.buttonText}>{props.children}</Text>
    </TouchableHighlight>
  )
}

Button.Dark.propTypes = {
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  children: PropTypes.node.isRequired
}

export default Button
