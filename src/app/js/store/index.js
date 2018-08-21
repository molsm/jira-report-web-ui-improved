import _ from 'lodash';

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
    },
    actions: {
        filterTicketsDoneToday({ commit }, data) {
            const filteredTickets = {};

            data.forEach((ticket) => {
                const issueKey = ticket.issue.key;
                const found = _.find(filteredTickets, task => task.issue.key === issueKey);

                if (found) {
                    filteredTickets[issueKey].description += '\n' + ticket.description; // eslint-disable-line
                    filteredTickets[issueKey].timeSpentSeconds += ticket.timeSpentSeconds;
                } else {
                    filteredTickets[issueKey] = ticket;
                }
            });

            commit('setReportDataDoneToday', _.map(filteredTickets, ticket => ticket));
        }
    }
};
