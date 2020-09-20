<template>
  <div id="homebg">
    <section class="home container">
      <div class="row">
        <div class="mt-3" v-if="$auth.isAuthenticated">
          <h3 class="text-white">Create A New Blog</h3>
          <form class="form-inline" @submit.prevent="createBlog">
            <div class="form-group">
              <input
                type="text"
                v-model="newBlog.title"
                class="form-control bg-white"
                placeholder="Title"
                aria-describedby="helpId"
              />
              <input
                type="text"
                class="form-control bg-white"
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
      <div v-if="$auth.isAuthenticated" class="row mt-3">
        <blogs-comp v-for="blog in allBlogs" :key="blog.id" :blogProp="blog" />
      </div>
      <div v-else class="row mt-5">
        <blogs-comp v-for="blog in allBlogs" :key="blog.id" :blogProp="blog" />
      </div>
    </section>
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
<style scoped>
#homebg {
  background-image: url("https://thumbs.gfycat.com/GrossEnormousAnglerfish-size_restricted.gif");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>
