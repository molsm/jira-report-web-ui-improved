export default {
    state: {
        user: null,
        reportData: {
            doneToday: [],
            pendingTasks: []
        },
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
        },
        setReportDataDoneToday(state, data) {
            state.reportData.doneToday = data;
        },
        setReportDataPendingTasks(state, data) {
            state.reportData.pendingTasks = data;
        }
    }
};
