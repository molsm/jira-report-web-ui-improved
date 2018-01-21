export default {
    state: {
        jiraHost: '',
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
        setJiraHost(state, host) {
            state.jiraHost = host;
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
