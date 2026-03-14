'use client';

import { CollectionContent, CollectionResponse } from '@hikka/client';
import Link from 'next/link';
import * as React from 'react';

import ContentCard from '@/components/content-card/content-card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { cn } from '@/utils/cn';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';


interface Props {
  collection: CollectionResponse<CollectionContent>;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  type?: 'link' | 'button';
}

const CollectionCard = ({ collection, onClick, type }: Props) => {
  const Comp = type === 'button' ? 'button' : Link;

  const collectionFrontImage = collection.collection[0]?.content.image;

  return (
    <Comp
      href={'/collections/' + collection.reference}
      onClick={onClick}
      className="flex w-full items-start gap-4 text-left"
    >
      <div className="w-12 sm:w-16">
        <ContentCard
          image={collectionFrontImage}
          className={cn(collection.spoiler && 'spoiler-blur-md')}
          titleClassName={cn(
            collection.spoiler && 'spoiler-blur-xs',
          )}
          containerClassName={cn(
            collection.nsfw && 'spoiler-blur-md',
          )}
        />
      </div>
      <div className="flex w-full flex-1 flex-col gap-2">
        <div className="flex items-center gap-2">
          <Label className="line-clamp-2 font-bold">
            {collection.title}
          </Label>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {collection!.spoiler && (
              <Badge variant="warning">Спойлери</Badge>
            )}
            {collection!.nsfw && (
              <Badge variant="destructive">+18</Badge>
            )}
            {collection.tags.length > 0 && (
              <Badge variant="secondary">{collection.tags[0]}</Badge>
            )}
            {collection.tags.slice(1).map((tag) => (
              <Badge
                key={tag}
                className="hidden md:block"
                variant="secondary"
              >
                {tag}
              </Badge>
            ))}
            {collection.tags.length > 2 && (
              <Badge variant="outline" className="block md:hidden">
                +{collection.tags.length - 1}
              </Badge>
            )}
          </div>
          <div className='flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-sm max-w-prose'>
            {collection.description}
          </div>
        </div>
      </div>
      {collection.vote_score > 0 ? (
        <div className="flex items-center gap-1 text-sm">
          <p className="font-bold leading-normal">{collection.vote_score}</p>
          <ArrowBigUp className="size-5!" />
        </div>
      ) : collection.vote_score < 0 ?
        <div className="flex items-center gap-1 text-sm">
          <p className="font-bold leading-normal">{collection.vote_score}</p>
          <ArrowBigDown className="size-5!" />
        </div>
        : ''}

    </Comp>
  );
};

export default CollectionCard;
