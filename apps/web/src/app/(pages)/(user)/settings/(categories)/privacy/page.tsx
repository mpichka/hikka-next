import { FC } from 'react';

import P from '@/components/typography/p';
import {
    Header,
    HeaderContainer,
    HeaderTitle,
} from '@/components/ui/header';
import { PrivacySettings } from '@/features/settings';

interface Props {
    params: {
        slug: string;
    };
}

const SecuritySettingsPage: FC<Props> = async (props) => {
    const params = await props.params;
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col">
                <Header>
                    <HeaderContainer>
                        <HeaderTitle>Приватність</HeaderTitle>
                    </HeaderContainer>
                </Header>
                <P className="text-sm text-muted-foreground">
                    Налаштуйте який контент відображатиметься у вашому профілі
                </P>
            </div>
            <PrivacySettings />
        </div>
    );
};

export default SecuritySettingsPage;
