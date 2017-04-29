import React, { Component } from "react"
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  AsyncStorage,
  Text,
  TouchableHighlight
} from "react-native"
import Storage from "./lib/storage.js"
import Types from "./lib/types.js"

import Home from "./views/home.js"
import ListSchools from "./views/listSchools.js"
import AddSchool from "./views/addSchool.js"
import AddCourse from "./views/addCourse.js"

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      routes: {
        home: {
          id: "home",
          component: Home,
          title: "MyGrades"
        },

        listSchools: {
          id: "listSchools",
          component: ListSchools,
          title: "Schools"
        },

        addSchool: {
          id: "addSchool",
          component: AddSchool,
          title: "New School"
        },

        addCourse: {
          id: "addCourse",
          component: AddCourse,
          title: "Add Course"
        }
      }
    }
  }

  async update (msg, params) {
    switch (msg) {
      case "addSchool":
        const now = Date.now()
        const schoolWithTimestamps = Object.assign(
          {},
          params.school,
          {
            createdAt: now,
            updatedAt: now
          }
        )

        const nextSchools =
          this.
          state.
          schools.
          concat(schoolWithTimestamps)

        await Storage.setSchools(nextSchools)
        break

      case "navigateToListSchools":
        this.goToRoute("listSchools", params.navigator)
        break

      case "navigateToAddSchool":
        this.goToRoute("addSchool", params.navigator)
        break

      case "navigateToAddCourse":
        this.goToRoute("addCourse", params.navigator)
        break

      case "navigatePop":
        params.navigator.pop()
        break
    }
  }

  goToRoute (name, navigator) {
    navigator.push(this.state.routes[name])
  }

  render() {
    return (
      <Navigator
        initialRoute={this.state.routes.home}
        renderScene={this.renderScene.bind(this)}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: this.renderLeftButton.bind(this),
              RightButton: this.renderRightButton.bind(this),
              Title: this.renderTitle.bind(this)
            }}
            style={styles.navbar}
            />
        }
        style={{ flex: 1, paddingTop: 64 }}
        />
    )
  }

  renderScene (route, navigator) {
    const ComponentView = route.component
    return (
      <ComponentView
        navigator={navigator}
        update={this.update.bind(this)}
        />
    )
  }

  renderLeftButton (route, navigator, index, navState) {
    if (index == 0) {
      return (
        <TouchableHighlight
          onPress={() => this.update("navigateToListSchools", { navigator: navigator })}
          style={styles.navbarButton}
        >
          <Text style={styles.navbarButtonText}>Schools</Text>
        </TouchableHighlight>
      )
    } else {
      return (
        <TouchableHighlight
          onPress={() => this.update("navigatePop", { navigator: navigator })}
          style={styles.navbarButton}
        >
          <Text style={styles.navbarButtonText}>Back</Text>
        </TouchableHighlight>
      )
    }
  }

  renderRightButton (route, navigator, index, navState) {
    switch (route.id) {
      case "home":
        return (
          <TouchableHighlight
            onPress={() => {
              this.update("navigateToAddCourse", { navigator: navigator })
            }}
            style={styles.navbarButton}
          >
            <Text style={styles.navbarButtonText}>Add Course</Text>
          </TouchableHighlight>
        )

      case "listSchools":
        return (
          <TouchableHighlight
            onPress={() => {
              this.update("navigateToAddSchool", { navigator: navigator })
            }}
            style={styles.navbarButton}
          >
            <Text style={styles.navbarButtonText}>Add School</Text>
          </TouchableHighlight>
        )

      default:
        return null
    }

  }

  renderTitle (route, navigator, index, navState) {
    return (
      <Text style={styles.navbarTitle}>{route.title || "MyGrades"}</Text>
    )
  }
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#A239CA"
  },
  navbarButton: {
    padding: 8,
    backgroundColor: "#A239CA"
  },
  navbarButtonText: {
    color: "#FFF"
  },
  navbarTitle: {
    padding: 8,
    color: "#FFF"
  }
})
