import React, { Component } from 'react'
import PropTypes from "prop-types"
import {
  AppRegistry,
  Text,
  View
} from 'react-native'

export default class AddCourse extends Component {
  render () {
    return (
      <View>
        <Text>Add Course</Text>
      </View>
    )
  }
}

AddCourse.propTypes = {
  navigator: PropTypes.any.isRequired
}
