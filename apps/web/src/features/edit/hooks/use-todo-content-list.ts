import {
    type AnimeMediaEnum,
    type AnimeTodoArgs,
    type CharacterTodoArgs,
    ContentTypeEnum,
    type MangaMediaEnum,
    type MangaTodoArgs,
    type NovelMediaEnum,
    type NovelTodoArgs,
    type PersonTodoArgs,
    getTodoAnimeListInfiniteOptions,
    getTodoCharacterListInfiniteOptions,
    getTodoMangaListInfiniteOptions,
    getTodoNovelListInfiniteOptions,
    getTodoPersonListInfiniteOptions,
    paginatedInfiniteOptions,
} from '@hikka/api';

import type { TodoFiltersValue } from '@/features/edit/todo-content/todo-filters-value';
import { useInfiniteList } from '@/utils/api/use-infinite-list';

export type TodoContentType =
    | typeof ContentTypeEnum.ANIME
    | typeof ContentTypeEnum.MANGA
    | typeof ContentTypeEnum.NOVEL
    | typeof ContentTypeEnum.CHARACTER
    | typeof ContentTypeEnum.PERSON;

type TodoContentQueryMap = {
    [ContentTypeEnum.ANIME]: TodoFiltersValue;
    [ContentTypeEnum.MANGA]: TodoFiltersValue;
    [ContentTypeEnum.NOVEL]: TodoFiltersValue;
    [ContentTypeEnum.CHARACTER]: TodoFiltersValue;
    [ContentTypeEnum.PERSON]: TodoFiltersValue;
};

/**
 * Anime and manga/novel bodies diverge (studios/season/rating vs magazines),
 * so each content family gets its own mapper.
 */
function toAnimeTodoBody<M extends string>(
    filters: TodoFiltersValue | undefined,
): {
    media_type?: M[];
    mal_id?: number;
    fields?: string[];
    genres?: string[];
    studios?: string[];
    season?: string[];
    status?: string[];
    rating?: string[];
    years?: [number | null, number | null];
} {
    return {
        media_type: filters?.types as M[] | undefined,
        mal_id: filters?.mal_id,
        fields: filters?.issues,
        genres: filters?.genres,
        studios: filters?.studios,
        season: filters?.seasons,
        status: filters?.statuses,
        rating: filters?.ratings,
        years: filters?.years,
    };
}

/**
 * Character/person bodies only take `fields`/`content_type`/`content_slug` —
 * spreading `TodoFiltersValue` directly would send `issues` under the wrong
 * key and silently drop the filter.
 */
function toPersonTodoBody(filters: TodoFiltersValue | undefined): {
    fields?: string[];
    content_type?: TodoFiltersValue['content_type'];
    content_slug?: string;
} {
    return {
        fields: filters?.issues,
        content_type: filters?.content_type,
        content_slug: filters?.content_slug,
    };
}

function toReadTodoBody<M extends string>(
    filters: TodoFiltersValue | undefined,
): {
    media_type?: M[];
    mal_id?: number;
    fields?: string[];
    genres?: string[];
    magazines?: string[];
    status?: string[];
    years?: [number | null, number | null];
} {
    return {
        media_type: filters?.types as M[] | undefined,
        mal_id: filters?.mal_id,
        fields: filters?.issues,
        genres: filters?.genres,
        magazines: filters?.magazines,
        status: filters?.statuses,
        years: filters?.years,
    };
}

export function useTodoContentList<T extends TodoContentType>(
    contentType: T,
    filters?: TodoContentQueryMap[T],
    page = 1,
    size?: number,
    query?: string,
    sort?: string[],
) {
    const animeOptions = paginatedInfiniteOptions(
        getTodoAnimeListInfiniteOptions({
            body: {
                ...toAnimeTodoBody<AnimeMediaEnum>(filters),
                query,
                sort,
            } as AnimeTodoArgs,
            query: { size },
        }),
        page,
    );
    const mangaOptions = paginatedInfiniteOptions(
        getTodoMangaListInfiniteOptions({
            body: {
                ...toReadTodoBody<MangaMediaEnum>(filters),
                query,
                sort,
            } as MangaTodoArgs,
            query: { size },
        }),
        page,
    );
    const novelOptions = paginatedInfiniteOptions(
        getTodoNovelListInfiniteOptions({
            body: {
                ...toReadTodoBody<NovelMediaEnum>(filters),
                query,
                sort,
            } as NovelTodoArgs,
            query: { size },
        }),
        page,
    );
    const characterOptions = paginatedInfiniteOptions(
        getTodoCharacterListInfiniteOptions({
            body: {
                ...toPersonTodoBody(filters),
                query,
                sort,
            } as CharacterTodoArgs,
            query: { size },
        }),
        page,
    );
    const personOptions = paginatedInfiniteOptions(
        getTodoPersonListInfiniteOptions({
            body: {
                ...toPersonTodoBody(filters),
                query,
                sort,
            } as PersonTodoArgs,
            query: { size },
        }),
        page,
    );

    const anime = useInfiniteList(animeOptions, {
        enabled: contentType === ContentTypeEnum.ANIME,
    });
    const manga = useInfiniteList(mangaOptions, {
        enabled: contentType === ContentTypeEnum.MANGA,
    });
    const novel = useInfiniteList(novelOptions, {
        enabled: contentType === ContentTypeEnum.NOVEL,
    });
    const characters = useInfiniteList(characterOptions, {
        enabled: contentType === ContentTypeEnum.CHARACTER,
    });
    const people = useInfiniteList(personOptions, {
        enabled: contentType === ContentTypeEnum.PERSON,
    });

    switch (contentType) {
        case ContentTypeEnum.ANIME:
            return { ...anime, queryKey: animeOptions.queryKey };
        case ContentTypeEnum.MANGA:
            return { ...manga, queryKey: mangaOptions.queryKey };
        case ContentTypeEnum.NOVEL:
            return { ...novel, queryKey: novelOptions.queryKey };
        case ContentTypeEnum.CHARACTER:
            return { ...characters, queryKey: characterOptions.queryKey };
        case ContentTypeEnum.PERSON:
            return { ...people, queryKey: personOptions.queryKey };
        default:
            return { ...anime, queryKey: animeOptions.queryKey };
    }
}
