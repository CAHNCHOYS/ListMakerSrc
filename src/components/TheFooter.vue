<template>
    <footer class="footer">
        <div class="footer__body container">
            <a href="https://github.com/CAHNCHOYS/ListMakerSrc" class="footer__link">
                GitHub
            </a>
        </div>

    </footer>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
@import "@/assets/scss/adaptive-value.scss";

.footer {
    background-color: lightcoral;

    // .footer__body
    &__body {
        text-align: center;
        padding-top: rem(20);
        padding-bottom: rem(20);

    }

    // .footer__link
    &__link {
        transition: all 0.5s ease 0s;
        color: white;
        font-weight: 500;
        @media (any-hover:hover) {
            &:hover {
               color: yellow;
            }
        }
    }
}

.container {}
</style>