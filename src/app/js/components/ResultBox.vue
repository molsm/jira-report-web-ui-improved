<template>
    <div class="result-box">
        <div v-if="isInLoadingState">
            <grid-loader :loading="true" :color="'rgb(93, 197, 150)'" :size="'50px'"></grid-loader>
        </div>
        <div v-else>
            <p>Hello team,</p>
            <p class="section-heading">Summary of critical issues:</p>
            <p>n/a</p>
            <p class="section-heading done-today">Done today:</p>
            <div class="ticket" v-if="doneToday.length > 0" v-for="(ticket, index) in doneToday" >
                <p>
                    <span class="bold">{{ index + 1 }}. - {{ ticket.issue.key }} - </span>
                    <span>{{ ticket.issue.summary }} (<a href="#">Link</a>) - </span>
                    <span>{{ transformToHours(ticket.timeSpentSeconds) }}h</span>
                </p>
                <p class="ticket-comment">{{ ticket.comment }}</p>
            </div>
            <div class="ticket" v-if="doneToday.length < 1">
                <p>n/a</p>
            </div>
            <p class="section-heading">Exceeded estimate:</p>
            <p>n/a</p>
            <p class="section-heading">Pending tasks:</p>
            <p>n/a</p>
            <p class="section-heading">Input from PM / Client Required:</p>
            <p>n/a</p>
            <p class="summary">
                <span>Total time spent: {{ totalTimeSpent }}h</span><br/>
                <span>Approximate amount of pending tasks in hours: {{ approxPendingTaskHours }}h</span>
            </p>
            <p>Best regards,</p>
        </div>
    </div>
</template>
<script>
import GridLoader from 'vue-spinner/src/GridLoader'

export default {
    computed: {
        isInLoadingState() {
            return this.$store.state.loading;
        },
        doneToday() {
            return this.$store.state.reportData.doneToday;
        },
        totalTimeSpent() {
            return this.$store.state.reportData.doneToday.reduce(this.computeTotal, 0);
        },
        approxPendingTaskHours() {
            return 0;
        }
    },
    methods: {
        transformToHours: function (timeInSeconds) {
            return timeInSeconds / 60 / 60;
        },
        computeTotal(accumulator, ticket) {
            return accumulator + this.transformToHours(ticket.timeSpentSeconds);
        }
    },
    components: {
        GridLoader
    }
}
</script>
