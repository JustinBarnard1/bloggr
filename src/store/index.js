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
    }
  },
});
//fun
