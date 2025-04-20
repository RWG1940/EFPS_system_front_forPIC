<template>   
    <t-dialog header="header" top="10px" closeOnOverlayClick closeOnEscKeydown :footer="false" v-model:visible="visible">
        <div class="main-container">
            <slot name="main"></slot>
        </div>
        <div class="footer-container">
            <slot name="footer"></slot>
        </div>
    </t-dialog>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
const visible = ref(false);

</script>

<style scoped>
.main-container>* {
    margin-bottom: 16px;
}
.footer-container>* {
    float: right;
    margin-right: 5px;
    width: 20%;
}

</style>
