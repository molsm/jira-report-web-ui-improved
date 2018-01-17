<template>
    <div class="notification is-success">
        <button class="delete"></button>
        {{ message }}
    </div>
</template>
<script>
export default {
    data() {
        return {
            message: 'Notification'
        }
    }
}
</script>
