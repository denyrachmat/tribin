import { defineStore } from 'pinia'

export const masterDataStore = defineStore('counter', {
  state: () => ({
    customerList: [],
    itemList: [],
    usageList: []
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2
    },
    getCustomer (state) {
      return state.customerList
    },
    getItem (state) {
      return state.itemList
    },
    getUsage (state) {
      return state.usageList
    }
  },

  actions: {
    increment () {
      this.counter++
    },
    setCustomer (val) {
      this.customerList = val
    },
    setItem (val) {
      this.itemList = val
    },
    setUsage (val) {
      this.usageList = val
    }
  }
})
