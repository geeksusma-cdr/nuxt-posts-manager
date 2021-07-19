<template>
    <div>
        <v-row>
            <v-col>
                <v-btn class="ma-2" color="blue darken-2" dark @click="$router.go(-1)">
                    <v-icon dark left>mdi-arrow-left</v-icon>Back
                </v-btn>
            </v-col>
            <v-col class="text-center">Comments for post {{ postId }}</v-col>
            <v-spacer></v-spacer>
        </v-row>
        <v-row>
            <v-row v-for="(comment) in comments" :key="comment.id">
                <CardComment :comment="comment"></CardComment>
            </v-row>
        </v-row>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CardComment from '~/components/comments/show/card-comment.vue'
import { Comment, PostPlugin } from '../plugins/posts/post-plugin'

export default Vue.extend({
    components: {
        CardComment
    },
    data() {
        return {
            comments: [] = [] as Comment[],
            postId: -1
        }
    },
    async asyncData(context) {
        const postId = context.params.id
        const postPlugin = new PostPlugin("https://jsonplaceholder.typicode.com/");
        const comments: Comment[] = await postPlugin.fetchComments(parseInt(postId));
        return { postId, comments }
    }
})
</script>
