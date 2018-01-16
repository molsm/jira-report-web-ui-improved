<template>
    <div class="form">
        <form v-on:submit="getReport" action="#" method="post">
            <div class="field">
                <label class="label">Jira Host</label>
                <div class="control">
                    <input type="text" class="input" name="Jira Host" id="jirahost" placeholder="Jira Host"
                           v-model="jiraForm.jiraHost">
                </div>
            </div>

            <div class="field">
                <label class="label">Jira Username</label>
                <div class="control">
                    <input type="text" class="input" name="jirausername" id="jirausername" placeholder="Jira username"
                           v-model="jiraForm.jiraUsername">
                </div>
            </div>

            <div class="field">
                <label class="label">Jira Password</label>
                <div class="control">
                    <input type="password" class="input" placeholder="Jira Password" v-model="jiraForm.jiraPassword">
                </div>
            </div>

            <div class="field">
                <label class="label">Jira Worklog Username</label>
                <div class="control">
                    <input type="text" class="input" placeholder="Jira Worklog Username" v-model="jiraForm.jiraWorklogUsername">
                </div>
            </div>

            <div class="field">
                <label class="label">Date</label>
                <div class="control">
                    <input type="text" class="input" placeholder="YYYY-MM-DD" v-model="jiraForm.jiraDate">
                </div>
            </div>

            <div class="field">
                <div class="control">
                    <button class="button is-link">Get report</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
import errorHandler from 'errorHandler';

export default {
    data() {
        return {
            jiraForm: {}
        };
    },

    methods: {
        getReport(event) {
            event.preventDefault();
            console.log(this.jiraForm);
            axios.post('/jira/buildReport', this.jiraForm)
                .then(function (response) {
                    console.log(response);
                })
                .catch(errorHandler);
        }
    }
}
</script>
