<template>
    <div class="result-box">
        <div v-if="isInLoadingState">
            <grid-loader :loading="true" :color="'rgb(93, 197, 150)'" :size="'50px'"></grid-loader>
        </div>
        <div v-else>
            <p>Hello team,</p>
            <p class="section-heading">Summary of critical issues:</p>
            <p>n/a</p>
            <p class="section-heading">Done today:</p>
            <p>n/a</p>
            <p class="section-heading">Exceeded estimate:</p>
            <p>n/a</p>
            <p class="section-heading">Pending tasks:</p>
            <p>n/a</p>
            <p class="section-heading">Input from PM / Client Required:</p>
            <p>n/a</p>
            <p class="summary">
                <span>Total time spent: h</span>
                <span>Approximate amount of pending tasks in hours: h</span>
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
        }
    },
    components: {
        GridLoader
    }
}
</script>
