import type { FC } from 'react';

import type { MainContentTypeEnum } from '@hikka/api';

import MDViewer from '@/components/markdown/viewer/md-viewer';
import TextExpand from '@/components/text-expand';
import Block from '@/components/ui/block';
import Card from '@/components/ui/card';
import { Header, HeaderContainer, HeaderTitle } from '@/components/ui/header';
import { CONTENT_CONFIG } from '@/utils/constants/common';
import { useParams } from '@/utils/navigation';

type Props = {
    content_type: MainContentTypeEnum;
};

const Notes: FC<Props> = ({ content_type }) => {
    const params = useParams();

    const { data: userlist, isError } = CONTENT_CONFIG[
        content_type
    ].useUserlistRecord(String(params.slug));

    const note = !isError ? userlist?.note : undefined;

    if (!note || note.trim() === '') {
        return null;
    }

    return (
        <Card id="content-notes">
            <Block>
                <Header>
                    <HeaderContainer>
                        <HeaderTitle variant="h4">Нотатки</HeaderTitle>
                    </HeaderContainer>
                </Header>
                <TextExpand>
                    <MDViewer className="text-sm">
                        {note}
                    </MDViewer>
                </TextExpand>
            </Block>
        </Card>
    );
};

export default Notes;
