 <template>
    <div class="container">
        <v-form
        v-model="valid"
        class="text-center"
        >
           <v-text-field
            v-model="text"
            label="New Post"
            :rules="validate"
            required
          @keydown.enter ="preventSubmit"
          ></v-text-field>
          <v-btn
            :disabled="!valid"
            @click="createPost()"
          >
            Submit
          </v-btn>
        </v-form>
        <br>
        <br>
        <h1 class="text-center">Latest Posts</h1>
        <!-- create post here -->
        <hr/>
        <p class="error" v-if="error">{{error}}</p>
        <div class="posts-container">
          <div class="post text-center"
          v-for="post in posts"
          v-bind:key="post._id"
          @dblclick="deletePost(post._id)"
          >
              {{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`}}
              <p class="text" transition="scroll-y-transition">{{post.text}}</p>
          </div>
        </div>
    </div>
</template>

<script> 
  import PostService from '../postService';

  export default {
    name: 'PostComponent',
    data() {
      return {
        valid: true,
        validate: [
          v => !!v || 'Text is required'
        ],
        posts: [],
        error: '',
        text: ''
      }
    },

    async created() {
      try {
        this.posts = await PostService.getPosts();
      } catch(err) {
          this.error = err.message; 
      }
    },
    methods: {
       preventSubmit(e) {
         e.preventDefault()
       },
        async createPost() {
          await PostService.insertPost(this.text);
          this.posts = await PostService.getPosts();
          this.text = '';
        },

        async deletePost(id) {
          await PostService.deletePost(id);
          this.posts = await PostService.getPosts();
        }
    },

    
  }
</script>

<style scoped>
  div.container {
    max-width: 800px;
    margin : 0 auto;
  }

  p.error {
    border : 1px solid #ff5b5f;
    background-color: #ffc5c1;
    padding: 10px;
    margin-bottom: 15px;
  }

  div.post {
    position: relative;
    border: 1px solid #5bd658;
    background-color: #bcffb8;
    padding: 10px 10px 30px 10px;
    margin-bottom: 15px;
  }

  div.created-at {
    position: relative;
    top: 0;
    left: 0;
    padding: 5px 15px 5px 15px;
    background-color: darkgreen;
    color: white;
    font-size: 13px;
  }

  p.text {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 0;
  }
  
</style>
