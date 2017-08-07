import React, { Component } from 'react'
import PropTypes from "prop-types"
import {
  Text,
  View,
  FlatList,
  Button,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import Swipeable from "react-native-swipeable"
import Storage from "../lib/storage.js"


export default class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "My Grades",
    headerRight: (
      <Button
        title="Add School"
        onPress={() => navigation.navigate("AddSchool")}
        />
    )
  })


  constructor (props) {
    super(props)

    this.state = {
      schools: [],
      courses: [],
      schoolsPendingDelete: []
    }

  }


  componentDidMount () {
    Storage.addListener("@MyGrades/schools", this.schoolsChanged.bind(this), [])
    Storage.addListener("@MyGrades/courses", this.coursesChanged.bind(this), [])
  }


  componentWillUnmount () {
    Storage.removeListener("@MyGrades/schools", this.schoolsChanged)
    Storage.removeListener("@MyGrades/courses", this.coursesChanged)
  }


  schoolsChanged (schools) {
    this.setState({ schools: schools })
  }


  coursesChanged (courses) {
    this.setState({ courses: courses })
  }


  onSwipeRight (school) {
    this.setState({
      schoolsPendingDelete: this.state.schoolsPendingDelete.concat(school.id)
    })
  }


  onSwipeRightComplete (school) {
    if (this.state.schoolsPendingDelete.indexOf(school.id) >= 0) {
      const schoolsPendingDelete = this.state.schoolsPendingDelete.filter((id) => id != school.id)
      const schools = this.state.schools.filter((s) => s.id != school.id)

      this.setState({
        schoolsPendingDelete: schoolsPendingDelete
      }, () => {

        Storage
          .set("@MyGrades/schools", schools)
      })
    }
  }


  render () {
    const schools = this.state.schools

    return (
      <FlatList
        style={{ flex: 1, margin: 8 }}
        data={schools}
        renderItem={this.renderItem.bind(this)}
        keyExtractor={(item, idx) => item.id}
        />
    )
  }


  renderItem (item) {
    const school = item.item
    const courses = this.state.courses.filter((course) => {
      return course.schoolId == school.id
    })

    return (
      <Swipeable
        style={{
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: "#EEE",
          marginBottom: 4,
          backgroundColor: "#FFF",
          flex: 1
        }}
        rightContainerStyle={{ backgroundColor: "#F00" }}
        rightContent={<View style={{ flex: 1, alignItems: "flex-start", justifyContent: "center", paddingLeft: 20 }}><Text>Delete</Text></View>}
        onRightActionRelease={this.onSwipeRight.bind(this, school)}
        onRightActionComplete={this.onSwipeRightComplete.bind(this, school)}
        rightActionActivationDistance={150}
      >
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate("ShowSchool", { schoolId: school.id })}
          style={{
            flex: 1
          }}
          underlayColor="#007AFF"
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: 8
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                padding: 8,
                width: 200
              }}
            >
              <Text style={{ fontSize: 16 }}>{school.name}</Text>
              <Text>{courses.length || 5} Courses</Text>
            </View>
            <Text style={{ width: 100  }}>12.0</Text>
            <Text style={{ width: 100  }}>A+</Text>
          </View>
        </TouchableHighlight>
      </Swipeable>
    )
  }
}

Home.propTypes = {
  navigation: PropTypes.any.isRequired
}
