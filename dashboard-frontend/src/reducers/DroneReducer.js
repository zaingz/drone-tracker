export default function (state = [], action) {
  switch (action.type) {
    case 'FETCH_DRONES_SUCCESS':
      return [...action.payload]
    case 'FETCH_DRONES_FAIL':
      return []
  }
  return state
}
