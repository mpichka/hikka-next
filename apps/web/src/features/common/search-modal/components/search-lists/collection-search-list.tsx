'use client';

import { CollectionContent, CollectionResponse } from '@hikka/client';
import { useSearchCollections } from '@hikka/react';
import { useRouter } from 'next/navigation';
import { ReactNode, useCallback } from 'react';

import LoadMoreButton from '@/components/load-more-button';
import {
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import { MIN_SEARCH_LENGTH } from '@/utils/constants/common';

import CollectionCard from '../cards/collection-card';
import SearchPlaceholders from '../search-placeholders';

interface Props {
  onDismiss: (collection: CollectionResponse<CollectionContent>) => void;
  type?: 'link' | 'button';
  children?: ReactNode;
  value?: string;
}

const CollectionSearchList = ({ onDismiss, type, value }: Props) => {
  const router = useRouter();

  const handleSelect = useCallback(
    (collection: CollectionResponse<CollectionContent>) => {
      onDismiss(collection);

      if (type !== 'button') {
        router.push('/collections/' + collection.reference);
      }
    },
    [onDismiss, router, type],
  );
  const {
    list: listM,
    isFetching,
    isRefetching,
    ref,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useSearchCollections({
    args: { query: value, only_public: true },
    paginationArgs: { size: 30 },
    queryKey: ['collections-search-list', value],
    options: {
      enabled: value !== undefined && value.length >= MIN_SEARCH_LENGTH,
    },
  });

  let list = listM as unknown as CollectionResponse<CollectionContent>[];

  return (
    <CommandList className="max-h-none">
      <SearchPlaceholders
        data={list}
        isFetching={isFetching}
        isRefetching={isRefetching}
      />
      {list && list.length > 0 && (
        <CommandGroup>
          {list.map((collection) => (
            <CommandItem
              key={collection.reference}
              value={collection.reference}
              onSelect={() => handleSelect(collection)}
            >
              <CollectionCard
                onClick={() => onDismiss(collection)}
                collection={collection}
                type={type}
              />
            </CommandItem>
          ))}
        </CommandGroup>
      )}
      <div className="flex items-center justify-center">
        {hasNextPage && (
          <LoadMoreButton
            ref={ref}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        )}
      </div>
    </CommandList>
  );
};

export default CollectionSearchList;
