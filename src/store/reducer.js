
const UPDATE_ITEMS = 'UPDATE_ITEMS'
const UPDATE_TOTALPAGES = 'UPDATE_TOTALPAGES'
const UPDATE_LOADING = 'UPDATE_LOADING'
const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS' 
const UPDATE_ERROR = 'UPDATE_ERROR' 

const initialState = {
    products: {
        items: [],
        totalPages: 0,
        loading: true,
        error: false,
    }


}

export const updateProducts = (items, totalPages, loading, error) => ({
    type: UPDATE_PRODUCTS,
    items: items,
    totalPages: totalPages,
    loading: loading,
    error: error,
})

export const updateTotalPages = (totalPages) => ({
    type: UPDATE_TOTALPAGES,
    totalPages: totalPages,
})

export const updateItems = (items) => ({
    type: UPDATE_ITEMS,
    items: items,
})

export const updateLoading = (loading) => ({
    type: UPDATE_LOADING,
    loading: loading,
})

export const updateError = (error, totalPages) => ({
    type: UPDATE_ERROR,
    totalPages: totalPages,
    error: error,
})

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_TOTALPAGES':
            return {
                ...state,
                products: {
                    items: state.products.items,
                    totalPages: action.totalPages,
                    loading: false,
                    error: false
                }
                
            }
        case 'UPDATE_PRODUCTS':
            return {
                ...state,
                products: {
                    items: action.items,
                    totalPages: action.totalPages,
                    loading: action.loading,
                    error: action.error
                }
            }
            case 'UPDATE_ITEMS':
            return {
                ...state,
                products: {
                    items: action.items,
                    totalPages: state.products.totalPages,
                    loading: state.products.loading,
                    error: state.products.error
                }
            }
            case 'UPDATE_LOADING':
            return {
                ...state,
                products: {
                    items: state.products.items,
                    totalPages: state.products.totalPages,
                    loading: action.loading,
                    error: state.products.error
                }
            }
            case 'UPDATE_ERROR':
            return {
                ...state,
                products: {
                    items: state.products.items,
                    loading: state.products.loading,
                    error: action.error,
                    totalPages: action.totalPages,
                }
            }
        default:
            return state
    }
}

