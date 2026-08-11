import type { FC } from 'react';

import { ContentTypeEnum } from '@hikka/api';

import type { TodoFiltersValue } from '@/features/edit/todo-content/todo-filters-value';
import { ContentSlug } from '@/features/filters/content-slug';
import ContentType from '@/features/filters/content-type';
import { Issues } from '@/features/filters/issues-filter';

const PERSON_ISSUE_PROPERTIES: Hikka.FilterProperty<string> = {
    name_ua: { title_ua: "Ім'я (укр)", title_en: 'Name (ua)' },
    name_en: { title_ua: "Ім'я (англ)", title_en: 'Name (en)' },
    name_original: { title_ua: "Ім'я (ориг)", title_en: 'Name (original)' },
};

const CHARACTER_ISSUE_PROPERTIES: Hikka.FilterProperty<string> = {
    ...PERSON_ISSUE_PROPERTIES,
    description_ua: { title_ua: 'Опис (укр)', title_en: 'Description (ua)' },
};

const MEDIA_CONTENT_TYPES = [
    ContentTypeEnum.ANIME,
    ContentTypeEnum.MANGA,
    ContentTypeEnum.NOVEL,
];

type Props = {
    contentType:
        | typeof ContentTypeEnum.CHARACTER
        | typeof ContentTypeEnum.PERSON;
    value: TodoFiltersValue;
    onChange: (value: TodoFiltersValue) => void;
};

/**
 * Filters shared by character/person, with character getting one extra issue property.
 * ContentType reads/writes the `content_type` URL param directly, so it needs no
 * value/onChange wiring.
 */
export const TodoPersonFilters: FC<Props> = ({
    contentType,
    value,
    onChange,
}) => {
    const issueProperties =
        contentType === ContentTypeEnum.CHARACTER
            ? CHARACTER_ISSUE_PROPERTIES
            : PERSON_ISSUE_PROPERTIES;

    return (
        <>
            <Issues
                properties={issueProperties}
                value={value.issues}
                onChange={(issues) => onChange({ ...value, issues })}
            />
            <ContentType contentTypes={MEDIA_CONTENT_TYPES} />
            <ContentSlug
                resetKey={contentType}
                value={value.content_slug}
                onChange={(content_slug) =>
                    onChange({ ...value, content_slug })
                }
            />
        </>
    );
};
