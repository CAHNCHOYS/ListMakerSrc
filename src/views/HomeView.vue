<template>
  <div class="home-page">
    <h1 class="home-page__title">Создайте свой список лучших вещей</h1>

    <div class="home-page__hint">Сайт создан с использованием:</div>

    <div class="home-page__created-with created-with">
      <div class="created-with__item">
        <div class="created-with__picture _ibg">
          <img src="@/assets/Images/CreatedWith/Vue.jpg" alt="Vue js" />
        </div>
        <div class="created-with__text">VueJs</div>
      </div>
      <div class="created-with__item">
        <div class="created-with__picture _ibg">
          <img
            src="@/assets/Images/CreatedWith/Typescript.jpg"
            alt="Typescript"
          />
        </div>
        <div class="created-with__text">Typescript</div>
      </div>
      <div class="created-with__item">
        <div class="created-with__picture _ibg">
          <img src="@/assets/Images/CreatedWith/Pinia.jpg" alt="Pinia" />
        </div>
        <div class="created-with__text">Pinia</div>
      </div>
    </div>

    <div class="home-page__start">
      <RouterLink :to="{ name: 'choose-category' }"
        >Перейти к созданию списка</RouterLink
      >
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import "@/assets/adaptive-value.scss";

.home-page {
  // .home-page__title

  &__title {
    margin: 0px 0px rem(90) 0px;
    text-align: center;
    font-weight: 900;
    @media (max-width: #{$mobile+px}) {
      margin: 0px 0px rem(40) 0px;
    }
  }

  // .home-page__hint

  &__hint {
    font-weight: 500;
    margin: 0px 0px rem(10) 0px;
    font-size: rem(26);
    text-align: center;
  }

  // .home-page__created-with

  &__created-with {
    margin: 0px 0px rem(40) 0px;
    display: flex;
    flex-wrap: wrap;
    row-gap: rem(15);
  }

  // .home-page__start

  &__start {
    text-align: center;

    a {
      font-weight: 700;
      color: white;
      text-decoration: none;
      font-size: rem(24);
      border-radius: rem(3);
      background: rgb(64, 199, 129);
      box-shadow: 0 -3px rgb(53, 167, 110) inset;
      transition: all 0.5s ease 0s;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      min-height: rem(70);
      padding: 0px rem(20);

      @media (any-hover: hover) {
        &:hover {
          background: rgb(58, 230, 141);
        }
      }
    }
  }
}

.created-with {
  // .created-with__item
  &__item {
    flex: 1 1 calc(33.3333% - 10px);
    column-gap: 10px;
    @media (max-width: #{$mobile+px}) {
      flex: 1 1 calc(50% - 10px);
    }
    @media (max-width: #{$mobileSmall+px}) {
      flex: 1 1 100%;
    }
  }

  // .created-with__picture

  &__picture {
    cursor: pointer;
    padding: 0px 0px 60% 0px;
    overflow: hidden;

    img {
      object-fit: contain;
      transition: all 0.5s ease 0s;
    }

    @media (any-hover: hover) {
      &:hover {
        img {
          transform: scale(1.05);
        }
      }
    }

    margin: 0px 0px rem(10) 0px;
  }

  // .created-with__text

  &__text {
    text-align: center;
    font-weight: 500;
    font-size: rem(32);
  }
}
</style>
