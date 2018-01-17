<template>
    <div class="result-box">
        <div v-if="isInLoadingState">
            <grid-loader :loading="true" :color="'rgb(93, 197, 150)'" :size="'50px'"></grid-loader>
        </div>
        <div v-else>
            <span>Hello!</span>
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
