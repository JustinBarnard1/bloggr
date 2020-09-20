<template>
  <div id="comments-comp" class="my-3">
    <div class="card text-dark cardbg" v-if="commentProp.id">
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
  </div>
</template>

<script>
export default {
  name: "comments-comp",
  props: ["commentProp"],
  mounted() {},
  data() {
    return {
      commentData: {},
      editToggle: false,
    };
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    isCreator() {
      return this.$store.state.profile.email == this.commentProp.creatorEmail;
    },
    comments() {
      return this.$store.state.comments;
    },
  },
  methods: {
    deleteComment() {
      this.$store.dispatch("deleteComment", this.commentProp.id);
    },
    editComment() {
      this.commentData.id = this.commentProp.id;
      this.$store.dispatch("editComment", this.commentData);
      this.editToggle = false;
    },
  },
};
</script>

<style>
</style>