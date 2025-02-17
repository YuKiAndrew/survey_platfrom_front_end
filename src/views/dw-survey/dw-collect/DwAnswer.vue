<template>
  <div>Survey loadding...</div>
</template>

<script>
export default {
  name: 'DwAnswer',
  mounted () {
    this.loadAnswer()
  },
  methods: {
    loadAnswer () {
      const sid = this.$route.params.sid
      window.location.href='/static/diaowen/answer-p.html?sid='+sid
    }
  }
}
</script>
<style scoped>

</style>
