import axios from 'axios'
import md5 from 'md5'



const today = new Date().toJSON().slice(0, 10).split('-').join('')

export const api = axios.create({
  baseURL: 'http://api.valantis.store:40000',
  headers: {
    'X-Auth': md5(`Valantis_${today}`),
  },
})




/* export const response = await api.post('/', {
  action: 'get_ids',
  params: {
      offset: 0,
      limit: 99999
  }
}) */

/* function UserData() {
  const data = useSelector(state => state.products.items)
  const loading = useSelector(state => state.products.loading)

  const dispatch = useDispatch()

  useEffect(() => {
    if (data != []) return
    dispatch(meRequestAsync())
  }, [])
  return {data, loading}
}

UserData() */



/* let arrId
async function GetId() {
  await api.post('/', {
    action: 'get_ids',
    params: {
      offset: 10,
      limit: 5
    }
  })
    .then((res) => {
      console.log('Post:', res.data.result);
      arrId = res.data.result
      return arrId
    })
    .catch((error) => {
      console.error('Error:', error);
      GetId()
    });
}


async function getItem(data) {
  await api.post('/', {
    action: 'get_items',
    params: {
      ids: data
    }
  })
    .then((res) => {
      console.log('Post created:', res.data.result);
      return res
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

async function getProducts() {

  const ids = await GetId()
  await console.log(ids, 'ids')
  await console.log(arrId, 'arr')
  const products = await getItem(arrId)
  await console.log(products, 'products')
}

getProducts() */