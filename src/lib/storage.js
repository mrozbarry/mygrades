import {
  AsyncStorage
} from "react-native"

const SCHOOLS_KEY = "@MyGrades/schools"
const COURSES_KEY = "@MyGrades/courses"
const DEFAULT_SCHOOL_KEY = "@MyGrades/defaultSchool"

export default {
  getSchools () {
    return this._getCollection(SCHOOLS_KEY)
  },

  setSchools (schools) {
    return this._setCollection(SCHOOLS_KEY, schools)
      .then(() => {
        return this.getDefaultSchool()
      })
      .then((defaultSchool) => {
        school = schools.find((s) => s.id == defaultSchool)
        if (school) {
          return Promise.resolve()
        } else {
          return this.setDefaultSchool(null)
        }
      })
  },

  getCourses () {
    return this._getCollection(COURSES_KEY)
  },

  setCourses (courses) {
    return this._setCollection(COURSES_KEY, courses)
  },

  getDefaultSchool () {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(DEFAULT_SCHOOL_KEY, (err, result) => {
        if (err) {
          reject(err)
        } else {
          try {
            resolve(JSON.parse(result))
          } catch (e) {
            resolve(null)
          }
        }
      })
    })
  },

  setDefaultSchool (defaultSchool) {
    return new Promise((resolve, reject) => {
      AsyncStorage.setItem(DEFAULT_SCHOOL_KEY, JSON.stringify(defaultSchool), (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  },

  _getCollection (name) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(name, (err, result) => {
        if (err) {
          reject(err)
        } else {
          try {
            resolve(JSON.parse(result))
          } catch (e) {
            resolve([])
          }
        }
      })
    })
  },

  _setCollection (name, collection) {
    return new Promise((resolve, reject) => {
      AsyncStorage.setItem(name, JSON.stringify(collection), (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
}
