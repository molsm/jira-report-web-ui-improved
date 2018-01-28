import store from '../store'

const errorHandler = (error) => {
    const errorData = error.response.data;
    store.state.notification = { message: errorData.message, error: errorData.error };
}

export default errorHandler;
