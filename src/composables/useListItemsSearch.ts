import type { List, ListItem, ResponseAnswer } from "@/types/index";
import { computed } from "@vue/reactivity";
import { ref, watchEffect, type Ref } from "vue";

export const useListItemsSearch = (props: {
  name: string;
  list: List | undefined;
}) => {

  
  //---------------------------
  const startHints: any = {
    Фильмы: "фильма",
    Сериалы: "сериала",
    Игры: "игры",
    Актеры: "актера",
    Музыка: "трека",
    Коктейли: "Коктейля на английском",
    "Серия сериала": "серии",
  };

  const hintsForUser = ref<{
    placeholderHint: string;
    searchHint: string;
  }>({
    placeholderHint: `Введите название ${startHints[props.list?.category!]}`,
    searchHint: "",
  });
  //---------------------------


  const searchQuery = ref(""); //Строка поиска
  const searchItems = ref<ListItem[]>([]);
  const errorMessage = ref("");


  const isError = ref(false);
  const isTyping = ref(false);
  const isSearching = ref(false);

  //меняем ссылку на api в зависимости от категории списка
  const getFetchLink = computed(() => {

    let category = props.list?.category;
    let fetchLink = {
      link: "",
      options: {},
    };

    switch (category) {
      case "Фильмы":
        fetchLink.link = "https://imdb-api.com/en/API/SearchMovie/k_8y8soghm/";
        hintsForUser.value.placeholderHint = "Введите название фильма";
        hintsForUser.value.searchHint = "Ищем фильм ";
        break;
      case "Сериалы":
        fetchLink.link = "https://imdb-api.com/en/API/SearchSeries/k_8y8soghm/";
        hintsForUser.value.placeholderHint = "Введите название сериала";
        hintsForUser.value.searchHint = "Ищем сериал ";
        break;
      case "Серия сериала":
        fetchLink.link =
          "https://imdb-api.com/en/API/SearchEpisode/k_8y8soghm/";
        hintsForUser.value.placeholderHint = "Введите название серии";
        hintsForUser.value.searchHint = "Ищем серию ";
        break;

      case "Музыка":
        fetchLink.link = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";

        fetchLink.options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "9e3411aeb2msh6870cf46972558cp1475c4jsn93502557ec77",
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
          },
        };
        hintsForUser.value.placeholderHint = "Введите название трека или исполнителя";
        hintsForUser.value.searchHint = "Ищем трек ";
        break;

      case "Игры":
        fetchLink.link = "https://www.speedrun.com/api/v1/games?name=";
        hintsForUser.value.placeholderHint = "Введите название игры";
        hintsForUser.value.searchHint = "Ищем игру ";
        break;
      case "Актеры":
        fetchLink.link = "https://imdb-api.com/en/API/SearchName/k_8y8soghm/";
        hintsForUser.value.placeholderHint = "Введите имя актера";
        hintsForUser.value.searchHint = "Ищем актера ";
        break;

      case "Коктейли":
        fetchLink.link =
          "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
        hintsForUser.value.placeholderHint =
          "Введите название коктейля (на англ)";
        hintsForUser.value.searchHint = "Ищем коктейль ";
        break;
      default:
        break;
    }
    return fetchLink;
  });

  //Получаем элементы с api
  const fetchItems = async () => {
    isSearching.value = true;

    try {
      
      let res = await fetch(
        getFetchLink.value.link + searchQuery.value,
        getFetchLink.value.options
      );

      let json: ResponseAnswer = await res.json();

      console.log(json);


      if (!json.errorMessage && !json.error) {
        const results = json.results || json.data || json.drinks || [];
        if (results.length) {
          searchItems.value = results.map((item) => ({
            id: item.id || item.idDrink,
            title: item.title || item.names?.international || item.strDrink,
            image:
              item.image ||
              item.assets?.["cover-large"].uri ||
              item.album?.cover ||
              item.strDrinkThumb,
            creationDate: item["release-date"],
            description: item.description,
            userComment: "",
          }));
        }
      } else {
        errorMessage.value = json.errorMessage || json.error;
        isError.value = true;
      }
    } catch (error) {
      console.log(error);
      isError.value = true;
    } finally {
      isSearching.value = false;
      isTyping.value = false;
    }
  };

  //Следим за строкой поиска
  watchEffect((onInvalidate) => {
    searchItems.value = [];
    if (searchQuery.value.length === 0) return;
    isTyping.value = true;
    isError.value = false;

    let timeout = setTimeout(fetchItems, 850);
    onInvalidate(() => {
      clearInterval(timeout);
    });
  });

  return {
    isSearching,
    searchQuery,
    searchItems,
    hintsForUser,
    errorMessage,
    isError,
    isTyping,
  };





};
