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
        maxGpa: 4.0
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
        percentage: null,
        weight: 0
      }
    }
  }
}
