<template>
    <div class="form">
        <form v-on:submit="getReport" action="#" method="post">
            <div class="field">
                <label class="label">Token</label>
                <div class="control">
                    <input type="password" class="input" placeholder="Token"
                           v-model="jiraForm.token" :disabled="loading">
                </div>
                <p class="help">Jira -> Tempo -> Tempo Settings -> API Integration -> Get Access Token</p>
            </div>
            <div class="field">
                <label class="label">Jira Worklog Username</label>
                <div class="control">
                    <input type="text" class="input" placeholder="Jira Worklog Username"
                           v-model="jiraForm.jiraWorklogUsername" :disabled="loading">
                </div>
            </div>
            <div class="field">
                <label class="label">Date</label>
                <div class="control">
                    <input type="text" class="input" placeholder="YYYY-MM-DD" v-model="jiraForm.jiraDate" :disabled="loading">
                </div>
            </div>

            <div class="field">
                <div class="control">
                    <button class="button is-link" :disabled="loading">Get report</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
import errorHandler from '../utils/errorHandler';

export default {
    data() {
        return {
            jiraForm: {
                jiraDate: new Date().toJSON().slice(0, 10)
            }
        };
    },
    created() {
        const jiraForm = JSON.parse(localStorage.getItem('jiraForm'));

        if (jiraForm) {
            this.jiraForm = jiraForm;
        }
    },
    computed: {
        loading() {
            return this.$store.state.loading;
        }
    },
    methods: {
        getReport(event) {
            event.preventDefault();
            this.$store.commit('setLoading', true);

            const jiraForm = JSON.stringify(Object.assign({}, this.jiraForm));
            localStorage.setItem('jiraForm', jiraForm);

            const self = this;
            axios.post('/jira/buildReport', this.jiraForm)
                .then((response) => {
                    self.$store.dispatch('filterTicketsDoneToday', response.data.worklog);
                    self.$store.commit('setReportDataPendingTasks', response.data.pendingIssues);
                    self.$store.commit('setLoading', false);
                })
                .catch((response) => {
                    errorHandler(response);
                    self.$store.commit('setLoading', false);
                });
        }
    }
}
</script>
