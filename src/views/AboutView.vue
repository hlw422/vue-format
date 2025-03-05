<template>
  <div class="about">
    <div style="width: 100px;height: 100px;background-color: blue;position: relative;">
      <div class="card-actions">
        <a-button> <ellipsis-outlined /></a-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { EllipsisOutlined } from "@ant-design/icons-vue";

</script>
<style scoped>
.card-actions {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
}
</style>
