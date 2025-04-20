<template>
   <t-footer>
      <transition name="f-trans" appear>
         <div class="rwg">
            <p>Author RenWeiGuo</p>
           
         </div>
      </transition>
   </t-footer>
</template>
<script lang="ts">
export default {

}
</script>
<style scoped>
.rwg {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 10px;
   padding: 0;
   margin-bottom: 30px;
   margin-top: 10px;
}

.rwg p {
   margin: 0;
}

.f-trans-enter-active,
.f-trans-leave-active {
  transition: all 0.5s ease-out;
}

.f-trans-enter-from,
.f-trans-leave-to {
  opacity: 0;
  transform: scale(0.01);
}
</style>