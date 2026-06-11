import { View, ScrollView, Animated, Alert, TextInput, Image, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { Colors } from '@/constants/Colors';
import StatusMeal from '@/enums/StatusMeal';
import { useSnackDetails } from './hooks/useSnackDetails';
import {
    PageContainer,
    HeaderContainer,
    HeaderButton,
    HeaderTitle,
    CenterProgressWrapper,
    CircularProgressInner,
    CalorieValue,
    CalorieLabel,
    MacrosRow,
    MacroCard,
    MacroLabelRow,
    MacroDot,
    MacroLabel,
    MacroValueText,
    MacroProgressLine,
    MacroProgressFill,
    SectionTitle,
    FoodListContainer,
    FoodCard,
    FoodIconContainer,
    FoodTextColumn,
    FoodNameText,
    FoodDescText,
    FoodCalorieContainer,
    FoodCalorieText,
    FoodCalorieLabel,
    AddFoodButton,
    AddFoodText,
    ActionButton,
    ActionButtonText,
    PhotoUploadContainer,
    PhotoUploadText,
    ObservationContainer,
    ObservationInput,
    EmptyStateContainer,
    EmptyStateText,
    ScrollContainer,
    MealPhotoWrapper,
    MealPhotoImage,
    RemovePhotoBadge,
    SubstitutesContainer,
    SubstituteRow,
    SubstituteLeft,
    SubstituteTextColumn,
    SubstituteNameText,
    SubstituteDescText,
    SubstituteCal
} from './styles';

export default function SnackDetailsPage() {
    const {
        idMeal,
        idTypeSnack,
        snackStore,
        t,
        insets,
        colorTheme,
        loading,
        uploadingPhoto,
        displayPhotoUri,
        pulseAnim,
        selectedSubstitutions,
        setSelectedSubstitutions,
        showModalForSnack,
        setShowModalForSnack,
        handleSave,
        deleteSnackFunction,
        handleAddPhoto,
        calculateTotals,
    } = useSnackDetails();

    const formatMealTime = (dateStr?: string) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return "";
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const mealTime = formatMealTime(snackStore.snackDetails?.appointment);
    const mealName = snackStore.snackDetails?.typeSnack?.name ?? t("Refeição");
    const titleText = mealTime ? `${mealName} - ${mealTime}` : mealName;

    const { calories, carbohydrates, protein, fat } = calculateTotals();

    const goalCalories = 800;
    const size = 160;
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(calories / goalCalories, 1.0);
    const strokeDashoffset = circumference * (1 - progress);

    const protPercent = Math.min((protein / 50) * 100, 100);
    const carbPercent = Math.min((carbohydrates / 100) * 100, 100);
    const fatPercent = Math.min((fat / 30) * 100, 100);

    const snacksList = snackStore.snackDetails?.snacks ?? [];
    const mainSnacks = snacksList.filter((item) => !item.isSubstitute);

    const SkeletonItem = ({ width, height, borderRadius = 8, style }: { width: any, height: any, borderRadius?: number, style?: any }) => (
        <Animated.View
            style={[
                {
                    width,
                    height,
                    borderRadius,
                    backgroundColor: colorTheme === 'dark' ? Colors.dark.border : Colors.light.border,
                    opacity: pulseAnim,
                },
                style,
            ]}
        />
    );

    return (
        <PageContainer theme={colorTheme} style={{ paddingTop: insets.top }}>
            <Stack.Screen options={{ headerShown: false }} />

            <HeaderContainer theme={colorTheme}>
                <HeaderButton onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={26} color={colorTheme === 'dark' ? Colors.dark.text : Colors.light.text} />
                </HeaderButton>
                <HeaderTitle theme={colorTheme}>{titleText}</HeaderTitle>
                <View style={{ width: 36 }} />
            </HeaderContainer>

            {loading ? (
                <ScrollView contentContainerStyle={{ padding: 20 }}>
                    <CenterProgressWrapper>
                        <SkeletonItem width={160} height={160} borderRadius={80} />
                    </CenterProgressWrapper>

                    <MacrosRow>
                        <MacroCard theme={colorTheme}>
                            <SkeletonItem width="100%" height={50} />
                        </MacroCard>
                        <MacroCard theme={colorTheme}>
                            <SkeletonItem width="100%" height={50} />
                        </MacroCard>
                        <MacroCard theme={colorTheme}>
                            <SkeletonItem width="100%" height={50} />
                        </MacroCard>
                    </MacrosRow>

                    <SectionTitle theme={colorTheme}>{t("Alimentos Consumidos")}</SectionTitle>
                    <SkeletonItem width="100%" height={65} borderRadius={12} style={{ marginBottom: 10 }} />
                    <SkeletonItem width="100%" height={65} borderRadius={12} style={{ marginBottom: 10 }} />
                    <SkeletonItem width="100%" height={65} borderRadius={12} style={{ marginBottom: 20 }} />

                    <SkeletonItem width="100%" height={85} borderRadius={12} style={{ marginBottom: 20 }} />
                    
                    <SectionTitle theme={colorTheme}>{t("Observações")}</SectionTitle>
                    <SkeletonItem width="100%" height={100} borderRadius={12} />
                </ScrollView>
            ) : (
                <ScrollContainer showsVerticalScrollIndicator={false}>
                    <CenterProgressWrapper>
                        <Svg width={size} height={size}>
                            <Circle
                                cx={size / 2}
                                cy={size / 2}
                                r={radius}
                                stroke={colorTheme === 'dark' ? Colors.dark.border : Colors.light.border}
                                strokeWidth={strokeWidth}
                                fill="transparent"
                            />
                            <Circle
                                cx={size / 2}
                                cy={size / 2}
                                r={radius}
                                stroke={Colors.color.green}
                                strokeWidth={strokeWidth}
                                fill="transparent"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                rotation="-90"
                                origin={`${size / 2}, ${size / 2}`}
                            />
                        </Svg>
                        <CircularProgressInner>
                            <Ionicons name="flame" size={30} color={Colors.color.green} />
                            <CalorieValue theme={colorTheme}>{calories}</CalorieValue>
                            <CalorieLabel>Kcal</CalorieLabel>
                        </CircularProgressInner>
                    </CenterProgressWrapper>

                    <MacrosRow>
                        <MacroCard theme={colorTheme}>
                            <MacroLabelRow>
                                <MacroDot color={Colors.color.blue} />
                                <MacroLabel>{t("Proteína")}</MacroLabel>
                            </MacroLabelRow>
                            <MacroValueText theme={colorTheme}>{protein}g</MacroValueText>
                            <MacroProgressLine theme={colorTheme}>
                                <MacroProgressFill color={Colors.color.blue} width={protPercent} />
                            </MacroProgressLine>
                        </MacroCard>

                        <MacroCard theme={colorTheme}>
                            <MacroLabelRow>
                                <MacroDot color={Colors.color.green} />
                                <MacroLabel>{t("Carb.")}</MacroLabel>
                            </MacroLabelRow>
                            <MacroValueText theme={colorTheme}>{carbohydrates}g</MacroValueText>
                            <MacroProgressLine theme={colorTheme}>
                                <MacroProgressFill color={Colors.color.green} width={carbPercent} />
                            </MacroProgressLine>
                        </MacroCard>

                        <MacroCard theme={colorTheme}>
                            <MacroLabelRow>
                                <MacroDot color={Colors.color.orange} />
                                <MacroLabel>{t("Gordura")}</MacroLabel>
                            </MacroLabelRow>
                            <MacroValueText theme={colorTheme}>{fat}g</MacroValueText>
                            <MacroProgressLine theme={colorTheme}>
                                <MacroProgressFill color={Colors.color.orange} width={fatPercent} />
                            </MacroProgressLine>
                        </MacroCard>
                    </MacrosRow>

                    <SectionTitle theme={colorTheme}>{t("Alimentos Consumidos")}</SectionTitle>
                    <FoodListContainer>
                        {mainSnacks.length > 0 ? (
                            mainSnacks.map((item) => {
                                const activeItem = selectedSubstitutions[item.id] || item;
                                const allOptions = [item, ...(item.substitutions ?? [])];
                                const alternativeOptions = allOptions.filter(opt => opt.id !== activeItem.id);
                                const hasSubstitutions = alternativeOptions.length > 0;

                                const energyInfo = activeItem.food.foodNutritionInfo?.find(
                                    (info: any) =>
                                        info.nutritionalComposition?.item?.toLowerCase() === "energia" ||
                                        info.idNutritionalCompositionNavigation?.item?.toLowerCase() === "energia"
                                );
                                const baseCalories = energyInfo?.quantity ?? 0;
                                
                                const unitName = activeItem.unitMeasurement?.name;
                                let quantityInGrams = activeItem.quantity;
                                if (unitName) {
                                    switch (unitName.toLowerCase()) {
                                        case "g":
                                            quantityInGrams = activeItem.quantity;
                                            break;
                                        case "mg":
                                            quantityInGrams = activeItem.quantity * 0.001;
                                            break;
                                        case "kg":
                                            quantityInGrams = activeItem.quantity * 1000;
                                            break;
                                        case "mcg":
                                        case "µg":
                                            quantityInGrams = activeItem.quantity * 1e-6;
                                            break;
                                        case "dg":
                                            quantityInGrams = activeItem.quantity * 0.1;
                                            break;
                                        case "hg":
                                            quantityInGrams = activeItem.quantity * 100;
                                            break;
                                        case "oz":
                                            quantityInGrams = activeItem.quantity * 28.3495;
                                            break;
                                        default:
                                            quantityInGrams = activeItem.quantity;
                                            break;
                                    }
                                }
                                const itemCalories = Math.round((baseCalories * quantityInGrams) / 100);

                                return (
                                    <React.Fragment key={item.id}>
                                        <FoodCard
                                            theme={colorTheme}
                                            $hasSubstitutions={hasSubstitutions}
                                            onPress={() => {
                                                router.push({
                                                    pathname: "/snack/food/[idMeal]/[idTypeSnack]/[idFood]",
                                                    params: {
                                                        idMeal: idMeal as string,
                                                        idTypeSnack: idTypeSnack as string,
                                                        idFood: activeItem.food.id.toString(),
                                                        idSnack: activeItem.id.toString(),
                                                        quantitySnack: activeItem.quantity.toString(),
                                                        idUnitMeasurement: activeItem.unitMeasurement.id.toString()
                                                    }
                                                });
                                            }}
                                        >
                                            <FoodIconContainer>
                                                <Ionicons name="restaurant-outline" size={20} color={Colors.color.green} />
                                            </FoodIconContainer>
                                            
                                            <FoodTextColumn>
                                                <FoodNameText theme={colorTheme} numberOfLines={1}>
                                                    {activeItem.food.name}
                                                </FoodNameText>
                                                <FoodDescText>{activeItem.quantity} {activeItem.unitMeasurement.name}</FoodDescText>
                                                {activeItem.id !== item.id && (
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                                        <Ionicons name="swap-horizontal" size={12} color={Colors.color.orange} style={{ marginRight: 4 }} />
                                                        <Text style={{ fontSize: 11, color: Colors.color.orange, fontWeight: '600' }}>
                                                            {t("Substituído")}
                                                        </Text>
                                                    </View>
                                                )}
                                            </FoodTextColumn>

                                            <>
                                                <FoodCalorieContainer>
                                                    <FoodCalorieText theme={colorTheme}>{itemCalories}</FoodCalorieText>
                                                    <FoodCalorieLabel>kcal</FoodCalorieLabel>
                                                </FoodCalorieContainer>

                                                {(snackStore.snackDetails?.status === StatusMeal.NotAwnsered || snackStore.snackDetails?.status == null) && (
                                                    <HeaderButton 
                                                        onPress={(e) => {
                                                            e?.stopPropagation();
                                                            deleteSnackFunction(item.id);
                                                        }}
                                                        style={{ marginLeft: 10, padding: 5 }}
                                                    >
                                                        <Ionicons name="trash-outline" size={20} color={Colors.color.red} />
                                                    </HeaderButton>
                                                )}
                                                <Ionicons name="chevron-forward" size={16} color={Colors.color.grey} style={{ marginLeft: 5 }} />
                                            </>
                                        </FoodCard>

                                        {hasSubstitutions && (
                                            <SubstitutesContainer>
                                                {alternativeOptions.map((alt, index) => {
                                                    const altEnergyInfo = alt.food.foodNutritionInfo?.find(
                                                        (info: any) =>
                                                            info.nutritionalComposition?.item?.toLowerCase() === "energia" ||
                                                            info.idNutritionalCompositionNavigation?.item?.toLowerCase() === "energia"
                                                    );
                                                    const altBaseCalories = altEnergyInfo?.quantity ?? 0;
                                                    
                                                    const altUnitName = alt.unitMeasurement?.name;
                                                    let altQuantityInGrams = alt.quantity;
                                                    if (altUnitName) {
                                                        switch (altUnitName.toLowerCase()) {
                                                            case "g":
                                                                altQuantityInGrams = alt.quantity;
                                                                break;
                                                            case "mg":
                                                                altQuantityInGrams = alt.quantity * 0.001;
                                                                break;
                                                            case "kg":
                                                                altQuantityInGrams = alt.quantity * 1000;
                                                                break;
                                                            case "mcg":
                                                            case "µg":
                                                                altQuantityInGrams = alt.quantity * 1e-6;
                                                                break;
                                                            case "dg":
                                                                altQuantityInGrams = alt.quantity * 0.1;
                                                                break;
                                                            case "hg":
                                                                altQuantityInGrams = alt.quantity * 100;
                                                                break;
                                                            case "oz":
                                                                altQuantityInGrams = alt.quantity * 28.3495;
                                                                break;
                                                            default:
                                                                altQuantityInGrams = alt.quantity;
                                                                break;
                                                        }
                                                    }
                                                    const altCalories = Math.round((altBaseCalories * altQuantityInGrams) / 100);
                                                    const isLast = index === alternativeOptions.length - 1;

                                                    return (
                                                        <SubstituteRow
                                                            key={alt.id}
                                                            theme={colorTheme}
                                                            $isLast={isLast}
                                                            onPress={() => {
                                                                setSelectedSubstitutions(prev => ({
                                                                    ...prev,
                                                                    [item.id]: alt
                                                                }));
                                                            }}
                                                        >
                                                            <SubstituteLeft>
                                                                <Ionicons name="swap-horizontal" size={16} color={colorTheme === 'light' ? '#16A34A' : '#4ADE80'} />
                                                                <SubstituteTextColumn>
                                                                    <SubstituteNameText theme={colorTheme}>
                                                                        {alt.food.name}
                                                                    </SubstituteNameText>
                                                                    <SubstituteDescText>
                                                                        {alt.quantity} {alt.unitMeasurement.name}
                                                                    </SubstituteDescText>
                                                                </SubstituteTextColumn>
                                                            </SubstituteLeft>
                                                            <SubstituteCal theme={colorTheme}>
                                                                {altCalories} kcal
                                                            </SubstituteCal>
                                                            <Ionicons name="chevron-forward" size={14} color={colorTheme === 'light' ? '#16A34A' : '#4ADE80'} />
                                                        </SubstituteRow>
                                                    );
                                                })}
                                            </SubstitutesContainer>
                                        )}
                                    </React.Fragment>
                                );
                            })
                        ) : (
                            <EmptyStateContainer theme={colorTheme}>
                                <Ionicons name="receipt-outline" size={32} color={Colors.color.grey} />
                                <EmptyStateText>
                                    {t("Nenhum alimento cadastrado para esta refeição.")}
                                </EmptyStateText>
                            </EmptyStateContainer>
                        )}
                    </FoodListContainer>

                    <AddFoodButton onPress={() => router.navigate(`/snack/food/${idMeal}/${idTypeSnack}/search-food`)}>
                        <Ionicons name="add-circle" size={20} color={Colors.color.green} />
                        <AddFoodText>{t("Adicionar Alimento")}</AddFoodText>
                    </AddFoodButton>

                    {uploadingPhoto ? (
                        <PhotoUploadContainer theme={colorTheme} disabled>
                            <ActivityIndicator size="large" color={Colors.color.green} />
                            <PhotoUploadText>{t("Enviando foto...")}</PhotoUploadText>
                        </PhotoUploadContainer>
                    ) : displayPhotoUri ? (
                        <MealPhotoWrapper>
                            <TouchableOpacity onPress={handleAddPhoto} activeOpacity={0.8}>
                                <MealPhotoImage source={{ uri: displayPhotoUri }} />
                            </TouchableOpacity>
                            <RemovePhotoBadge onPress={handleAddPhoto}>
                                <Ionicons name="camera" size={18} color={Colors.color.white} />
                            </RemovePhotoBadge>
                        </MealPhotoWrapper>
                    ) : (
                        <PhotoUploadContainer theme={colorTheme} onPress={handleAddPhoto}>
                            <Ionicons name="camera" size={32} color={Colors.color.green} />
                            <PhotoUploadText>{t("Toque para adicionar uma foto")}</PhotoUploadText>
                        </PhotoUploadContainer>
                    )}

                    <ObservationContainer>
                        <SectionTitle theme={colorTheme}>{t("Observações")}</SectionTitle>
                        <ObservationInput
                            theme={colorTheme}
                            multiline
                            placeholder={t("Como você se sentiu após a refeição? Fez alguma substituição?")}
                            placeholderTextColor={Colors.color.grey}
                            value={snackStore.snackDetails?.observation}
                            onChangeText={(text) => snackStore.setObservation(text)}
                        />
                    </ObservationContainer>

                    <ActionButton onPress={handleSave}>
                        <ActionButtonText>{t("Salvar Alterações")}</ActionButtonText>
                    </ActionButton>
                </ScrollContainer>
            )}
        </PageContainer>
    );
}