<template>
  <div class="home container">
    <div class="row">
      <div v-if="$auth.isAuthenticated">
        <h3>Create a Blog</h3>
        <form class="form-inline" @submit.prevent="createBlog">
          <div class="form-group">
            <input
              type="text"
              v-model="newBlog.title"
              class="form-control"
              placeholder="Title"
              aria-describedby="helpId"
            />
            <input
              type="text"
              class="form-control"
              v-model="newBlog.body"
              placeholder="Body"
              aria-describedby="helpId"
            />
          </div>
          <button type="submit" class="btn btn-success">
            <i class="fa fa-plus" aria-hidden="true">Post New Blog</i>
          </button>
        </form>
      </div>
    </div>
    <div class="row mt-3">
      <blogs-comp v-for="blog in allBlogs" :key="blog.id" :blogProp="blog" />
    </div>
  </div>
</template>

<script>
import blogsComp from "../components/BlogsComp";
export default {
  name: "home",
  data() {
    return {
      newBlog: {},
    };
  },
  mounted() {
    this.$store.dispatch("getAllBlogs");
  },
  methods: {
    createBlog() {
      this.$store.dispatch("createBlog", this.newBlog);
    },
  },
  computed: {
    allBlogs() {
      return this.$store.state.blogs;
    },
  },
  components: {
    blogsComp,
  },
};
</script>
