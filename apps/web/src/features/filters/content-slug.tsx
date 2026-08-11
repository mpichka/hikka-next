import { type FC, useEffect, useState } from 'react';

import { Link2 } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useDebounce from '@/services/hooks/use-debounce';

type Props = {
    /** Included in the reset effect's deps so an in-flight edit is discarded on tab switch. */
    resetKey: unknown;
    value: string | undefined;
    onChange: (value: string | undefined) => void;
};

/**
 * Temporary hack: the API has no way to filter characters/persons by
 * mal_id directly, so this lets moderators paste the parent content's
 * slug instead. Remove once character/person todo endpoints gain a
 * proper mal_id filter.
 */
export const ContentSlug: FC<Props> = ({ resetKey, value, onChange }) => {
    const [input, setInput] = useState(value ?? '');
    const [debounced] = useDebounce({ value: input, delay: 500 });

    useEffect(() => {
        setInput(value ?? '');
    }, [value, resetKey]);

    useEffect(() => {
        const parsed = debounced || undefined;
        if (parsed === value) return;
        onChange(parsed);
    }, [debounced]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
                <Link2 className="size-4 shrink-0" />
                <Label htmlFor="content_slug">Slug контенту</Label>
            </div>
            <Input
                id="content_slug"
                placeholder="Введіть slug контенту..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
        </div>
    );
};
