import React, { Component } from 'react'
import PropTypes from "prop-types"
import {
  AppRegistry,
  Text,
  View,
  SectionList
} from 'react-native'
import Storage from "../lib/storage.js"

export default class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      schools: [],
      courses: []
    }
  }

  componentDidMount () {
    this.getInitialData()
  }

  async getInitialData () {
    const schools = (await Storage.getSchools())
    const courses = (await Storage.getCourses())

    this.setState({
      schools: schools || [],
      courses: courses || []
    })
  }

  getSections () {
    unassignedCourses =
      this.state.courses.filter((c) => !c.schoolId || c.schoolId == "")
    unassigned =
      unassignedCourses.length > 0 ?
      [ { data: unassignedCourses, key: "unassigned", title: "---" } ] :
      []


    sections = unassigned.concat(
      courses =
        this.
          state.
          courses.
          filter((course) => course.schoolId == school.id).
          sort((a, b) => a.updatedAt - b.updatedAt),

      this.state.schools.map((school) => {
        return {
          data: courses,
          key: school.id,
          title: school.name
        }
      })
    )

    return sections
  }

  render () {
    return (
      <SectionList
        style={{ flex: 1, backgroundColor: "#efefef" }}
        sections={this.getSections()}
        renderSectionHeader={this.renderHeader.bind(this)}
        renderItem={this.renderItem.bind(this)}
        />
    )
  }

  renderHeader ({ section }) {
    return (
      <Text style={{ fontSize: 18 }}>{section.title}</Text>
    )
  }

  renderItem (item) {
    return (
      <TouchableHighlight
        style={{ flex: 1 }}
        // onPress={}
        // onLongPress={}
        >
        <View style={{ flex: 1 }}>
          <Text>Section item</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

Home.propTypes = {
  navigator: PropTypes.any.isRequired,
  update: PropTypes.func.isRequired
}
