import Vue from "vue/types/umd";

<template>
    <v-card>
        <v-card-title class="text-h5" v-text="comment.name"></v-card-title>
        <v-card-text v-text="comment.body"></v-card-text>
        <v-card-text v-text="comment.email"></v-card-text>
    </v-card>
</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
    props: {
        comment: {
            type: Object,
            required: true,
        },
    }
})
</script>