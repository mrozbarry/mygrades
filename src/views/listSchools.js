import React, { Component } from 'react'
import PropTypes from "prop-types"
import {
  Text,
  View,
  FlatList
} from 'react-native'
import Storage from "../lib/storage.js"

export default class ListSchools extends Component {
  constructor (props) {
    super(props)

    this.state = {
      schools: [],
      refreshing: true
    }
  }

  componentDidMount () {
    this.getInitialData()
  }

  async getInitialData () {
    const schools = (await Storage.getSchools())

    console.log("ListSchools#getInitialData", schools)

    this.setState({
      schools: (schools || []).map((s) => Object.assign({}, s, { key: s.id })),
      refreshing: false
    })
  }

  render () {
    console.log("ListSchools#render", this.state)
    return (
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1, flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start" }}
        data={this.state.schools}
        renderItem={this.renderItem.bind(this)}
        refreshing={this.state.refreshing}
        onRefresh={this.getInitialData.bind(this)}
        />
    )
  }

  renderItem (item) {
    return (
      <View>
        <Text>{item.item.name}</Text>
      </View>
    )
  }
}

ListSchools.propTypes = {
  navigator: PropTypes.any.isRequired,
  update: PropTypes.func.isRequired
}
