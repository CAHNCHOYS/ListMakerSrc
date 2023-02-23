<template>
  <div class="all-lists">
    <div class="all-lists__title title">Все ваши списки</div>
    <div class="all-lists__categories">
      <div v-for="category in allCategories" class="all-lists__category">
        <div class="all-lists__category-info">
          <div class="all-lists__category-image _ibg">
            <img :src="getImgUrl(category.picture)" :alt="category.picture" />
          </div>
          <div class="all-lists__category-name">
            {{ category.title }}
          </div>
        </div>

        <div class="all-lists__lists" v-if="filterListsByCategory(category.title).length">
          <TransitionGroup name="list">
            <div v-for="(
                          [title, list], index
                        ) in filterListsByCategory(category.title)" :key="title"
              class="all-lists__category-list category-list">
              <div class="category-list__body">
                <div class="category-list__row">

                  <RouterLink :to="{
                    name: 'single-list',
                    params: { name: title },
                  }" class="category-list__list-image">
                    <img v-if="filterListsByCategory(category.title)[index][1].listItems.length"
                      :src="filterListsByCategory(category.title)[index][1].listItems[0].image"
                      alt="Первый элемент в списке" />
                    <img v-else src="@/assets/Images/NoImage.png" alt="No image availible">

                  </RouterLink>

                  <div class="category-list__name">
                    <RouterLink :to="{
                      name: 'single-list',
                      params: { name: title },
                    }">
                      {{ title }}</RouterLink>
                  </div>
                </div>
                <div @click="deleteOneList(title)" class="category-list__remove-icon icon-close"></div>
              </div>
            </div>
          </TransitionGroup>
        </div>
        <div class="all-lists__no-items" v-else>
          <p class="all-lists__no-items-text">
            Пока вы не добавили ни одного списка
          </p>

          <div class="all-lists__category-btn">
            <RouterLink :to="`/create/${category.title}`">Создать список !</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useListCategories } from "@/composables/useListsCategories";
import { useUserListsStore } from "@/stores/userLists";
import { storeToRefs } from "pinia";

const userListsStore = useUserListsStore();

const { filterListsByCategory } = storeToRefs(userListsStore);

const { allCategories, getImgUrl } = useListCategories();

const deleteOneList = (name: string) => {
  if (window.confirm("Вы уверены что хотите удалить список " + name + " ?")) {
    userListsStore.deleteList(name);
  }
};



</script>

<style lang="scss" scoped>
@import "@/assets/adaptive-value.scss";

.all-lists {
  // .all-lists__title

  &__title {
    margin: 0px 0px rem(80) 0px;
    text-align: center;

    @media (max-width: #{$tablet+px}) {
      margin: 0px 0px rem(40) 0px;
    }
  }

  // .all-lists__categories

  &__categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: rem(40);
    @media(max-width: #{$mobile+px}){
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      column-gap: rem(20);
      row-gap: rem(50);
    }
  }

  // .all-lists__category

  &__category {}

  // .all-lists__category-info

  &__category-info {
    padding: 0px 0px 10px 0px;
    border-bottom: 1px solid lightgray;
    margin: 0px 0px rem(8) 0px;
  }

  // .all-lists__category-image

  &__category-image {
    text-align: center;
    display: block;

   
     padding: 0px 0px 70% 0px;
     img{
      object-fit: contain;
     }
    margin: 0px 0px rem(10) 0px;
    @media(max-width: #{$mobileSmall+px}){
             
    }
  }

  // .all-lists__category-name

  &__category-name {
    text-align: center;
    font-size: rem(30);
    text-align: center;
    color: black;
  }

  // .all-lists__lists

  &__lists {
    display: flex;
    flex-direction: column;
    row-gap: rem(15);
  }

  // .all-lists__category-list

  &__category-list {}

  // .all-lists__no-items

  &__no-items {}

  // .all-lists__no-items-text

  &__no-items-text {
    margin: 0px 0px rem(10) 0px;
    font-size: rem(20);
    line-height: 1.2;
    text-align: center;
  }

  // .all-lists__category-btn

  &__category-btn {
    text-align: center;

    a {
      transition: all 0.5s ease 0s;
      padding: 0px rem(20);
      position: relative;
      z-index: 3;
      background: white;
      box-shadow: 0px 8px 15px 6px rgba(0, 0, 0, 0.1);
      transition: 0.3s;
      transition: all 0.5s ease 0s;
      min-height: rem(50);
      display: inline-flex;
      justify-content: center;
      align-items: center;
      text-transform: uppercase;
      font-weight: 600;
      color: black;

      border-radius: rem(20);

      @media (any-hover: hover) {
        &:hover {
          background: #2ee59d;
          box-shadow: 0 15px 20px rgba(46, 229, 157, 0.4);
          color: white;
        }
      }
    }
  }
}

.category-list {
  // .category-list__body

  &__body {
    position: relative;
    padding: rem(10) rem(20) rem(10) 0;
    border-bottom: rem(1) solid lightgrey;
  }

  // .category-list__row

  &__row {
    display: flex;
    column-gap: 8px;


    align-items: center;
    position: relative;
    z-index: 3;
  }



  // .category-list__list-image

  &__list-image {
    flex: 0 0 70px;
    display: block;
    border: rem(1) solid lightgrey;
    overflow: hidden;

    @media (any-hover:hover) {
      &:hover {
        
        img{
          transform: scale(1.05);
        }
      }
    }

    img {
      transition: all 0.5s ease 0s;
      width: 100%;
      height: 100%;
      min-height: 90px;
      object-fit: cover;
    }
  }

  // .category-list__name

  &__name {
    display: block;


    a {
      color: black;
      transition: color 0.5s ease 0s;
      font-weight: 500;

      @media (any-hover: hover) {
        &:hover {
          color: darkorange;
        }
      }
    }
  }

  // .category-list__remove-icon
  &__remove-icon {
    position: absolute;
    z-index: 4;
    transition: all 0.5s ease 0s;

    &::before {
      font-size: rem(24);
      font-weight: 500;
      color: black;
    }

    cursor: pointer;

    top: rem(2);
    right: rem(2);

    @media (any-hover: hover) {
      &:hover {
        transform: rotate(180deg);
      }
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.6s ease;
}

.list-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>
