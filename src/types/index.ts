export interface CategoryPreview {
    title: string;
    picture: string;
}


//Элемент в списке пользователя 
export interface ListItem {
    id: string | number;
    image: string;
    title: string;
    creationDate?: string;
    description?: string;
    userComment?: string;
}


export interface List  {
    category: string;
    listItems: ListItem[];
}

//Получаемвй элемент массива с api
export type FetchItem = {
    readonly  id: string | number;
    image: string;
    title: string;
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
    
    description: string;
    "release-date": string;
    names?: {
        international: string,
    };
    //Для игры
    assets?: {
       "cover-large": {
         uri: string,
       };
    };

    album?: {
        cover: string,
    }
}



//json api response
export interface ResponseAnswer {
    errorMessage: string;
    error: string;
    data: FetchItem[];
    results?: FetchItem[];
    drinks?: FetchItem[];
}





