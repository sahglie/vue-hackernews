<template>
  <div
    class="progress"
    :class="{
      show: show,
      error: error
    }"
    :style="{
      'width': `${percent}%`
    }" 
  />
</template>

<script>
export default {
  data: () => ({
    percent: 0,
    error: false,
    show: false
  }),
  methods: {
    start () {
      this.show = true
      this.percent = 0
      this._timer = setInterval(() => {
        this.percent++
      }, 100)
    },
    finish () {
      this.percent = 100
      this.show = false
      clearInterval(this._timer)
      this._timer = null
    },
    fail () {
      this.error = true
      this.percent = 100
    }
  }
}
</script>

<style scoped>
.progress {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 2px;
  width: 0%;
  transition: width 0.2s, opacity 0.4s;
  opacity: 0;
  background-color: #ffca2b;
  z-index: 999999;
}
.show {
  opacity: 1;
}
.error {
  background-color: #ff0000;
}
</style>
