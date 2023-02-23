

<template>
  <TheHeader />

  <main class="page">
    <div class="page__body container">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>
  </main>




  <TheFooter />
</template>




<script setup lang="ts">
import TheFooter from './components/TheFooter.vue';
import TheHeader from './components/TheHeader.vue';

import { useUserListsStore } from "@/stores/userLists";

const userListsStore = useUserListsStore();







</script>


<style lang="scss">
@import "@/assets/nullstyle.scss";
@import "@/assets/adaptive-value.scss";
@import "@/assets/Ui.scss";


@import "@/assets/fonts.scss";
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');



#app {
  display: flex;
  flex-direction: column;
  min-height: 100%;


}



body {
  font-size: black;
  min-height: 100%;
  min-width: 320px;
  font-size: rem(18);

  &._isLocked {
    overflow: hidden;
  }

  font-family: 'Roboto',
  sans-serif;
  font-weight: 400;
}

.page {
  flex: 1 1 auto;
  padding: rem(50) 0px rem(50) 0px;

  @media(max-width: #{$mobile+px}) {
    padding: rem(95) 0px rem(40) 0px;
  }

}

.container {
  max-width: rem(1330);
  margin: 0 auto;
  padding: 0px 15px;
}





</style>
