<template>
    <div class="form">
        <form v-on:submit="getReport" action="#" method="post">
            <div class="field">
                <label class="label">Tempo Token*</label>
                <div class="control">
                    <input type="password" class="input" placeholder="Tempo token"
                           v-model="jiraForm.token" :disabled="loading">
                </div>
                <p class="help">Jira -> Tempo -> Tempo Settings -> API Integration -> Get Access Token</p>
            </div>
            <div class="field">
                <label class="label">Tempo Account ID*</label>
                <div class="control">
                    <input type="text" class="input" placeholder="Tempo Account ID"
                           v-model="jiraForm.jiraWorklogUsername" :disabled="loading">
                </div>
                <p class="help">Jira ->
                    <a href="https://scandiweb.atlassian.net/secure/ViewProfile.jspa"
                       target="_blank">Go to Your Profile</a>
                    -> Copy part from URL, that comes after "https://*.atlassian.net/people/"
                </p>
            </div>
            <div class="field">
                <label class="label">Atlassian Profile Email*</label>
                <div class="control">
                    <input type="text" class="input" placeholder="Atlassian Profile Email"
                           v-model="jiraForm.jiraEmail" :disabled="loading">
                </div>
            </div>
            <div class="field">
                <label class="label">Atlassian Token*</label>
                <div class="control">
                    <input type="password" class="input" placeholder="Atlassian Token"
                           v-model="jiraForm.atlassianToken" :disabled="loading">
                </div>
                <p class="help">
                    <a href="https://id.atlassian.com/manage/api-tokens"
                       target="_blank">Atlassian API Tokens</a>
                </p>
            </div>

            <div class="field">
                <label class="label">Date*</label>
                <div class="control">
                    <input type="text" class="input" placeholder="YYYY-MM-DD" v-model="jiraForm.jiraDate" :disabled="loading">
                </div>
            </div>

            <div id="second-form">

                <label class="label">Second workspace data (optional)</label>
                <div class="field">
                    <label class="label">Tempo Token</label>
                    <div class="control">
                        <input type="password" class="input" placeholder="Tempo token"
                               v-model="jiraForm.token2" :disabled="loading">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Tempo Account ID</label>
                    <div class="control">
                        <input type="text" class="input" placeholder="Tempo Account ID"
                               v-model="jiraForm.jiraWorklogUsername2" :disabled="loading">
                    </div>
                </div>
            </div>
            <br>
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
