import { type FC, Suspense, useEffect, useRef, useState } from 'react';

import { useNavigate } from '@tanstack/react-router';

import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useFilterSearch } from '@/features/filters/hooks/use-filter-search';
import Sort from '@/features/filters/sort';
import useDebounce from '@/services/hooks/use-debounce';
import { cn } from '@/utils/cn';

import type { TodoContentType } from '../hooks/use-todo-content-list';
import { getTodoSortType } from '../hooks/use-todo-filters';

const Search = () => {
    const navigate = useNavigate();
    const { search: query } = useFilterSearch<{ search?: string }>();

    const [search, setSearch] = useState(query);
    const [debouncedSearch] = useDebounce({ value: search, delay: 300 });

    const queryRef = useRef(query);
    queryRef.current = query;
    const debouncedRef = useRef(debouncedSearch);
    debouncedRef.current = debouncedSearch;

    useEffect(() => {
        const desired = debouncedSearch || undefined;
        if (desired === (queryRef.current || undefined)) return;

        navigate({
            to: '.',
            search: (prev: Record<string, unknown>) => {
                const next = { ...prev };
                if (desired) {
                    next.search = desired;
                } else {
                    delete next.search;
                }
                delete next.page;
                return next;
            },
            replace: true,
        });
    }, [debouncedSearch, navigate]);

    useEffect(() => {
        if ((query || undefined) !== (debouncedRef.current || undefined)) {
            setSearch(query);
        }
    }, [query]);

    return (
        <Input
            className="w-full"
            value={search || ''}
            onChange={(event) => setSearch(event.target.value)}
            type="text"
            placeholder="Пошук..."
        />
    );
};

type Props = {
    value: TodoContentType;
    className?: string;
};

const TodoContentNavbar: FC<Props> = ({ value, className }) => {
    return (
        <div
            className={cn(
                'surface -mx-4 flex flex-col gap-4 rounded-none border border-x-0 p-4 md:mx-0 md:flex-row md:items-center md:rounded-md md:border-x',
                className,
            )}
        >
            <div className="min-w-0 flex-1">
                <Suspense>
                    <Search />
                </Suspense>
            </div>

            <Separator orientation="vertical" className="hidden h-6 md:block" />

            <div className="flex items-center gap-4">
                <Sort
                    sort_type={getTodoSortType(value)}
                    compact
                    className="min-w-0 flex-1 overflow-hidden md:w-46"
                    placeholder="Сортування"
                />

                <Separator orientation="vertical" className="h-6" />
            </div>
        </div>
    );
};

export default TodoContentNavbar;
