import {
  AsyncStorage
} from "react-native"


listeners = new Object();


export default {
  addListener (key, fn, fallback) {
    listeners[key] = (listeners[key] || []).concat(fn)

    this
      .get(key, fallback)
      .then((v) => fn(v));
  },


  removeListener (key, fn) {
    listeners = listeners || { [key]: [] };
    listeners[key] = listeners[key].filter((method) => method != fn);
  },


  set (key, value) {
    const callbacks = listeners[key] || []

    return new Promise((resolve, reject) => {
      AsyncStorage.setItem(key, JSON.stringify(value), (err) => {
        for (let cb of callbacks) {
          cb(value)
        }

        if (err) {
          reject(err)
        } else {
          resolve(value)
        }
      })
    })
  },


  get (key, fallback) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key, (err, result) => {
        if (err) {
          reject(err)
        } else {
          if (result) {
            resolve(JSON.parse(result))
          } else {
            resolve(fallback)
          }
        }
      })
    })
  }
}
