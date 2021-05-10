const makeup = {
  state: {
    offlinePaperID: null,
    refreshStatic: false
  },
  mutations: {
    storeOfflinePaperID: function (state, id) {
      state.offlinePaperID = id
    },
    storeRefreshStatic: function (state) {
      state.refreshStatic = !state.refreshStatic
    }
  }
}
export default makeup
