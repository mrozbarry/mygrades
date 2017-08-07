import PropTypes from "prop-types"
import uuid from "uuid/v4"

const school = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  maxGpa: PropTypes.number,
  createdAt: PropTypes.number.isRequired,
  updatedAt: PropTypes.number.isRequired
})

const course = PropTypes.shape({
  id: PropTypes.string.isRequired,
  schoolId: PropTypes.string,
  name: PropTypes.string.isRequired,
  professor: PropTypes.string,
  assignments: PropTypes.arrayOf(assignment).isRequired,
  createdAt: PropTypes.number.isRequired,
  updatedAt: PropTypes.number.isRequired
})

const assignment = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  percentage: PropTypes.number,
  weight: PropTypes.number.isRequired,
  createdAt: PropTypes.number.isRequired,
  updatedAt: PropTypes.number.isRequired
})

export default {
  school: {
    propType: school,
    new () {
      return {
        id: uuid(),
        name: "",
        maxGpa: "4.0",
        grades: {
          "a+": "90",
          "a": "85",
          "a-": "80",
          "b+": "77",
          "b": "73",
          "b-": "70",
          "c+": "67",
          "c": "65",
          "c-": "60",
          "d+": "57",
          "d": "53",
          "d-": "50",
          "f": "0",
        }
      }
    }
  },

  course: {
    propType: course,
    new (school) {
      return {
        id: uuid(),
        schoolId: school ? school.id : null,
        name: "",
        professor: "",
        credits: 0.5,
        assignments: []
      }
    }
  },

  assignment: {
    propType: assignment,
    new () {
      return {
        id: uuid(),
        name: "",
        due: (Date.now()),
        percentage: null,
        weight: 0
      }
    }
  }
}
