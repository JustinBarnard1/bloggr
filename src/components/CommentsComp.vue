<template>
  <div class="card text-dark" v-if="commentProp.id">
    <div class="card-body text-white">
      <h4 class="card-title">{{commentProp.creator.name}}</h4>
      <p>{{commentProp.body}}</p>
      <p>
        <i
          v-if="isCreator"
          class="fa fa-pencil"
          aria-hidden="true"
          @click="editToggle = !editToggle"
        ></i>
      </p>
      <form class="form-inline" @submit.prevent="editComment" v-if="editToggle">
        <input
          type="text"
          class="form-control"
          placeholder="New Comment Body"
          aria-describedby="helpId"
          v-model="commentData.body"
        />
        <button type="submit" class="btn btn-warning">Edit Comment</button>
      </form>
      <button class="btn btn-outline-danger mt-2" v-if="isCreator" @click="deleteComment">Delete</button>
    </div>
    <comments-comp />
  </div>
</template>

<script>
export default {
  name: "comment-comp",
  props: ["commentProp"],
  mounted() {},
  computed: {},
};
</script>

<style>
</style>