import { ref } from "vue";
import type { CategoryPreview } from  '../types/index';

export const useListCategories = ()=>{

    
    const allCategories = ref<CategoryPreview[]>([
        {
            title: "Игры",
            picture: "Games.svg",
        },
        {
            title: "Фильмы",
            picture: "Movie.svg",
        },
        {
            title: "Музыка",
            picture: "Music.svg"
        },
        {
            title: "Сериалы",
            picture: "Netflix.svg"
        },
        {
            title: "Актеры",
            picture: "Actor.svg",
        },
        {
            title: "Серия сериала",
            picture: "Trophy.svg",
        },
        {
            title: "Коктейли",
            picture: "Cocktail.svg",
        }
    

    ]);
    
    

    //dynamic img src
    const getImgUrl = (imageNameWithExtension: string) =>
        new URL(
            `../assets/Images/CategoriesPreview/${imageNameWithExtension}`,
            import.meta.url
        ).href;
    
   
        return { getImgUrl , allCategories}

}