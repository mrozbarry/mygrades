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
import Types from "../lib/types.js"


export default class SchoolShow extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "My Courses",
    headerRight: (
      <Button
        title="Add Course"
        onPress={() => null /*navigation.navigate("AddCourse")*/ }
        />
    )
  })


  constructor (props) {
    super(props)

    this.state = {
      school: {},
      courses: [],
      coursesPendingDelete: []
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
    const { schoolId } = this.props.navigation.state.params

    this.setState({
      school: schools.filter((s) => s.id == schoolId)[0] || {}
    })
  }


  coursesChanged (courses) {
    const { schoolId } = this.props.navigation.state.params

    this.setState({
      courses: courses.filter((c) => c.schoolId == schoolId)
    })
  }


  onSwipeRight (course) {
    this.setState({
      coursesPendingDelete: this.state.coursesPendingDelete.concat(course.id)
    })
  }


  onSwipeRightComplete (course) {
    if (this.state.coursesPendingDelete.indexOf(course.id) >= 0) {
      const coursesPendingDelete = this.state.coursesPendingDelete.filter((id) => id != course.id)
      const courses = this.state.courses.filter((c) => c.id != course.id)

      this.setState({
        coursesPendingDelete: coursesPendingDelete
      }, () => {

        Storage
          .set("@MyGrades/courses", courses)
      })
    }
  }


  render () {
    // const courses = [ //this.state.courses
    //   Types.course.new(this.state.school),
    //   Types.course.new(this.state.school),
    //   Types.course.new(this.state.school)
    // ]
    const courses = "....".split(".").map((_, idx) => {
      return Object.assign({}, Types.course.new(this.state.school), { name: `PS10${idx + 1}` })
    })

    return (
      <View style={{ flex: 1 }}>
        <View style={{ maxHeight: 80, flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", margin: 0, backgroundColor: "#7BA7E1" }}>

          <Text style={{ color: "#FFF", flexGrow: 1, height: 80 }}>{this.state.school.name}</Text>

          <View style={{ flexGrow: 1, flexDirection: "column", alignItems: "flex-end", justifyContent: "center" }}>
            <View style={{ flex: 1, flexGrow: 1, height: 40 }}><Button color="#FFF" title="Thing A" onPress={() => null} /></View>
            <View style={{ flex: 1, flexGrow: 1, height: 40 }}><Button color="#FFF" title="Edit" onPress={() => null} /></View>
          </View>

        </View>

        <FlatList
          style={{ flex: 1, margin: 8 }}
          data={courses}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, idx) => item.id}
          />
      </View>
    )
  }


  renderItem (item) {
    const course = item.item

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
        onRightActionRelease={this.onSwipeRight.bind(this, course)}
        onRightActionComplete={this.onSwipeRightComplete.bind(this, course)}
        rightActionActivationDistance={150}
      >
        <TouchableHighlight
          onPress={() => null /*this.props.navigation.navigate("EditSchool", { schoolId: school.id })*/ }
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
              <Text style={{ fontSize: 16 }}>{course.name}</Text>
              <Text>{course.assignments.length} Assignments</Text>
            </View>
            <Text style={{ width: 100  }}>90%</Text>
            <Text style={{ width: 100  }}>A</Text>
          </View>
        </TouchableHighlight>
      </Swipeable>
    )
  }
}

SchoolShow.propTypes = {
  navigation: PropTypes.any.isRequired
}
