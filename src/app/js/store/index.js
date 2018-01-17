export default {
    state: {
        user: null,
        reportData: {},
        notification: {
            notificationMessage: '',
            isError: false
        },
        loading: false
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setReportData(state, reportData) {
            state.reportData = reportData;
        },
        setNotificationMessage(state, message) {
            state.notification.message = message;
        },
        setNotificationErrorFlag(state, isError) {
            state.notification.isError = isError;
        }
    }
};
