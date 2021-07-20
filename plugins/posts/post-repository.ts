import axios from 'axios';

export interface Post {

    userId: number,
    id: number,
    title: string,
    body: string

}

export interface Comment {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}

export interface PostRepository {

    fetchPosts(): Promise<Post[]>;

    fetchComments(postId: number): Promise<Comment[]>;

    deletePost(id: number): Promise<any>;
}


export class PostRepositoryImpl implements PostRepository {

    private url: string;// = 'https://jsonplaceholder.typicode.com/';

    public constructor(url: string) {
        this.url = url;
    }
    async deletePost(id: number): Promise<any> {
        return await axios.delete(this.url + 'posts/' + id).then(r => {
            if (r.status === 404) {
                throw new Error('Post not found, it could not be deleted');
            }
            if (r.status >= 500) {
                throw new Error('Post could not be deleted due an internal system error');
            }
            return r;
        })
    }
    async fetchComments(postId: number): Promise<Comment[]> {
        return await axios.get(this.url + 'posts/' + postId + "/comments").then(r => {
            return Promise.resolve(r.data)
        });
    }

    async fetchPosts(): Promise<Post[]> {

        return await axios.get(this.url + 'posts').then(r => {
            return Promise.resolve(r.data)
        });

    }

}