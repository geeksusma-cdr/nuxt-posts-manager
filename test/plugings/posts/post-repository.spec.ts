import axios from 'axios';
import { Comment, Post, PostRepositoryImpl } from '../../../plugins/posts/post-repository';
import { PostsData } from "../../data/posts-data";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const POST_URL: string = "http://mocks/";

describe('Post Plugin to perform operations using an http client', () => {

    let plugin: PostRepositoryImpl;

    beforeEach(() => {
        plugin = new PostRepositoryImpl(POST_URL);
    })

    test('should retrieve posts when fetch', async () => {
        //given
        const expectedPosts = PostsData.expectedPosts();
        mockedAxios.get.mockImplementation(() => Promise.resolve({ data: expectedPosts }));

        //when
        const posts: Post[] = await plugin.fetchPosts();

        //then
        expect(posts).toEqual(expectedPosts);
        expect(mockedAxios.get).toBeCalledWith(POST_URL + 'posts');
    })

    test('should retrieve comments when post id found', async () => {
        //given
        const expectedComments = PostsData.expectedComments();
        mockedAxios.get.mockImplementation(() => Promise.resolve({ data: expectedComments }));
        const postWithComments: number = 1;

        //when
        const comments: Comment[] = await plugin.fetchComments(postWithComments);

        //then
        expect(comments).toEqual(expectedComments);
        expect(mockedAxios.get).toBeCalledWith(POST_URL + 'posts/' + postWithComments + '/comments');
    })

    test('should delete post when id found', async () => {
        //given
        mockedAxios.delete.mockImplementation(() => Promise.resolve({
            status: 200,
        }))
        const post: number = 1;

        //when
        await plugin.deletePost(post);

        //then
        expect(mockedAxios.delete).toBeCalledWith(POST_URL + "posts/" + post);
    })

    test('should throw not found error when id not found', async () => {
        //given
        mockedAxios.delete.mockImplementation(() => Promise.resolve({
            status: 404,
            message: 'Not found'
        }));
        const post: number = 1;

        //when - then

        await expect(plugin.deletePost(post)).rejects.toThrow('Post not found, it could not be deleted')

    });

    test('should throw system error when could not delete', async () => {
        //given
        mockedAxios.delete.mockImplementation(() => Promise.resolve({
            status: 500,
            message: 'Internal Service Error'
        }));
        const post: number = 1;

        //when - then

        await expect(plugin.deletePost(post)).rejects.toThrow('Post could not be deleted due an internal system error')

    });
})

