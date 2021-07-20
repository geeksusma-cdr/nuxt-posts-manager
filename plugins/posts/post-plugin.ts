import Vue from 'vue'
import { PostRepositoryImpl } from './post-repository'

declare module 'vue/types/vue' {
    interface Vue {
        $posts: PostRepositoryImpl
    }
}

Vue.prototype.$posts = new PostRepositoryImpl('https://jsonplaceholder.typicode.com/')