<template>
  <div>
    <v-row>
      <v-col class="text-center">Post TODO Lists</v-col>
    </v-row>
    <v-snackbar v-model="snackbar">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-row>
      <v-row v-for="(post) in posts" :key="post.id">
        <v-col>
          <CardPost :post="post"></CardPost>
        </v-col>
      </v-row>
    </v-row>
  </div>
</template>

<script lang="ts">
import CardPost from "~/components/posts/show/card-post.vue";
import { Post } from "~/plugins/posts/post-repository";
import Vue from 'vue'

export default Vue.extend({
  components: {
    CardPost
  },
  data() {
    return {
      posts: [] = [] as Post[],
      message: '' as string,
      snackbar: false as boolean,
    }
  },
  async fetch() {

    const fetchedPosts: Post[] = await this.$posts.fetchPosts()
    if (fetchedPosts) {
      this.posts = fetchedPosts;
    }
  },
  methods: {
    async remove(id: number) {
      await this.$posts.deletePost(id)
    }
  },
  mounted() {
    this.$nuxt.$on('remove-post', (id: number) => {
      this.remove(id).then(r => {
        this.message = 'Succeeded'
        this.snackbar = true
        //this.posts = this.posts.splice(0, 1)
        this.posts = this.posts.filter((p) => p.id != id);
      })
    })
  },


})
</script>
