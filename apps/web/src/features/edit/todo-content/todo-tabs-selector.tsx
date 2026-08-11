import type { FC } from 'react';

import { useNavigate } from '@tanstack/react-router';

import { ContentTypeEnum } from '@hikka/api';

import MaterialSymbolsAnimatedImages from '@/components/icons/material-symbols/MaterialSymbolsAnimatedImages';
import MaterialSymbolsFace3 from '@/components/icons/material-symbols/MaterialSymbolsFace3';
import MaterialSymbolsMenuBookRounded from '@/components/icons/material-symbols/MaterialSymbolsMenuBookRounded';
import MaterialSymbolsPalette from '@/components/icons/material-symbols/MaterialSymbolsPalette';
import MaterialSymbolsPerson from '@/components/icons/material-symbols/MaterialSymbolsPerson';
import { type ChipTabOption, ChipTabs } from '@/components/ui/chip-tabs';

import type { TodoContentType } from '../hooks/use-todo-content-list';

// Each tab has its own filter set, so switching drops the rest of the search.
const CONTENT_TYPE_OPTIONS: ChipTabOption<TodoContentType>[] = [
    {
        label: 'Аніме',
        value: ContentTypeEnum.ANIME,
        icon: MaterialSymbolsAnimatedImages,
    },
    {
        label: 'Манґа',
        value: ContentTypeEnum.MANGA,
        icon: MaterialSymbolsPalette,
    },
    {
        label: 'Ранобе',
        value: ContentTypeEnum.NOVEL,
        icon: MaterialSymbolsMenuBookRounded,
    },
    {
        label: 'Персонажі',
        value: ContentTypeEnum.CHARACTER,
        icon: MaterialSymbolsFace3,
    },
    {
        label: 'Люди',
        value: ContentTypeEnum.PERSON,
        icon: MaterialSymbolsPerson,
    },
];

type Props = {
    value: TodoContentType;
    className?: string;
};

const TodoTabsSelector: FC<Props> = ({ value, className }) => {
    const navigate = useNavigate();

    const handleContentTypeChange = (next: TodoContentType) => {
        if (next === value) return;

        navigate({ to: '/edit/content', search: { tab: next } });
    };

    return (
        <ChipTabs
            options={CONTENT_TYPE_OPTIONS}
            value={value}
            onValueChange={handleContentTypeChange}
            className={className}
        />
    );
};

export default TodoTabsSelector;
