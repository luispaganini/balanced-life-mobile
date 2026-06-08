import { View, ScrollView, Animated, Alert, TextInput, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { router, useLocalSearchParams, Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Svg, { Circle } from 'react-native-svg'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import { getSnackDetailsAsync, deleteSnack, sendSnack } from '@/services/snack/snack'
import { uploadMealPicture } from '@/services/user/user'
import { useSnackStore } from '@/store/SnackStore'
import StatusMeal from '@/enums/StatusMeal'
import * as ImagePicker from 'expo-image-picker'
import {
    PageContainer,
    HeaderContainer,
    HeaderButton,
    HeaderTitle,
    HeaderActionText,
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
    RemovePhotoBadge
} from './styles'

export default function SnackDetailsPage() {
    const { idMeal, idTypeSnack } = useLocalSearchParams()
    const snackStore = useSnackStore()
    const { t } = useTranslation()
    const insets = useSafeAreaInsets()
    const [loading, setLoading] = useState(false)
    const [uploadingPhoto, setUploadingPhoto] = useState(false)
    const [localPhotoUri, setLocalPhotoUri] = useState<string | null>(null)

    // Pulse animation for skeleton loading
    const pulseAnim = useRef(new Animated.Value(0.4)).current

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        if (loading) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 0.8,
                        duration: 850,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 0.4,
                        duration: 850,
                        useNativeDriver: true,
                    })
                ])
            ).start()
        } else {
            pulseAnim.setValue(0.4)
        }
    }, [loading])

    const loadData = async () => {
        setLoading(true)
        try {
            const snacksDetails = await getSnackDetailsAsync(parseInt(idMeal as string), parseInt(idTypeSnack as string))
            snackStore.setSnackDetails(snacksDetails)
        } catch (error) {
            console.error("Failed to load snack details:", error)
        } finally {
            setLoading(false)
        }
    }

    const deleteSnackFunction = async (idSnack: number) => {
        Alert.alert(
            t("Remover Alimento"),
            t("Deseja realmente remover este alimento?"),
            [
                { text: t("Cancelar"), style: "cancel" },
                {
                    text: t("Remover"),
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteSnack(idSnack)
                            snackStore.deleteSnackFromDetails(idSnack)
                            loadData()
                        } catch (error) {
                            console.error(error)
                        }
                    }
                }
            ]
        )
    }

    const handleSave = async () => {
        setUploadingPhoto(true);
        try {
            if (localPhotoUri) {
                const uploadResult = await uploadMealPicture(parseInt(idMeal as string), localPhotoUri);
                if (uploadResult && uploadResult.url) {
                    if (snackStore.snackDetails) {
                        snackStore.setSnackDetails({
                            ...snackStore.snackDetails,
                            urlImage: uploadResult.url
                        });
                    }
                } else {
                    Alert.alert(t("Erro"), t("Falha ao salvar imagem da refeição."));
                    setUploadingPhoto(false);
                    return;
                }
            }

            await sendSnack(
                snackStore.snackDetails?.status ?? StatusMeal.Finished,
                snackStore.snackDetails?.observation ?? '',
                parseInt(idMeal as string)
            )
            setLocalPhotoUri(null);
            Alert.alert(t("Sucesso"), t("Refeição salva com sucesso!"))
            router.navigate('/')
        } catch (error) {
            console.error(error)
            Alert.alert(t("Erro"), t("Falha ao salvar as alterações."))
        } finally {
            setUploadingPhoto(false);
        }
    }

    const handleAddPhoto = () => {
        Alert.alert(
            t("Selecionar Foto"),
            t("Escolha como deseja obter a foto da refeição:"),
            [
                {
                    text: t("Tirar Foto"),
                    onPress: () => processMealImageSelection(true),
                },
                {
                    text: t("Escolher da Galeria"),
                    onPress: () => processMealImageSelection(false),
                },
                {
                    text: t("Cancelar"),
                    style: "cancel",
                },
            ]
        );
    };

    const processMealImageSelection = async (useCamera: boolean) => {
        try {
            let status = "";
            if (useCamera) {
                const permission = await ImagePicker.requestCameraPermissionsAsync();
                status = permission.status;
            } else {
                const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
                status = permission.status;
            }

            if (status !== "granted") {
                Alert.alert(
                    t("Permissão necessária"),
                    useCamera
                        ? t("Precisamos de permissão para acessar sua câmera.")
                        : t("Precisamos de permissão para acessar sua galeria.")
                );
                return;
            }

            const pickerOptions: ImagePicker.ImagePickerOptions = {
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.7, // Compress quality (70%)
            };

            const result = useCamera
                ? await ImagePicker.launchCameraAsync(pickerOptions)
                : await ImagePicker.launchImageLibraryAsync(pickerOptions);

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const pickedUri = result.assets[0].uri;
                setLocalPhotoUri(pickedUri);
                if (snackStore.snackDetails) {
                    snackStore.setSnackDetails({
                        ...snackStore.snackDetails,
                        urlImage: pickedUri
                    });
                }
            }
        } catch (error) {
            console.error(error);
            Alert.alert(t("Erro"), t("Falha ao obter imagem."));
        }
    };

    // Helper component for skeleton loading elements
    const SkeletonItem = ({ width, height, borderRadius = 8, style }: { width: any, height: any, borderRadius?: number, style?: any }) => (
        <Animated.View
            style={[
                {
                    width,
                    height,
                    borderRadius,
                    backgroundColor: Colors.dark.border,
                    opacity: pulseAnim,
                },
                style,
            ]}
        />
    )

    // Parse time from appointment or typeSnack name
    const formatMealTime = (dateStr?: string) => {
        if (!dateStr) return ""
        const date = new Date(dateStr)
        if (isNaN(date.getTime())) return ""
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `${hours}:${minutes}`
    }

    const mealTime = formatMealTime(snackStore.snackDetails?.appointment)
    const mealName = snackStore.snackDetails?.typeSnack?.name ?? t("Refeição")
    const titleText = mealTime ? `${mealName} - ${mealTime}` : mealName

    // Circular Progress settings
    const currentCalories = snackStore.snackDetails?.calories ?? 0
    const goalCalories = 800 // Default reference target for visual progress circle
    const size = 160
    const strokeWidth = 10
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const progress = Math.min(currentCalories / goalCalories, 1.0)
    const strokeDashoffset = circumference * (1 - progress)

    // Macro goals for visual underlines
    const protValue = snackStore.snackDetails?.protein ?? 0
    const carbValue = snackStore.snackDetails?.carbohydrates ?? 0
    const fatValue = snackStore.snackDetails?.fat ?? 0

    const protPercent = Math.min((protValue / 50) * 100, 100)
    const carbPercent = Math.min((carbValue / 100) * 100, 100)
    const fatPercent = Math.min((fatValue / 30) * 100, 100)

    const snacksList = snackStore.snackDetails?.snacks ?? []

    return (
        <PageContainer style={{ paddingTop: insets.top }}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Custom Header */}
            <HeaderContainer>
                <HeaderButton onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={26} color={Colors.dark.text} />
                </HeaderButton>
                <HeaderTitle>{titleText}</HeaderTitle>
                <View style={{ width: 36 }} />
            </HeaderContainer>

            {loading ? (
                <ScrollView contentContainerStyle={{ padding: 20 }}>
                    {/* Skeleton Loading State */}
                    <CenterProgressWrapper>
                        <SkeletonItem width={160} height={160} borderRadius={80} />
                    </CenterProgressWrapper>

                    <MacrosRow>
                        <MacroCard>
                            <SkeletonItem width="100%" height={50} />
                        </MacroCard>
                        <MacroCard>
                            <SkeletonItem width="100%" height={50} />
                        </MacroCard>
                        <MacroCard>
                            <SkeletonItem width="100%" height={50} />
                        </MacroCard>
                    </MacrosRow>

                    <SectionTitle>{t("Alimentos Consumidos")}</SectionTitle>
                    <SkeletonItem width="100%" height={65} borderRadius={12} style={{ marginBottom: 10 }} />
                    <SkeletonItem width="100%" height={65} borderRadius={12} style={{ marginBottom: 10 }} />
                    <SkeletonItem width="100%" height={65} borderRadius={12} style={{ marginBottom: 20 }} />

                    <SkeletonItem width="100%" height={85} borderRadius={12} style={{ marginBottom: 20 }} />
                    
                    <SectionTitle>{t("Observações")}</SectionTitle>
                    <SkeletonItem width="100%" height={100} borderRadius={12} />
                </ScrollView>
            ) : (
                <ScrollContainer showsVerticalScrollIndicator={false}>
                    {/* Circular Calorie Progress */}
                    <CenterProgressWrapper>
                        <Svg width={size} height={size}>
                            <Circle
                                cx={size / 2}
                                cy={size / 2}
                                r={radius}
                                stroke={Colors.dark.border}
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
                            <CalorieValue>{currentCalories}</CalorieValue>
                            <CalorieLabel>Kcal</CalorieLabel>
                        </CircularProgressInner>
                    </CenterProgressWrapper>

                    {/* Macro Summary Row */}
                    <MacrosRow>
                        <MacroCard>
                            <MacroLabelRow>
                                <MacroDot color={Colors.color.blue} />
                                <MacroLabel>{t("Proteína")}</MacroLabel>
                            </MacroLabelRow>
                            <MacroValueText>{Math.round(protValue)}g</MacroValueText>
                            <MacroProgressLine>
                                <MacroProgressFill color={Colors.color.blue} width={protPercent} />
                            </MacroProgressLine>
                        </MacroCard>

                        <MacroCard>
                            <MacroLabelRow>
                                <MacroDot color={Colors.color.green} />
                                <MacroLabel>{t("Carb.")}</MacroLabel>
                            </MacroLabelRow>
                            <MacroValueText>{Math.round(carbValue)}g</MacroValueText>
                            <MacroProgressLine>
                                <MacroProgressFill color={Colors.color.green} width={carbPercent} />
                            </MacroProgressLine>
                        </MacroCard>

                        <MacroCard>
                            <MacroLabelRow>
                                <MacroDot color={Colors.color.orange} />
                                <MacroLabel>{t("Gordura")}</MacroLabel>
                            </MacroLabelRow>
                            <MacroValueText>{Math.round(fatValue)}g</MacroValueText>
                            <MacroProgressLine>
                                <MacroProgressFill color={Colors.color.orange} width={fatPercent} />
                            </MacroProgressLine>
                        </MacroCard>
                    </MacrosRow>

                    {/* Alimentos Consumidos */}
                    <SectionTitle>{t("Alimentos Consumidos")}</SectionTitle>
                    <FoodListContainer>
                        {snacksList.length > 0 ? (
                            snacksList.map((item, index) => {
                                const energyInfo = item.food.foodNutritionInfo?.find(
                                    (info: any) =>
                                        info.nutritionalComposition?.item?.toLowerCase() === "energia" ||
                                        info.idNutritionalCompositionNavigation?.item?.toLowerCase() === "energia"
                                )
                                const baseCalories = energyInfo?.quantity ?? 0
                                
                                const unitName = item.unitMeasurement?.name
                                let quantityInGrams = item.quantity
                                if (unitName) {
                                    switch (unitName.toLowerCase()) {
                                        case "g":
                                            quantityInGrams = item.quantity
                                            break
                                        case "mg":
                                            quantityInGrams = item.quantity * 0.001
                                            break
                                        case "kg":
                                            quantityInGrams = item.quantity * 1000
                                            break
                                        case "µg":
                                        case "mcg":
                                            quantityInGrams = item.quantity * 1e-6
                                            break
                                        case "ng":
                                            quantityInGrams = item.quantity * 1e-9
                                            break
                                        case "dg":
                                            quantityInGrams = item.quantity * 0.1
                                            break
                                        case "hg":
                                            quantityInGrams = item.quantity * 100
                                            break
                                        case "oz":
                                            quantityInGrams = item.quantity * 28.3495
                                            break
                                        default:
                                            quantityInGrams = item.quantity
                                            break
                                    }
                                }
                                const itemCalories = Math.round((baseCalories * quantityInGrams) / 100)

                                return (
                                    <FoodCard
                                        key={item.id}
                                        onPress={() => {
                                            router.push({
                                                pathname: "/snack/food/[idMeal]/[idTypeSnack]/[idFood]",
                                                params: {
                                                    idMeal: idMeal as string,
                                                    idTypeSnack: idTypeSnack as string,
                                                    idFood: item.food.id.toString(),
                                                    idSnack: item.id.toString(),
                                                    quantitySnack: item.quantity.toString(),
                                                    idUnitMeasurement: item.unitMeasurement.id.toString()
                                                }
                                            })
                                        }}
                                    >
                                        <FoodIconContainer>
                                            <Ionicons name="restaurant-outline" size={20} color={Colors.color.green} />
                                        </FoodIconContainer>
                                        
                                        <FoodTextColumn>
                                            <FoodNameText numberOfLines={1}>{item.food.name}</FoodNameText>
                                            <FoodDescText>{item.quantity} {item.unitMeasurement.name}</FoodDescText>
                                        </FoodTextColumn>

                                        <>
                                            <FoodCalorieContainer>
                                                <FoodCalorieText>{itemCalories}</FoodCalorieText>
                                                <FoodCalorieLabel>kcal</FoodCalorieLabel>
                                            </FoodCalorieContainer>
                                            {(snackStore.snackDetails?.status === StatusMeal.NotAwnsered || snackStore.snackDetails?.status == null) && (
                                                <HeaderButton 
                                                    onPress={(e) => {
                                                        e.stopPropagation() // Prevents card onPress navigation
                                                        deleteSnackFunction(item.id)
                                                    }}
                                                    style={{ marginLeft: 10, padding: 5 }}
                                                >
                                                    <Ionicons name="trash-outline" size={20} color={Colors.color.red} />
                                                </HeaderButton>
                                            )}
                                            <Ionicons name="chevron-forward" size={16} color={Colors.color.grey} style={{ marginLeft: 5 }} />
                                        </>
                                    </FoodCard>
                                )
                            })
                        ) : (
                            <EmptyStateContainer>
                                <Ionicons name="receipt-outline" size={32} color={Colors.color.grey} />
                                <EmptyStateText>
                                    {t("Nenhum alimento cadastrado para esta refeição.")}
                                </EmptyStateText>
                            </EmptyStateContainer>
                        )}
                    </FoodListContainer>

                    {/* Add Food Button */}
                    <AddFoodButton onPress={() => router.navigate(`/snack/food/${idMeal}/${idTypeSnack}/search-food`)}>
                        <Ionicons name="add-circle" size={20} color={Colors.color.green} />
                        <AddFoodText>{t("Adicionar Alimento")}</AddFoodText>
                    </AddFoodButton>

                    {/* Photo Attachment Container */}
                    {uploadingPhoto ? (
                        <PhotoUploadContainer disabled>
                            <ActivityIndicator size="large" color={Colors.color.green} />
                            <PhotoUploadText>{t("Enviando foto...")}</PhotoUploadText>
                        </PhotoUploadContainer>
                    ) : snackStore.snackDetails?.urlImage ? (
                        <MealPhotoWrapper>
                            <TouchableOpacity onPress={handleAddPhoto} activeOpacity={0.8}>
                                <MealPhotoImage source={{ uri: snackStore.snackDetails.urlImage }} />
                            </TouchableOpacity>
                            <RemovePhotoBadge onPress={handleAddPhoto}>
                                <Ionicons name="camera" size={18} color={Colors.color.white} />
                            </RemovePhotoBadge>
                        </MealPhotoWrapper>
                    ) : (
                        <PhotoUploadContainer onPress={handleAddPhoto}>
                            <Ionicons name="camera" size={32} color={Colors.color.green} />
                            <PhotoUploadText>{t("Toque para adicionar uma foto")}</PhotoUploadText>
                        </PhotoUploadContainer>
                    )}

                    {/* Observations */}
                    <ObservationContainer>
                        <SectionTitle>{t("Observações")}</SectionTitle>
                        <ObservationInput
                            multiline
                            placeholder={t("Como você se sentiu após a refeição? Fez alguma substituição?")}
                            placeholderTextColor={Colors.color.grey}
                            value={snackStore.snackDetails?.observation}
                            onChangeText={(text) => snackStore.setObservation(text)}
                        />
                    </ObservationContainer>

                    {/* Save Changes Button */}
                    <ActionButton onPress={handleSave}>
                        <ActionButtonText>{t("Salvar Alterações")}</ActionButtonText>
                    </ActionButton>
                </ScrollContainer>
            )}
        </PageContainer>
    )
}