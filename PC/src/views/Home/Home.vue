<template>
  <div>

  </div>
</template>
<script>
import { GUID, USERID } from '@/store/mutation-types'
export default {
  data () {
    return {
      guid: this.$ls.get(GUID),
      userID: this.$ls.get(USERID)
    }
  },
  created () {
    window.location.href = '/tiku/homePage'
  }
}
</script>
