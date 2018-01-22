<template>
    <div class="form">
        <form v-on:submit="getReport" action="#" method="post">
            <label class="label">Jira Host</label>
            <div class="field has-addons">
                <p class="control">
                    <a class="button is-static">
                        https://
                    </a>
                </p>
                <p class="control is-expanded">
                    <input type="text" class="input" name="Jira Host" id="jirahost" placeholder="Jira Host"
                           v-model="jiraForm.jiraHost" :disabled="loading">
                </p>
            </div>
            <div class="field">
                <label class="label">Jira Username</label>
                <div class="control">
                    <input type="text" class="input" name="jirausername" id="jirausername" placeholder="Jira username"
                           v-model="jiraForm.jiraUsername" :disabled="loading">
                </div>
            </div>
            <div class="field">
                <label class="label">Jira Password</label>
                <div class="control">
                    <input type="password" class="input" placeholder="Jira Password"
                           v-model="jiraForm.jiraPassword" :disabled="loading">
                </div>
            </div>
            <div class="field">
                <label class="label">Jira Worklog Username</label>
                <div class="control">
                    <input type="text" class="input" placeholder="Jira Worklog Username"
                           v-model="jiraForm.jiraWorklogUsername" :disabled="loading">
                </div>
            </div>
            <div class="field">
                <label class="label">Pending Tasks</label>
                <div class="control">
                    <input type="text" class="input" placeholder="ID-123,ID-123,ID-123...."
                           v-model="jiraForm.jiraPendingTasks" :disabled="loading">
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
        const jiraForm = JSON.parse(this.$cookies.get('jiraForm'));

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
            this.$store.commit('setJiraHost', this.jiraForm.jiraHost);

            const jiraForm = JSON.stringify(Object.assign({}, this.jiraForm, { jiraPassword: undefined }));
            this.$cookies.set('jiraForm', jiraForm);

            const self = this;
            axios.post('/jira/buildReport', this.jiraForm)
                .then((response) => {
                    console.log(response);
                    self.$store.commit('setReportDataDoneToday', response.data.worklog);
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
