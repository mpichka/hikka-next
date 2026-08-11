import { ContentTypeEnum } from '@hikka/api';

import ClearFiltersFooter from '@/features/filters/clear-filters-footer';
import { TodoMediaFilters } from '@/features/filters/todo-media-filters';
import { TodoPersonFilters } from '@/features/filters/todo-person-filters';
import { cn } from '@/utils/cn';

import type { TodoFiltersValue } from './todo-filters-value';

type BodyProps = {
    className?: string;
    contentType: ContentTypeEnum;
    value: TodoFiltersValue;
    onChange: (value: TodoFiltersValue) => void;
};

export function TodoFiltersBody({
    className,
    contentType,
    value,
    onChange,
}: BodyProps) {
    return (
        <div className={cn('flex flex-col gap-8', className)}>
            {(contentType === ContentTypeEnum.ANIME ||
                contentType === ContentTypeEnum.MANGA ||
                contentType === ContentTypeEnum.NOVEL) && (
                <TodoMediaFilters
                    contentType={contentType}
                    value={value}
                    onChange={onChange}
                />
            )}
            {(contentType === ContentTypeEnum.CHARACTER ||
                contentType === ContentTypeEnum.PERSON) && (
                <TodoPersonFilters
                    contentType={contentType}
                    value={value}
                    onChange={onChange}
                />
            )}
        </div>
    );
}

type Props = BodyProps;

export function TodoFilters({
    className,
    contentType,
    value,
    onChange,
}: Props) {
    return (
        <div className={cn('flex w-full flex-col', className)}>
            <TodoFiltersBody
                className="flex-1 overflow-y-auto p-4 py-8"
                contentType={contentType}
                value={value}
                onChange={onChange}
            />
            <ClearFiltersFooter
                className="shrink-0 border-t p-4"
                preserve={['tab']}
            />
        </div>
    );
}
