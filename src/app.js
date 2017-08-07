import React, { Component } from "react"
import {
  AppRegistry,
  StyleSheet,
  AsyncStorage,
  Text,
  TouchableHighlight
} from "react-native"
import Storage from "./lib/storage.js"
import Types from "./lib/types.js"
import Styles from "./lib/styles.js"
import { StackNavigator } from "react-navigation"

import Home from "./views/home.js"
import SchoolForm from "./views/schoolForm.js"
import SchoolShow from "./views/schoolShow.js"
import AddCourse from "./views/addCourse.js"

import Button from "./components/button.js"

export default StackNavigator({
  Home: {
    screen: Home
  },
  AddSchool: {
    screen: SchoolForm,
    path: "schools/new"
  },
  EditSchool: {
    screen: SchoolForm,
    path: "schools/:schoolId/edit"
  },
  ShowSchool: {
    screen: SchoolShow,
    path: "schools/:schoolId"
  }
}, {
  initialRouteName: "Home"
})

// export default class App extends Component {
//   constructor (props) {
//     super(props)
//
//     this.state = {
//       routes: {
//         home: {
//           id: "home",
//           component: Home,
//           title: "MyGrades"
//         },
//
//         listSchools: {
//           id: "listSchools",
//           component: ListSchools,
//           title: "Schools"
//         },
//
//         addSchool: {
//           id: "addSchool",
//           component: AddSchool,
//           title: "New School"
//         },
//
//         addCourse: {
//           id: "addCourse",
//           component: AddCourse,
//           title: "Add Course"
//         }
//       },
//       schools: [],
//       courses: []
//     }
//   }
//
//   async update (msg, params) {
//     switch (msg) {
//       case "addSchool":
//         const now = Date.now()
//         const schoolWithTimestamps = Object.assign(
//           {},
//           params.school,
//           {
//             createdAt: now,
//             updatedAt: now
//           }
//         )
//
//         const schools = (await Storage.getSchools())
//         nextSchools = schools.concat(schoolWithTimestamps)
//
//         this.setState({
//           schools: nextSchools
//         }, () => {
//           Storage.setSchools(nextSchools)
//         })
//
//         break
//
//       case "navigateToListSchools":
//         this.goToRoute("listSchools", params.navigator)
//         break
//
//       case "navigateToAddSchool":
//         this.goToRoute("addSchool", params.navigator)
//         break
//
//       case "navigateToAddCourse":
//         this.goToRoute("addCourse", params.navigator)
//         break
//
//       case "navigatePop":
//         params.navigator.pop()
//         break
//     }
//   }
//
//   goToRoute (name, navigator) {
//     navigator.push(this.state.routes[name])
//   }
//
//   render() {
//     return (
//       <Navigator
//         initialRoute={this.state.routes.home}
//         renderScene={this.renderScene.bind(this)}
//         navigationBar={
//           <Navigator.NavigationBar
//             routeMapper={{
//               LeftButton: this.renderLeftButton.bind(this),
//               RightButton: this.renderRightButton.bind(this),
//               Title: this.renderTitle.bind(this)
//             }}
//             style={Styles.navbar}
//             />
//         }
//         style={Styles.navigator}
//         />
//     )
//   }
//
//   renderScene (route, navigator) {
//     const ComponentView = route.component
//     return (
//       <ComponentView
//         navigator={navigator}
//         update={this.update.bind(this)}
//         />
//     )
//   }
//
//   renderLeftButton (route, navigator, index, navState) {
//     if (index == 0) {
//       return (
//         <Button.Dark
//           onPress={() => this.update("navigateToListSchools", { navigator: navigator })}
//         >
//           Schools
//         </Button.Dark>
//       )
//     } else {
//       return (
//         <Button.Dark
//           onPress={() => this.update("navigatePop", { navigator: navigator })}
//         >
//           Back
//         </Button.Dark>
//       )
//     }
//   }
//
//   renderRightButton (route, navigator, index, navState) {
//     switch (route.id) {
//       case "home":
//         return (
//           <Button.Dark
//             onPress={() => {
//               this.update("navigateToAddCourse", { navigator: navigator })
//             }}
//           >
//             Add Course
//           </Button.Dark>
//         )
//
//       case "listSchools":
//         return (
//           <Button.Dark
//             onPress={() => {
//               this.update("navigateToAddSchool", { navigator: navigator })
//             }}
//           >
//             Add School
//           </Button.Dark>
//         )
//
//       default:
//         return null
//     }
//
//   }
//
//   renderTitle (route, navigator, index, navState) {
//     return (
//       <Text style={Styles.navbarTitle}>{route.title || "MyGrades"}</Text>
//     )
//   }
// }
