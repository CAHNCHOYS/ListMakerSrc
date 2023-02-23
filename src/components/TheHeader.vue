<template>
    <header class="header">
        <div class="header__wrapper">
            <div class="header__body container">
                <div class="header__row">

                    <RouterLink to="/" class="header__logo logo-header">
                        <div class="logo-header__picture"><img src="@/assets/Images/SiteLogo.svg" alt="Site logo"></div>
                        <div class="logo-header__text"> <span>Список</span>Лучших </div>

                    </RouterLink>


                    <nav class="header__menu" :class="{ _active: isMenuToggled }">
                        <ul class="header__list">
                            <li>
                                <RouterLink to="/" class="header__link" @click="closeMobileMenu"> Главная </RouterLink>
                            </li>
                            <li>
                                <RouterLink :to="{ name: 'choose-category' }" class="header__link" @click="closeMobileMenu">
                                    Создать список </RouterLink>
                            </li>
                            <li>
                                <RouterLink :to="{ name: 'all-lists' }" class="header__link" @click="closeMobileMenu"> Ваши списки </RouterLink>
                            </li>

                        </ul>
                    </nav>
                    <div class="header__burger" :class="{ _active: isMenuToggled }" @click="toggleMobileMenu">
                        <span></span>
                    </div>
                </div>
            </div>

        </div>

    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';



const isMenuToggled = ref(false);

const closeMobileMenu = (): void => {
    isMenuToggled.value = false;
    document.body.classList.remove('_isLocked');
}

const toggleMobileMenu = (): void => {
    isMenuToggled.value = !isMenuToggled.value;
    document.body.classList.toggle('_isLocked');
}


</script>

<style lang="scss" >
@import "@/assets/adaptive-value.scss";


.header {



    @media(max-width: #{$mobile+px}){
       position: fixed;
       z-index: 100;      
       width: 100%;
       left: 0;
       top: 0;
       height: auto;
    }
    // .header__wrapper
    &__wrapper {
        padding: 5px 0px 5px 0px;

        border-bottom: 1px solid #111;
        position: relative;

        @media(max-width: #{$mobile+px}) {
            &::before {
                content: '';
                z-index: 101;
                position: absolute;
                width: 100%;

                height: 100%;
                top: 0;
                left: 0;
                background-color: rgb(241, 229, 179);
            }

            border-bottom: unset;
        }

    }

    // .header__body

    &__body {}

    // .header__row

    &__row {

        display: flex;
        align-items: center;
        min-height: 80px;
        justify-content: space-between;
        column-gap: 15px;

        @media(max-width: #{$mobile+px}) {
            min-height: 65px;
        }

    }

    // .header__logo

    &__logo {
        display: inline-flex;
        flex: 0 0 260px;
        align-items: center;
        column-gap: 10px;
        position: relative;
        z-index: 103;

        @media(max-width: #{$mobileSmall+px}) {
            flex: 0 1 60px;
            overflow: hidden;
        }


    }

    // .header__menu

    &__menu {
        @media(max-width: #{$mobile+px}) {
            position: fixed;
            width: 100%;
            padding: rem(95) 15px 20px 15px;
            height: 100%;
            top: 0;
            transition: all 0.6s ease 0s;
            z-index: 99;
            left: -100%;
            overflow: auto;
            background-color: white;


            &._active {
                left: 0;

            }
        }
    }

    // .header__list
    &__list {
        position: relative;
        z-index: 103;
        display: flex;
        align-items: center;
        column-gap: 40px;
        flex-wrap: wrap;
        row-gap: 10px;

        @media(max-width: #{$mobile+px}) {
            flex-direction: column;
            column-gap: 0px;
            row-gap: rem(20);
            text-align: center;
        }
    }

    // .header__link

    &__link {
        transition: all 0.5s ease 0s;
        padding: 3px 0px 3px 0px;
        color: #02408b;
        position: relative;
        line-height: 1.15;


        &::before {
            content: '';
            position: absolute;

            height: rem(1);
            bottom: 0;
            left: 0;
            transition: all 0.5s ease 0s;
            opacity: 0;
            visibility: hidden;
            background-color: #02408b;
            width: 0%;
            z-index: 101;

        }

        @media (any-hover:hover) {
            &:hover {
                &::before {
                    opacity: 1;
                    width: 100%;
                    visibility: visible;
                }
            }
        }

        @media(max-width: #{$mobile+px}) {
            font-size: rem(40);
        }

        &.current-page {
            color: rgb(255, 72, 5);


            &::before {
                background-color: rgb(255, 72, 5);
                opacity: 1;
                width: 100%;
                visibility: visible;
            }

        }
    }


    // .header__burger
    &__burger {
        display: none;

        @media(max-width: #{$mobile+px}) {
            display: block;
            flex-basis: 30px;
            height: 20px;
            position: relative;
            z-index: 101;

            &::before,
            &::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 2px;
                border-radius: 5px;
                background-color: black;
                transition: 0.7s;
                left: 0;
            }

            span {
                position: absolute;
                width: 100%;
                height: 2px;
                display: block;
                background-color: black;
                top: 50%;
                transform: translate(0, -50%);
                left: 0;
                transition: 0.7s;
            }

            &::before {
                top: 0;
            }

            &::after {
                bottom: 0;
            }

            order: 1;

            &._active {
                &::before {
                    transform: rotate(45deg);
                    top: 9.5px;
                }

                span {
                    opacity: 0;
                }

                &::after {
                    transform: rotate(-45deg);
                    bottom: 8.5px;
                }
            }
        }
    }
}



.logo-header {
    // .logo-header__picture
    &__picture {
        flex: 0 0 60px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    // .logo-header__text

    &__text {

        font-size: rem(26);


        font-weight: 900;

        span {
            color: #617fc0;
        }

        color: #4857b8;

    }
}
</style>