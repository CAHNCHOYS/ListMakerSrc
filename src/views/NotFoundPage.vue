<template>
    <div class="not-found">
        <div class="not-found__title">404</div>
        <div class="not-found__text">Упс, страница не найдена</div>
        <div class="not-found__button">
            <RouterLink :to="{ name: 'home' }">На главную </RouterLink>
        </div>

    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
@import "@/assets/scss/adaptive-value.scss";
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');



.not-found {

    font-family: 'Poppins', sans-serif;

    // .not-found__title

    &__title {
        font-style: normal;
        font-weight: 700;
        font-size: rem(300);
        line-height: calc(320/300);

        text-align: center;
        
        color: #6A63FE;
        @media(max-width: #{$mobile+px}){
            font-size: rem(190); 
        }
    }

    // .not-found__text

    &__text {
        font-weight: 600;
        font-size: 35px;
        line-height: 52px;
        text-align: center;
        margin: 0px 0px rem(10) 0px;
    }

    // .not-found__button

    &__button {
        text-align: center;

        a {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            min-height: rem(75);
            background-color: #6A63FE;
            border-radius: rem(60);
            padding: 0px rem(78);
            color: white;
            max-width: 100%;

            font-size: rem(25);




            color: #FFFFFF;
            transition: background-color 0.5s ease 0s;

            @media (any-hover:hover) {
                &:hover {
                    background: #271cfd;
                }
            }
        }
    }
}
</style>