import React, { useEffect, useRef, useState } from 'react';
import { Animated, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { getSnackDetailsAsync, deleteSnack, sendSnack, updateSnack } from '@/services/snack/snack';
import { uploadMealPicture, deleteMealPicture } from '@/services/user/user';
import { useSnackStore } from '@/store/SnackStore';
import StatusMeal from '@/enums/StatusMeal';
import * as ImagePicker from 'expo-image-picker';
import { Snack } from '@/interfaces/Snack/ISnackDetailsInterface';

export function useSnackDetails() {
    const { idMeal, idTypeSnack } = useLocalSearchParams();
    const snackStore = useSnackStore();
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const colorTheme = useColorScheme();
    const [loading, setLoading] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [localPhotoUri, setLocalPhotoUri] = useState<string | null>(null);
    const [photoRemoved, setPhotoRemoved] = useState(false);

    const [selectedSubstitutions, setSelectedSubstitutions] = useState<Record<number, Snack>>({});
    const [showModalForSnack, setShowModalForSnack] = useState<Snack | null>(null);

    const pulseAnim = useRef(new Animated.Value(0.4)).current;

    useEffect(() => {
        loadData();
    }, []);

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
            ).start();
        } else {
            pulseAnim.setValue(0.4);
        }
    }, [loading]);

    const loadData = async () => {
        setLoading(true);
        try {
            const snacksDetails = await getSnackDetailsAsync(parseInt(idMeal as string), parseInt(idTypeSnack as string));
            snackStore.setSnackDetails(snacksDetails);

            const initialSelection: Record<number, Snack> = {};
            if (snacksDetails.snacks) {
                snacksDetails.snacks.forEach(s => {
                    initialSelection[s.id] = s;
                });
            }
            setSelectedSubstitutions(initialSelection);

            if (snacksDetails.urlImage) {
                setLocalPhotoUri(snacksDetails.urlImage);
            } else {
                setLocalPhotoUri(null);
            }
            setPhotoRemoved(false);
        } catch (error) {
            console.error("Failed to load snack details:", error);
        } finally {
            setLoading(false);
        }
    };

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
                            await deleteSnack(idSnack);
                            snackStore.deleteSnackFromDetails(idSnack);
                            loadData();
                        } catch (error) {
                            console.error(error);
                        }
                    }
                }
            ]
        );
    };

    const displayPhotoUri = photoRemoved ? null : (localPhotoUri || snackStore.snackDetails?.urlImage || null);
    const hasLocalNewPhoto = !photoRemoved && !!localPhotoUri && localPhotoUri !== snackStore.snackDetails?.urlImage;

    const handleSave = async () => {
        setUploadingPhoto(true);
        try {
            const snacks = snackStore.snackDetails?.snacks ?? [];
            for (const snack of snacks) {
                const substitutions = snack.substitutions ?? [];
                if (substitutions.length > 0) {
                    const activeSnack = selectedSubstitutions[snack.id];
                    if (activeSnack && activeSnack.id !== snack.id) {
                        const updatePayload = {
                            id: snack.id,
                            idFood: activeSnack.food.id,
                            idTypeSnack: parseInt(idTypeSnack as string),
                            appointment: snackStore.snackDetails?.appointment ? new Date(snackStore.snackDetails.appointment) : new Date(),
                            quantity: activeSnack.quantity,
                            idMeal: parseInt(idMeal as string),
                            idUnitMeasurement: activeSnack.unitMeasurement.id,
                            idParentSnack: null
                        };
                        await updateSnack(updatePayload, snack.id);
                        await deleteSnack(activeSnack.id);
                    }

                    for (const sub of substitutions) {
                        if (!activeSnack || sub.id !== activeSnack.id) {
                            await deleteSnack(sub.id);
                        }
                    }
                }
            }

            if (photoRemoved) {
                await deleteMealPicture(parseInt(idMeal as string));
                if (snackStore.snackDetails) {
                    snackStore.setSnackDetails({
                        ...snackStore.snackDetails,
                        urlImage: undefined
                    });
                }
                setLocalPhotoUri(null);
            } else if (hasLocalNewPhoto && localPhotoUri) {
                const uploadResult = await uploadMealPicture(parseInt(idMeal as string), localPhotoUri);
                if (uploadResult && uploadResult.url) {
                    setLocalPhotoUri(uploadResult.url);
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
                StatusMeal.Finished,
                snackStore.snackDetails?.observation ?? '',
                parseInt(idMeal as string)
            );
            setPhotoRemoved(false);
            Alert.alert(t("Sucesso"), t("Refeição salva com sucesso!"));
            router.navigate('/');
        } catch (error) {
            console.error(error);
            Alert.alert(t("Erro"), t("Falha ao salvar as alterações."));
        } finally {
            setUploadingPhoto(false);
        }
    };

    const handleAddPhoto = () => {
        const options: any[] = [
            {
                text: t("Tirar Foto"),
                onPress: () => processMealImageSelection(true),
            },
            {
                text: t("Escolher da Galeria"),
                onPress: () => processMealImageSelection(false),
            },
        ];

        if (displayPhotoUri) {
            options.push({
                text: t("Remover Foto"),
                onPress: () => {
                    setLocalPhotoUri(null);
                    setPhotoRemoved(true);
                    if (snackStore.snackDetails) {
                        snackStore.setSnackDetails({
                            ...snackStore.snackDetails,
                            urlImage: undefined
                        });
                    }
                },
            });
        }

        options.push({
            text: t("Cancelar"),
            style: "cancel" as any,
            onPress: () => {}
        });

        Alert.alert(
            t("Selecionar Foto"),
            t("Escolha como deseja obter a foto da refeição:"),
            options
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
                quality: 0.7,
            };

            const result = useCamera
                ? await ImagePicker.launchCameraAsync(pickerOptions)
                : await ImagePicker.launchImageLibraryAsync(pickerOptions);

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const pickedUri = result.assets[0].uri;
                setLocalPhotoUri(pickedUri);
                setPhotoRemoved(false);
            }
        } catch (error) {
            console.error(error);
            Alert.alert(t("Erro"), t("Falha ao obter imagem."));
        }
    };

    const calculateTotals = () => {
        let totalCal = 0;
        let totalProt = 0;
        let totalCarb = 0;
        let totalFat = 0;

        const snacks = snackStore.snackDetails?.snacks ?? [];
        for (const snack of snacks) {
            const activeSnack = selectedSubstitutions[snack.id] || snack;

            const foodInfo = activeSnack.food?.foodNutritionInfo ?? [];
            const energyInfo = foodInfo.find(
                (info: any) =>
                    info.nutritionalComposition?.item?.toLowerCase() === "energia" ||
                    info.idNutritionalCompositionNavigation?.item?.toLowerCase() === "energia"
            );
            const baseCal = energyInfo?.quantity ?? 0;

            const carbInfo = foodInfo.find(
                (info: any) =>
                    info.nutritionalComposition?.item?.toLowerCase() === "carboidrato total" ||
                    info.idNutritionalCompositionNavigation?.item?.toLowerCase() === "carboidrato total"
            );
            const baseCarb = carbInfo?.quantity ?? 0;

            const protInfo = foodInfo.find(
                (info: any) =>
                    info.nutritionalComposition?.item?.toLowerCase() === "proteína" ||
                    info.idNutritionalCompositionNavigation?.item?.toLowerCase() === "proteína"
            );
            const baseProt = protInfo?.quantity ?? 0;

            const fatInfo = foodInfo.find(
                (info: any) =>
                    info.nutritionalComposition?.item?.toLowerCase() === "lipídios" ||
                    info.idNutritionalCompositionNavigation?.item?.toLowerCase() === "lipídios"
            );
            const baseFat = fatInfo?.quantity ?? 0;

            const unitName = activeSnack.unitMeasurement?.name;
            let quantityInGrams = activeSnack.quantity;
            if (unitName) {
                switch (unitName.toLowerCase()) {
                    case "g":
                        quantityInGrams = activeSnack.quantity;
                        break;
                    case "mg":
                        quantityInGrams = activeSnack.quantity * 0.001;
                        break;
                    case "kg":
                        quantityInGrams = activeSnack.quantity * 1000;
                        break;
                    case "mcg":
                    case "µg":
                        quantityInGrams = activeSnack.quantity * 1e-6;
                        break;
                    case "dg":
                        quantityInGrams = activeSnack.quantity * 0.1;
                        break;
                    case "hg":
                        quantityInGrams = activeSnack.quantity * 100;
                        break;
                    case "oz":
                        quantityInGrams = activeSnack.quantity * 28.3495;
                        break;
                    default:
                        quantityInGrams = activeSnack.quantity;
                        break;
                }
            }

            totalCal += (baseCal * quantityInGrams) / 100;
            totalCarb += (baseCarb * quantityInGrams) / 100;
            totalProt += (baseProt * quantityInGrams) / 100;
            totalFat += (baseFat * quantityInGrams) / 100;
        }

        return {
            calories: Math.round(totalCal),
            carbohydrates: Math.round(totalCarb),
            protein: Math.round(totalProt),
            fat: Math.round(totalFat),
        };
    };

    return {
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
    };
}
