import axios from 'axios'

const baseurl = 'http://localhost:3001'

export const fetchDrones = () => {
  return dispatch => {
    axios
      .get(`${baseurl}/data`)
      .then(response =>
        dispatch({
          type: 'FETCH_DRONES_SUCCESS',
          payload: response.data
        })
      )
      .catch(() =>
        dispatch({
          type: 'FETCH_DRONES_FAIL',
          payload: []
        })
      )
  }
}
