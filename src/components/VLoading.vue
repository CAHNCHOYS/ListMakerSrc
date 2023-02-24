<template>
    <div class="loading-gif">

        <div class="loading-gif__image _ibg">
            <img src="../assets/Images/Load.gif" alt="Loading Imag">
        </div>
        <div class="loading-gif__text">
            {{ message }}
        </div>

    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    message: string,

}>()

</script>

<style lang="scss" scoped>
@import "@/assets/scss/adaptive-value.scss";


.loading-gif {

    // .loading-gif__image

    &__image {
        padding-bottom: 10%;
        margin: 0px 0px rem(10) 0px;
        img{
            object-fit: contain;
        }
    }

    // .loading-gif__text

    &__text {
        font-size: rem(24);
        font-weight: 500;
        text-align: center;

    }
}
</style>