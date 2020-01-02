import axios from 'axios';

const url = 'api/posts';

class PostService {
    //Get Posts
    static getPosts() {
        return new Promise(async (resolve, reject) => {
            try {
                 let res = await axios.get(url),
                     data = res.data;
                    console.log(data);
                     resolve(
                        data.map(post => ({
                             ...post,
                             createdAt : new Date(post.createdAt)
                         }))
                     )
            } catch(err) {
                reject(err);
            }
        });
    };

    //create post
    static insertPost(text) {
        return axios.post(url, {
            text,
        });
    }


    //Delete posts
    static deletePost(id) {
        return axios.delete(`${url}/${id}`);
    }
}

export default PostService;