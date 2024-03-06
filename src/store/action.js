import { api } from "../api/api"
import { updateError, updateProducts, updateTotalPages } from "./reducer"



export async function fetchData(dispatch, error) {
    if (error) return
    try {
      const response = await api.post('/', {
        action: 'get_ids',
        params: {
            offset: 0,
            limit: 9999
        }
    })
    dispatch(updateTotalPages(Math.ceil(response.data.result.length / 50), false));
    } catch (error) {
      console.log(error.message)
      fetchData(dispatch)
    }
}

export async function fetchGetId(offset) {
    try {
        const getId = await api.post('/', {
            action: 'get_ids',
            params: {
                offset: offset,
                limit: 50
            }
        })
        return getId.data.result
    } catch (error) {
        console.log('Error: ', error.message)
        return fetchGetId(offset)
    }
}


export async function fetchGetItems(offset, ids) {

  try {
      const getItem = await api.post('/', {
          action: 'get_items',
          params: {
              ids: ids,
          }
      })

      return getItem.data.result.filter((elem, index, array) => array.findIndex(item => (item.id === elem.id)) === index)

  } catch (error) {
      console.log('Error: ', error.message)
      return fetchGetItems(offset, ids)
  }
}


export async function fetchFilter(filter, value, dispatch) { 
    try {
        const response = await api.post('/', {
            action: 'filter',
    
            params: { [filter.field]: value}
        })
    
        if (response.data.result.length <= 0) return dispatch(updateError(true, 0 ))
    
        const getItem = await api.post('/', {
            action: 'get_items',
            params: {
                ids: response.data.result,
            }
        })

        const getItemFilter = getItem.data.result.filter((elem, index, array) => array.findIndex(item => (item.id === elem.id)) === index)
    
        return dispatch(updateProducts(getItemFilter, Math.ceil(response.data.result.length / 50), false, false))
    
    } catch (error) {
        console.log('Error: ', error.message)
        return fetchFilter(filter, value, dispatch)
    }
}


