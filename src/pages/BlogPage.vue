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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "blog-Comp",
  props: ["blogProp"],
  data() {
    return { blogData: {}, editToggle: false };
  },
  mounted() {
    this.$store.dispatch("getBlog", this.$route.params.blogId);
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    blog() {
      return this.$store.state.activeBlog;
    },
    isCreator() {
      console.log(this.$store.state.profile);
      return this.$store.state.profile.email == this.blog.creatorEmail;
    },
  },
  methods: {
    editBlog() {
      this.blogData.id = this.$route.params.blogId;
      this.$store.dispatch("editBlog", this.blogData);
      this.editToggle = false;
    },
  },
};
</script>

<style>
</style>