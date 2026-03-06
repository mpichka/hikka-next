'use client';

import {
    useIgnoredNotifications,
    useUpdateIgnoredNotifications,
} from '@hikka/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import FormSwitch from '@/components/form/form-switch';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Header, HeaderContainer, HeaderTitle } from '@/components/ui/header';

import { useModalContext } from '@/services/providers/modal-provider';
import { z } from '@/utils/i18n/zod';

const formSchema = z.object({
    comment_reply: z.boolean().default(true),
    comment_vote: z.boolean().default(true),
    comment_tag: z.boolean().default(true),
    collection_comment: z.boolean().default(true),
    article_comment: z.boolean().default(true),
    collection_vote: z.boolean().default(true),
    article_vote: z.boolean().default(true),
    edit_comment: z.boolean().default(true),
    edit_accepted: z.boolean().default(true),
    edit_denied: z.boolean().default(true),
    edit_updated: z.boolean().default(true),
    hikka_update: z.boolean().default(true),
    schedule_anime: z.boolean().default(true),
    follow: z.boolean().default(true),
    thirdparty_login: z.boolean().optional().nullable().default(true),
});

const Component = () => {
    const { closeModal } = useModalContext();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: formSchema.parse({}),
    });

    const { data } = useIgnoredNotifications();
    const { mutate: changeIgnoredNotifications, isPending } =
        useUpdateIgnoredNotifications({
            options: {
                onSuccess: async () => {
                    closeModal();
                    toast.success('Ви успішно змінили налаштування сповіщень.');
                },
            },
        });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        // changeIgnoredNotifications({
        //     ignored_notifications: Object.keys(data).filter(
        //         (key) => !data[key as keyof z.infer<typeof formSchema>],
        //     ) as NotificationTypeEnum[],
        // });
    };

    // useEffect(() => {
    //     if (data?.ignored_notifications) {
    //         form.reset(
    //             data.ignored_notifications.reduce(
    //                 (acc, key) => {
    //                     acc[key as keyof z.infer<typeof formSchema>] = false;
    //                     return acc;
    //                 },
    //                 {} as z.infer<typeof formSchema>,
    //             ),
    //         );
    //     }
    // }, [data?.ignored_notifications]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col items-start gap-8"
            >
                <div className="flex w-full flex-col gap-6">
                    <Header>
                        <HeaderContainer>
                            <HeaderTitle variant="h4">Видимість профілю</HeaderTitle>
                        </HeaderContainer>
                    </Header>
                    <FormSwitch
                        name="hide_from_strangers"
                        label="Сховати від посторонніх"
                        description="Користувачі зможуть бачити активність вашого профілю лише якщо ви на них підпишетесь"
                        className="w-full"
                    />
                    <FormSwitch
                        name="show_hentai_activity"
                        label="Показувати контент для дорослих"
                        description="Користувачі зможуть бачити вашу активність пов'язану з контентом для дорослих: еротика, еччі та хентай"
                        className="w-full"
                    />
                </div>
                <div className="flex w-full flex-col gap-6">
                    <Header>
                        <HeaderContainer>
                            <HeaderTitle variant="h4">Активність профілю</HeaderTitle>
                        </HeaderContainer>
                    </Header>
                    <FormSwitch
                        name="show_activity"
                        label="Показувати історію"
                        description="Користувачі та підписники зможуть бачити історію активності вашого профілю"
                        className="w-full"
                    />
                    <FormSwitch
                        name="show_favourites"
                        label="Показувати улюблені"
                        description="Користувачі та підписники зможуть бачити ваші улюблені аніме, манґу, ранобе, персонажей та колекції"
                        className="w-full"
                    />
                    <FormSwitch
                        name="show_statistics"
                        label="Показувати статистику"
                        description="Користувачі та підписники зможуть бачити ваш список переглянутих та запланованих аніме, манґи та ранобе"
                        className="w-full"
                    />
                    <FormSwitch
                        name="show_collections"
                        label="Показувати колекції"
                        description="Користувачі та підписники зможуть бачити ваш список колекцій в профілі (окрім приватних)"
                        className="w-full"
                    />
                </div>
                <Button
                    size="md"
                    disabled={isPending}
                    variant="default"
                    type="submit"
                >
                    {isPending && (
                        <span className="loading loading-spinner"></span>
                    )}
                    Зберегти
                </Button>
            </form>
        </Form>
    );
};

export default Component;
