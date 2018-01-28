<template>
    <transition name="fade">
        <div class="notification-box" v-if="hasSomethingToSay">
            <div v-bind:class="notificationType">
                <button class="delete" v-on:click="closeNotification()"></button>
                {{ message }}
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    methods: {
        closeNotification() {
            this.$store.commit('setNotification', { message: '', error: false });
        }
    },
    computed: {
        notificationType() {
            return {
                'notification': true,
                'is-warning': this.$store.state.notification.error,
                'is-success': !this.$store.state.notification.error && this.$store.state.notification.message
            }
        },
        hasSomethingToSay() {
            return this.$store.state.notification.message !== '';
        },
        message() {
            return this.$store.state.notification.message;
        }
    }
}
</script>
