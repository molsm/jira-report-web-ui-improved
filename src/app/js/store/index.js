export default {
    state: {
        user: null,
        reportData: {},
        notification: {
            message: '',
            isError: false
        },
        loading: false
    },
    mutations: {
        setLoading(state, flag) {
            state.loading = flag;
        },
        setReportData(state, reportData) {
            state.reportData = reportData;
        },
        setNotification(state, notification) {
            state.notification.message = notification.message;
            state.notification.isError = notification.isError;
        }
    }
};
