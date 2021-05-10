<template>
  <div :id="id"></div>
</template>

<script>
const Txplayer = window.Txplayer

export default {
  props: {
    id: {
      type: String,
      default: 'tc-player'
    },
    width: {
      type: [Number, String],
      default: 500
    },
    height: {
      type: [Number, String],
      default: 280
    },
    vid: {
      type: [Number, String],
      default: 0
    },
    pause: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    pause: function () {
      if (this.pause) {
        this.vidioPause()
      }
    }
  },
  data () {
    return {
      tcPlayer: null
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.tcPlayer = new Txplayer({
        containerId: this.id,
        vid: this.vid,
        width: String(this.width),
        height: String(this.height),
        autoplay: false
      })
    },
    vidioPause () {
      if (!this.tcPlayer) return
      return this.tcPlayer.pause()
    }
  },
  destroyed () {
    if (this.tcPlayer) {
      this.tcPlayer.destroy()
    }
  }
}
</script>
