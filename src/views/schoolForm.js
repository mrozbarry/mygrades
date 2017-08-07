import React, { Component } from 'react'
import PropTypes from "prop-types"
import {
  AppRegistry,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Slider,
  StyleSheet
} from 'react-native'
import Types from "../lib/types.js"
import Storage from "../lib/storage.js"
import Styles from "../lib/styles.js"


const Grades = [
  "a+", "a", "a-",
  "b+", "b", "b-",
  "c+", "c", "c-",
  "d+", "d", "d-",
  "f"
]


export default class SchoolForm extends Component {
  static navigationOptions = ({ navigation }) => {
    const title =
      navigation.state.params && navigation.state.params.schoolId ?
      "Edit School" :
      "Add School"

    return {
      title: title
    }
  }


  constructor (props) {
    super(props)

    this.state = Types.school.new()
  }


  componentDidMount () {
    this.getInitialData()
  }


  async getInitialData () {
    const { params } = this.props.navigation.state

    if (!params || !params.schoolId) {
      return
    }

    const schools = await Storage.get("@MyGrades/schools", [])
    const school = schools.filter((s) => s.id == params.schoolId)[0]
    this.setState(school)
  }


  onNameChanged (str) {
    this.setState({
      name: str
    })
  }


  onMaxGPAChanged (gpa) {
    this.setState({
      maxGpa: gpa
    })
  }


  onGradeSliderChanged (grade, value) {
    this.setState({
      grades: Object.assign(
        {},
        this.state.grades,
        { [grade]: value + "" }
      )
    })
  }


  listItems () {
    return [
      {
        type: "input",
        label: "Name of School",
        statePath: ["name"],
        changeCallback: this.onNameChanged.bind(this),
        inputOptions: {
          returnKeyType: "next"
        }
      },
      {
        type: "input",
        label: "GPA Scale",
        statePath: ["maxGpa"],
        changeCallback: this.onMaxGPAChanged.bind(this),
        inputOptions: {
          returnKeyType: "next",
          keyboardType: "numeric"
        }
      }
    ].concat(
      this.gradeItems()
    ).concat(
      { type: "save" }
    ).map((item, idx) => {
      return Object.assign({}, item, { key: idx })
    })
  }


  gradeItems () {
    return Grades.slice(0,-1).map((grade, idx) => {
      return {
        type: "grade",
        grade: grade,
        sliderCallback: this.onGradeSliderChanged.bind(this, grade)
      }
    })
  }


  onSave () {
    Storage
      .get("@MyGrades/schools", [])
      .then((schools) => {
        const nextSchools =
          schools
          .filter((s) => s.id != this.state.id)
          .concat(this.state)
        return Storage.set("@MyGrades/schools", nextSchools)
      })
      .then(() => {
        this.props.navigation.goBack()
      })
  }


  render () {
    return (
      <FlatList
        data={this.listItems()}
        renderItem={this.renderListItem.bind(this)}
        style={{
          backgroundColor: "#FFF",
          flexShrink: 1,
          flexGrow: 0,
          margin: 8
        }}
        />
    )
  }


  renderListItem (item) {
    switch (item.item.type) {
      case "input":
        return (
          this.renderInput(
            item.item.label,
            item.item.statePath,
            item.item.changeCallback,
            item.item.inputOptions
          )
        )

      case "grade":
        return (
          this.renderGrade(
            item.item.grade,
            item.item.sliderCallback
          )
        )

      case "save":
        return (
          <Button
            title="Save"
            onPress={this.onSave.bind(this)}
            />
        )
    }
  }


  renderInput (label, statePath, method, options) {
    const value = statePath.reduce((memo, path) => {
      return memo[path]
    }, this.state) + ""

    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: 48,
          padding: 8,
          marginBottom: 4,
          borderBottomColor: "#DDD",
          borderBottomWidth: StyleSheet.hairlineWidth
        }}
      >
        <Text
          style={{
            width: 120
          }}
        >
          {label}
        </Text>
        <View
          style={{
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: "#EEE",
            flexGrow: 1,
          }}
        >
          <TextInput
            value={value}
            onChangeText={method}
            editable={true}
            style={{
              flex: 1,
              padding: 4,
              textAlign: "center"
            }}
            {...options}
            />
        </View>
      </View>
    )
  }


  renderGrade (grade, sliderCallback) {
    const value = this.state.grades[grade]
    const gradeIndex = Grades.indexOf(grade)

    const maxIndex = gradeIndex - 1
    const maxKey = Grades[maxIndex]
    const maxValue =
      maxIndex >= 0 ?
      (parseInt(this.state.grades[maxKey], 10)) :
      100

    const minIndex = gradeIndex + 1
    const minKey = Grades[minIndex]
    const minValue =
      minKey ?
      (parseInt(this.state.grades[minKey], 10)) :
      0

    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: 48,
          padding: 8,
          marginBottom: 4,
          borderBottomColor: "#DDD",
          borderBottomWidth: StyleSheet.hairlineWidth
        }}
      >
        <Text
          style={{
            flexShrink: 1,
            flexGrow: 0
          }}
        >
          {grade.toUpperCase()}
        </Text>
        <Slider
          minimumValue={minValue + 1}
          maximumValue={maxValue - 1}
          onValueChange={sliderCallback}
          step={1}
          style={{ flexGrow: 1, flexShrink: 0 }}
          value={parseInt(value, 10)}
          />
        <Text style={{ width: 75, textAlign: "right" }}>{value} to {maxValue}</Text>
      </View>
    )
  }
}

SchoolForm.propTypes = {
  navigation: PropTypes.any.isRequired
}

