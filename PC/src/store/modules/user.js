import { checkVipStatus, checkBusinessStatus } from '@/api/user'
import { message } from 'ant-design-vue'
const user = {
  state: {
    vipStatus: {
      // isVip: 1,
      // ExpireDate: new Date('2020/12/12').getTime()
    },
    businessStatus: {
      // isBusinessUser: 1,
      // EndTime: new Date('2020/12/12').getTime()
    }
  },
  mutations: {
    SetVipStatus: function (state, vipStatus) {
      state.vipStatus = vipStatus
    },
    SetBusinessStatus: function (state, businessStatus) {
      state.businessStatus = businessStatus
    }
  },
  actions: {
    IsVip: async function ({ commit, state }) {
      if (JSON.stringify(state.vipStatus) === '{}' || state.vipStatus === undefined) {
        const vipStatus = await checkVipStatus()
        commit('SetVipStatus', vipStatus)
      }
      const vipStatus = state.vipStatus
      if (vipStatus.isVip === 0) {
        return false
      } else if (vipStatus.isVip === 1) {
        if (vipStatus.ExpireDate <= new Date().getTime()) {
          message.warning('您的会员已过期，已失去VIP权限！')
          return false
        } else {
          return true
        }
      }
    },
    IsBus: async function ({ commit, state }) {
      if (JSON.stringify(state.businessStatus) === '{}' || state.businessStatus === undefined) {
        const businessStatus = await checkBusinessStatus()
        commit('SetBusinessStatus', businessStatus)
      }
      const businessStatus = state.businessStatus
      if (businessStatus.isBusinessUser === 0) {
        return false
      } else if (businessStatus.isBusinessUser === 1) {
        if (businessStatus.EndTime <= new Date().getTime()) {
          message.warning('您的企业会员已过期，已失去企业用户特权！')
          return false
        } else {
          return true
        }
      }
    }
  },
  getters: {
    vip: function (state) {
      const vipStatus = state.vipStatus
      if (vipStatus.isVip === 0) {
        return false
      } else if (vipStatus.isVip === 1) {
        if (vipStatus.ExpireDate <= new Date().getTime()) {
          message.warning('您的会员已过期，已失去VIP权限！')
          return false
        } else {
          return true
        }
      }
    },
    bus: function (state) {
      const businessStatus = state.businessStatus
      if (businessStatus.isBusinessUser === 0) {
        return false
      } else if (businessStatus.isBusinessUser === 1) {
        if (businessStatus.EndTime <= new Date().getTime()) {
          message.warning('您的企业会员已过期，已失去企业用户特权！')
          return false
        } else {
          return true
        }
      }
    }
  }
}
export default user
