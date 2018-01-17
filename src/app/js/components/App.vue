<template>
    <div>
        <notification-box></notification-box>
        <div class="content columns">
            <div class="column">
                <jira-form></jira-form>
            </div>
            <div class="column result">
                <result-box></result-box>
            </div>

        </div>
    </div>
</template>
<script>
import JiraForm from './JiraForm'
import ResultBox from './ResultBox'
import NotificationBox from './Notification'

export default {
    components: {
        'jira-form': JiraForm,
        'result-box': ResultBox,
        'notification-box': NotificationBox
    },
}
</script>
