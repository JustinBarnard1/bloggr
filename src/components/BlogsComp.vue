<template>
  <div class="blog-comp col-4">
    <router-link :to="{name: 'BlogDetails', params:{blogId: blogProp.id}}">
      <div class="card cardbg text-dark my-3">
        <div class="card-body text-white">
          <h4 class="card-title">{{blogProp.title}}</h4>
          <p>{{blogProp.creator.name}}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "blog-Comp",
  props: ["blogProp"],
};
</script>

<style>
.cardbg {
  background-color: rgba(42, 42, 48, 0.623);
}
</style>