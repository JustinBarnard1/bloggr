<template>
  <div>
    <div class="card text-dark" v-if="blog.id">
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
        <button class="btn btn-outline-info mt-2">Add Comment</button>
      </div>
      <comments-comp v-for="comment in comments" :key="comment.id" :commentProp="comment" />
    </div>
  </div>
</template>

<script>
import CommentsComp from "../components/CommentsComp.vue";
export default {
  name: "blog-Comp",
  props: ["blogProp"],
  data() {
    return { blogData: {}, editToggle: false };
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
  },
  components: {
    CommentsComp,
  },
};
</script>

<style>
</style>