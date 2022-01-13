<template>
 <div :style="{ background: 'rgb(190, 200, 200)', padding: '26px 16px 16px' }">
    <a-button type="primary" ghost>Primary</a-button>
    <a-button ghost>Default</a-button>
    <a-button type="dashed" ghost>Dashed</a-button>
    <a-button danger ghost>Danger</a-button>
      <a-row>
    <a-col :span="12">col-12</a-col>
    <a-col :span="12">col-12</a-col>
  </a-row>
  <a-row>
    <a-col :span="8">col-8</a-col>
    <a-col :span="8">col-8</a-col>
    <a-col :span="8">col-8</a-col>
  </a-row>
  <a-row>
    <a-col :span="6">col-6</a-col>
    <a-col :span="6">col-6</a-col>
    <a-col :span="6">col-6</a-col>
    <a-col :span="6">col-6</a-col>
  </a-row>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>
