<template>
  <div>
    <div class="card text-dark" v-if="blog.id">
      <div class="card-body text-white">
        <h4 class="card-title">{{blog.title}}</h4>
        <p>{{blog.body}}</p>
        <p>{{blog.creator.name}}</p>
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
    blog() {
      return this.$store.state.activeBlog;
    },
  },
};
</script>

<style>
</style>