import Vue from "vue/types/umd";

<template>
    <v-card>
        <v-card-title class="text-h5" v-text="post.title"></v-card-title>
        <v-card-text v-text="post.body"></v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <router-link :to="`/posts/${post.id}/comments`">
                <v-btn icon>
                    <v-icon>mdi-message-text</v-icon>
                </v-btn>
            </router-link>

            <v-btn @click="remove()">
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
    props: {
        post: {
            type: Object,
            required: true,
        }
    },
    methods: {
        remove() {
            this.$nuxt.$emit('remove-post', this.post.id);
        }
    }
})
</script>