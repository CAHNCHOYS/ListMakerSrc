<template>
    <div class="choose-categories">
        <div class="choose-categories__title title">Выберете категорию списка для его создания</div>
        <div class="choose-categories__all-categories">
            <article v-for="category in allCategories" :key="category.title"
                class="choose-categories__category single-category">
                <div class="single-category__body">
                    <RouterLink :to="{ name: 'list-creation', params: { category: category.title } }"
                        class="single-category__picture" style="display: block">
                        <img :src="getImgUrl(category.picture)" alt="" />
                    </RouterLink>
                    <div class="single-category__content">
                        <RouterLink :to="{ name: 'list-creation', params: { category: category.title } }"
                            class="single-category__name">
                            {{ category.title }}
                        </RouterLink>
                    </div>
                </div>
            </article>
        </div>
    </div>
</template>





<script setup lang="ts">
import { useListCategories } from '@/composables/useListsCategories';
const { getImgUrl, allCategories } = useListCategories();



</script>

<style lang="scss" scoped>
@import "@/assets/scss/adaptive-value.scss";


.choose-categories {

    // .choose-categories__title

    &__title {
        text-align: center;
  
        margin: 0px 0px rem(80) 0px;

        @media(max-width: #{$tablet+px}) {
            margin: 0px 0px rem(50) 0px;
        }


    }

    // .choose-categories__all-categories

    &__all-categories {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        column-gap: rem(70);
        row-gap: rem(40);

        @media(max-width: #{$mobile+px}) {
            column-gap: rem(40);
        }

    }

    // .choose-categories__category

    &__category {}
}

.single-category {


    // .single-category__body
    &__body {
        border: rem(10) solid lightskyblue;
        padding: rem(10);

        border-radius: rem(20);

        @media (any-hover:hover) {
            &:hover {
                .single-category__picture img {
                    transform: translate(0, -5%);
                }
            }
        }
    }

    // .single-category__picture

    &__picture {


        margin: 0px 0px rem(20) 0px;
        text-align: center;

        img {
            transition: all 0.5s ease 0s;
            object-fit: cover;
            max-width: 80%;
        }


    }

    // .single-category__content

    &__content {
        text-align: center;

    }

    // .single-category__name

    &__name {
        font-size: rem(26);
        transition: color 0.5s ease 0s;

        color: #348CCC;


    }
}
</style>
