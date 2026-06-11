import React, { useState, useEffect } from 'react';
import { Modal, TouchableOpacity, ScrollView, View, ColorSchemeName } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Snack } from '@/interfaces/Snack/ISnackDetailsInterface';
import * as S from '../../styles';

interface SubstitutionModalProps {
    visible: boolean;
    onClose: () => void;
    mainSnack: Snack | null;
    currentSelected: Snack | null;
    onConfirm: (selected: Snack) => void;
    theme: ColorSchemeName;
    t: (key: string) => string;
}

export default function SubstitutionModal({
    visible,
    onClose,
    mainSnack,
    currentSelected,
    onConfirm,
    theme,
    t,
}: SubstitutionModalProps) {
    const [localSelected, setLocalSelected] = useState<Snack | null>(null);

    useEffect(() => {
        if (visible && currentSelected) {
            setLocalSelected(currentSelected);
        }
    }, [visible, currentSelected]);

    if (!mainSnack) return null;

    const options = [mainSnack, ...(mainSnack.substitutions ?? [])];

    const getCalories = (snack: Snack) => {
        const energyInfo = snack.food?.foodNutritionInfo?.find(
            (info: any) =>
                info.nutritionalComposition?.item?.toLowerCase() === "energia" ||
                info.idNutritionalCompositionNavigation?.item?.toLowerCase() === "energia"
        );
        const baseCalories = energyInfo?.quantity ?? 0;
        const unitName = snack.unitMeasurement?.name;
        let quantityInGrams = snack.quantity;
        if (unitName) {
            switch (unitName.toLowerCase()) {
                case "g":
                    quantityInGrams = snack.quantity;
                    break;
                case "mg":
                    quantityInGrams = snack.quantity * 0.001;
                    break;
                case "kg":
                    quantityInGrams = snack.quantity * 1000;
                    break;
                case "mcg":
                case "µg":
                    quantityInGrams = snack.quantity * 1e-6;
                    break;
                case "dg":
                    quantityInGrams = snack.quantity * 0.1;
                    break;
                case "hg":
                    quantityInGrams = snack.quantity * 100;
                    break;
                case "oz":
                    quantityInGrams = snack.quantity * 28.3495;
                    break;
                default:
                    quantityInGrams = snack.quantity;
                    break;
            }
        }
        return Math.round((baseCalories * quantityInGrams) / 100);
    };

    const handleConfirm = () => {
        if (localSelected) {
            onConfirm(localSelected);
        }
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <S.ModalOverlay>
                <S.ModalContent theme={theme}>
                    <S.ModalHeader>
                        <S.ModalTitle theme={theme}>{t("Substituir Alimento")}</S.ModalTitle>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color={theme === 'dark' ? '#fff' : '#000'} />
                        </TouchableOpacity>
                    </S.ModalHeader>

                    <S.ModalSubtitle>
                        {t("Selecione qual alimento foi consumido:")}
                    </S.ModalSubtitle>

                    <ScrollView style={{ maxHeight: 300 }} showsVerticalScrollIndicator={false}>
                        {options.map((option) => {
                            const isSelected = localSelected?.id === option.id;
                            const isOriginal = option.id === mainSnack.id;
                            const itemCalories = getCalories(option);

                            return (
                                <S.ModalOptionCard
                                    key={option.id}
                                    theme={theme}
                                    selected={isSelected}
                                    onPress={() => setLocalSelected(option)}
                                    activeOpacity={0.8}
                                >
                                    <S.ModalOptionRadio selected={isSelected}>
                                        {isSelected && <S.ModalOptionRadioInner />}
                                    </S.ModalOptionRadio>

                                    <S.ModalOptionTextColumn>
                                        <S.ModalOptionName theme={theme}>
                                            {option.food.name}
                                        </S.ModalOptionName>
                                        <S.ModalOptionDetails>
                                            {option.quantity} {option.unitMeasurement.name}
                                            {isOriginal ? ` (${t("Original")})` : ` (${t("Substituto")})`}
                                        </S.ModalOptionDetails>
                                    </S.ModalOptionTextColumn>

                                    <View>
                                        <S.ModalOptionCalorie theme={theme}>
                                            {itemCalories}
                                        </S.ModalOptionCalorie>
                                        <S.FoodCalorieLabel>kcal</S.FoodCalorieLabel>
                                    </View>
                                </S.ModalOptionCard>
                            );
                        })}
                    </ScrollView>

                    <S.ModalButtonGroup>
                        <S.ModalCancelButton theme={theme} onPress={onClose}>
                            <S.ModalCancelButtonText theme={theme}>{t("Cancelar")}</S.ModalCancelButtonText>
                        </S.ModalCancelButton>
                        <S.ModalConfirmButton onPress={handleConfirm}>
                            <S.ModalConfirmButtonText>{t("Confirmar")}</S.ModalConfirmButtonText>
                        </S.ModalConfirmButton>
                    </S.ModalButtonGroup>
                </S.ModalContent>
            </S.ModalOverlay>
        </Modal>
    );
}
