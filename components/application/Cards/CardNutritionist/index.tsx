import React from 'react'
import { 
    PageContainer, 
    AvatarContainer, 
    AvatarText, 
    AvatarImage, 
    DataCard, 
    NameText, 
    SubtitleText, 
    BadgesRow, 
    StatusBadge, 
    StatusBadgeText, 
    SelectionIconWrapper 
} from './styles'
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from 'react-i18next';
import INutritionistListInterface from '@/interfaces/User/INutritionistListInterface';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import StatusNutritionist from '@/enums/StatusNutritionist';

type CardNutritionistProps = {
    nutri: INutritionistListInterface
    onPress: (item: INutritionistListInterface) => void;
}

export default function CardNutritionist(props: CardNutritionistProps) {
    const colorScheme = useColorScheme();
    const { t } = useTranslation();
    const { nutritionist, link } = props.nutri;
    
    const isSelected = link.isCurrentNutritionist;

    const getInitials = (name?: string | null) => {
        if (!name) return 'N';
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };

    // Render appropriate status badges
    const renderBadges = () => {
        const badges = [];

        if (isSelected) {
            badges.push(
                <StatusBadge key="active" bgColor={`${Colors.color.green}20`}>
                    <StatusBadgeText textColor={Colors.color.green}>
                        {t('Ativo')}
                    </StatusBadgeText>
                </StatusBadge>
            );
        } else if (link.linkStatus === StatusNutritionist.Accepted) {
            badges.push(
                <StatusBadge key="linked" bgColor={`${Colors.color.blue}20`}>
                    <StatusBadgeText textColor={Colors.color.blue}>
                        {t('Vinculado')}
                    </StatusBadgeText>
                </StatusBadge>
            );
        }

        if (link.linkStatus === StatusNutritionist.Pending) {
            badges.push(
                <StatusBadge key="pending" bgColor={`${Colors.color.orange}20`}>
                    <StatusBadgeText textColor={Colors.color.orange}>
                        {t('Pendente')}
                    </StatusBadgeText>
                </StatusBadge>
            );
        } else if (link.linkStatus === StatusNutritionist.Rejected) {
            badges.push(
                <StatusBadge key="rejected" bgColor={`${Colors.color.red}20`}>
                    <StatusBadgeText textColor={Colors.color.red}>
                        {t('Recusado')}
                    </StatusBadgeText>
                </StatusBadge>
            );
        }

        return <BadgesRow>{badges}</BadgesRow>;
    };

    return (
        <PageContainer 
            theme={colorScheme} 
            isSelected={isSelected}
            onPress={() => props.onPress(props.nutri)}
        >
            {nutritionist.urlImage ? (
                <AvatarImage source={{ uri: nutritionist.urlImage }} />
            ) : (
                <AvatarContainer theme={colorScheme} isSelected={isSelected}>
                    <AvatarText isSelected={isSelected}>
                        {getInitials(nutritionist.name)}
                    </AvatarText>
                </AvatarContainer>
            )}

            <DataCard>
                <NameText theme={colorScheme}>{nutritionist.name}</NameText>
                <SubtitleText>{nutritionist.email || t('Sem e-mail')}</SubtitleText>
                {renderBadges()}
            </DataCard>

            {isSelected && (
                <SelectionIconWrapper>
                    <Ionicons name="checkmark-circle" size={24} color={Colors.color.green} />
                </SelectionIconWrapper>
            )}
        </PageContainer>
    )
}