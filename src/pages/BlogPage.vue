<template>
  <div id="blogbg">
    <div class="container">
      <div class="card text-dark cardbg" v-if="blog.id">
        <div class="card-body text-white">
          <h4 class="card-title">{{blog.title}}</h4>
          <p>{{blog.body}}</p>
          <p>{{blog.creator.name}}</p>
          <p>
            <i
              v-if="isCreator"
              class="fa fa-pencil"
              aria-hidden="true"
              @click="editToggle = !editToggle"
            ></i>
          </p>
          <form class="form-inline" @submit.prevent="editBlog" v-if="editToggle">
            <input
              type="text"
              class="form-control"
              placeholder="New Blog Title"
              aria-describedby="helpId"
              v-model="blogData.title"
            />
            <input
              type="text"
              class="form-control"
              placeholder="New Blog Body"
              aria-describedby="helpId"
              v-model="blogData.body"
            />
            <button type="submit" class="btn btn-warning">Edit Blog</button>
          </form>
          <button class="btn btn-outline-danger mt-2" v-if="isCreator" @click="deleteBlog">Delete</button>
        </div>
        <form class="form-inline" @submit.prevent="createComment">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              v-model="newComment.body"
              placeholder="Body"
              aria-describedby="helpId"
            />
          </div>
          <button type="submit" class="btn btn-success">
            <i class="fa fa-plus" aria-hidden="true">Post New Comment</i>
          </button>
        </form>
      </div>
      <div class="my-3">
        <comments-comp v-for="comment in comments" :key="comment.id" :commentProp="comment" />
      </div>
    </div>
  </div>
</template>

<script>
import commentsComp from "../components/CommentsComp.vue";
export default {
  name: "blog-Page",
  props: [],
  data() {
    return {
      blogData: {},
      editToggle: false,
      newComment: {},
    };
  },
  mounted() {
    this.$store.dispatch("getBlog", this.$route.params.blogId);
    this.$store.dispatch("getComment", this.$route.params.blogId);
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    blog() {
      return this.$store.state.activeBlog;
    },
    isCreator() {
      return this.$store.state.profile.email == this.blog.creatorEmail;
    },
    comments() {
      return this.$store.state.comments;
    },
  },
  methods: {
    editBlog() {
      this.blogData.id = this.$route.params.blogId;
      this.$store.dispatch("editBlog", this.blogData);
      this.editToggle = false;
      //  NOTE need to figure out form reset
      //   for (let key in this.blogData) {
      //     this.blogData[key] = null;
      //   }
    },
    deleteBlog() {
      this.blogData.id = this.$route.params.blogId;
      this.$store.dispatch("deleteBlog", this.blogData.id);
    },
    createComment() {
      let payload = {
        blog: this.$route.params.blogId,
        body: this.newComment.body,
      };
      this.$store.dispatch("createComment", payload);
    },
  },
  components: {
    commentsComp,
  },
};
</script>

<style scoped>
#blogbg {
  background-image: url("https://thumbs.gfycat.com/CornyShowyAiredale-size_restricted.gif");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>