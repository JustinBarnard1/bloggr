import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "../services/AxiosService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {},
    blogs: [],
    activeBlog: [],
    comments: []
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setAllBlogs(state, blogs) {
      state.blogs = blogs
    },
    setActiveBlog(state, blog) {
      state.activeBlog = blog
    },
    setComments(state, comment) {
      state.comments = comment
    },
    removeBlog(state, id) {
      state.blogs = state.blogs.filter(b => b.id == id)
    },
    removeComment(state, id) {
      state.comments = state.comments.filter(c => c.id != id)
    }
  },
  actions: {
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getAllBlogs({ commit }) {
      try {
        let res = await api.get('blogs');
        commit('setAllBlogs', res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async getBlog({ commit }, Id) {
      try {
        let res = await api.get("blogs/" + Id);
        commit('setActiveBlog', res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async createBlog({ commit }, newBlog) {
      try {
        let res = await api.post('blogs', newBlog)
        commit('setAllBlogs', [...this.state.blogs, res.data])
        router.push({ name: 'BlogDetails', params: { blogId: res.data.id } })
      } catch (error) {
        console.error(error)
      }
    },
    async editBlog({ commit, dispatch }, blogData) {
      try {
        let res = await api.put("blogs/" + blogData.id, blogData)
        dispatch("getBlog", blogData.id)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteBlog({ commit }, id) {
      try {
        await api.delete("blogs/" + id)
        commit("removeBlog", id)
        commit("setActiveBlog", [])
        router.push({ name: "Home" })
      } catch (error) {
        console.error(error)
      }
    },
    async getComment({ commit }, Id) {
      try {
        let res = await api.get("blogs/" + Id + "/comments")
        commit("setComments", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async createComment({ commit, dispatch }, newComment) {
      try {
        let res = await api.post('comments', newComment)
        commit('setComments', [...this.state.comments, res.data])
        dispatch('getComment', res.data.blog)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteComment({ commit }, id) {
      try {
        await api.delete("comments/" + id)
        commit("removeComment", id)

      } catch (error) {
        console.error(error)
      }
    },
    async editComment({ commit, dispatch }, comment) {
      try {
        let res = await api.put('comments/' + comment.id, comment)
        console.log(res.data);
        commit('setComments', res.data)
        dispatch('getComment', res.data.blog)
      } catch (error) {
        console.error(error)
      }
    }
  },
});