import React, { Component } from 'react'
import PropTypes from "prop-types"
import {
  AppRegistry,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native'
import Types from "../lib/types.js"

export default class AddSchool extends Component {
  constructor (props) {
    super(props)

    this.state = Types.school.new()
  }

  onNameChanged (str) {
    this.setState({
      name: str
    })
  }

  onMaxGPAChanged (str) {
    let maxGpa = 0
    try {
      maxGpa = parseInt(str, 10)
    } catch (e) {
      maxGpa = 0
    }
    this.setState({
      maxGpa: maxGpa
    })
  }

  onSave () {
    this.props.update(
      "addSchool",
      {
        school: this.state
      }
    )
  }

  render () {
    return (
      <View style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>
        {this.renderInput("Name of School", this.state.name, this.onNameChanged, { returnKeyType: "next" })}
        {this.renderInput("GPA Scale", (this.state.maxGpa > 0 ? this.state.maxGpa.toString() : ""), this.onMaxGPAChanged, { keyboardType: "numeric", returnKeyType: "next" })}
        <TouchableHighlight
          onPress={this.onSave.bind(this)}
        >
          <View>
            <Text>Save</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  renderInput (title, value, method, options) {
    return (
      <View>
        <Text>{title}</Text>
        <TextInput
          value={value}
          onChangeText={method.bind(this)}
          editable={true}
          style={{
            backgroundColor: "#efefef",
            height: 32
          }}
          {...options}
          />
      </View>
    )
  }
}

AddSchool.propTypes = {
  navigator: PropTypes.any.isRequired,
  update: PropTypes.func.isRequired
}

