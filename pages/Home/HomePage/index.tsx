import React, { useEffect, useState, useCallback } from 'react'
import { 
    PageContainer, 
    HeaderContainer, 
    HeaderSideButton, 
    HeaderTitleColumn, 
    HeaderTitleText, 
    HeaderSubtitleText, 
    CalendarScrollView, 
    DayNode, 
    DayOfWeekText, 
    DayOfMonthText, 
    NutritionalSummaryCard, 
    CardHeader, 
    CardTitle, 
    CaloriesLabel, 
    CaloriesProgressRow, 
    CaloriesValuesContainer, 
    CaloriesValuesText, 
    CaloriesMetaText, 
    PercentageText, 
    ProgressBarContainer, 
    ProgressBarFill, 
    MacrosRow, 
    MacroItemCard, 
    MacroHeader, 
    MacroLabelText, 
    MacroValueContainer, 
    MacroCurrentText, 
    MacroGoalText, 
    MacroProgressUnderline, 
    MacroProgressUnderlineFill, 
    MealsHeaderRow, 
    MealsTitle, 
    MealsCountBadge, 
    MealsCountText, 
    MealsListContainer, 
    MealTrackingCard, 
    MealIconCircle, 
    MealContentColumn, 
    MealTitleText, 
    MealTimeText, 
    MealDescriptionText, 
    MealBadgesRow, 
    MealCaloriesBadge, 
    MealCaloriesText, 
    MealStatusText, 
    CheckboxContainer, 
    CheckboxCircle,
    DropdownContainer,
    DropdownItem,
    DropdownItemText,
    ModalOverlay,
    ModalCard,
    ModalTitle,
    MealPillsContainer,
    MealPill,
    MealPillText,
    CustomInputWrapper,
    ModalTextInput,
    TimePickerRow,
    TimeLabel,
    TimeValue,
    ModalActionsRow,
    ModalActionButton,
    ModalActionButtonText
} from './styles'
import { useTranslation } from 'react-i18next'
import { Colors } from '@/constants/Colors';
import { setupTokenRefresh } from '@/services/login/refreshToken';
import { Alert, ScrollView, View, ActivityIndicator, Modal, TextInput, TouchableWithoutFeedback } from 'react-native';
import useUserStore from '@/store/UserStore';
import { useSnackStore } from '@/store/SnackStore';
import { useColorScheme } from '@/hooks/useColorScheme';
import { formatDate } from '@/utils/functionsApp';
import { getSnackAsync, sendSnack, resetSnacksAsync, createMealAsync } from '@/services/snack/snack';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import StatusMeal from '@/enums/StatusMeal';
import LoadingPageComponent from '@/components/application/Lists/LoadingPageComponent';
import { ThemedText } from '@/components/ThemedText';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useNutritionistStore } from '@/store/NutritionistStore';
import { getNutritionistList } from '@/services/user/user';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomePage() {
    const { t } = useTranslation();
    const { user } = useUserStore();
    const snackStore = useSnackStore();
    const colorScheme = useColorScheme();
    const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const insets = useSafeAreaInsets();

    const { nutritionistSelected, setNutritionistSelected } = useNutritionistStore();

    // Dropdown & Manual Meal States
    const [showDropdown, setShowDropdown] = useState(false);
    const [showCreateMealModal, setShowCreateMealModal] = useState(false);
    const [mealName, setMealName] = useState('Café da Manhã');
    const [isCustomMeal, setIsCustomMeal] = useState(false);
    const [customMealName, setCustomMealName] = useState('');
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedTime, setSelectedTime] = useState(new Date());

    useEffect(() => {
        setupTokenRefresh();
    }, []);

    // 1. Sync nutritionist store with current active nutritionist on startup
    useEffect(() => {
        const fetchAndSyncNutritionist = async () => {
            try {
                const response = await getNutritionistList();
                if (response.status === 200 && Array.isArray(response.data)) {
                    const current = response.data.find((item: any) => item.link.isCurrentNutritionist);
                    if (current) {
                        setNutritionistSelected(current);
                    }
                }
            } catch (error) {
                console.log("Failed to sync active nutritionist", error);
            }
        };
        fetchAndSyncNutritionist();
    }, []);

    // 2. Fetch daily summary when date or active nutritionist changes, and when screen is focused
    useFocusEffect(
        useCallback(() => {
            loadDailySummary();
        }, [snackStore.date, nutritionistSelected?.link?.idNutritionist])
    );

    const loadDailySummary = async () => {
        snackStore.setLoading(true);
        try {
            const data = await getSnackAsync(snackStore.date);
            snackStore.setData(data);
        } catch (error) {
            console.log("Failed to load daily snacks", error);
        } finally {
            snackStore.setLoading(false);
        }
    };

    const handleResetMeals = async () => {
        snackStore.setLoading(true);
        try {
            const data = await resetSnacksAsync(snackStore.date);
            snackStore.setData(data);
            Alert.alert(t('Sucesso'), t('Refeições geradas/reiniciadas com sucesso.'));
        } catch (error) {
            Alert.alert(t('Erro'), t('Falha ao reiniciar as refeições do dia.'));
        } finally {
            snackStore.setLoading(false);
        }
    };

    const handleCreateMeal = async () => {
        const finalName = isCustomMeal ? customMealName.trim() : mealName;
        if (!finalName) {
            Alert.alert(t('Erro'), t('Por favor, informe o nome da refeição.'));
            return;
        }

        setShowCreateMealModal(false);
        snackStore.setLoading(true);

        try {
            const hours = selectedTime.getHours().toString().padStart(2, '0');
            const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
            const timeString = `${hours}:${minutes}`;

            await createMealAsync({
                typeSnack: {
                    name: finalName,
                    timeSnack: timeString,
                },
                appointment: snackStore.date,
                idUser: user?.id || 0,
                status: StatusMeal.NotAwnsered,
                observation: '',
                snacks: [],
            });

            await loadDailySummary();
            setCustomMealName('');
            setIsCustomMeal(false);
            setMealName('Café da Manhã');
            Alert.alert(t('Sucesso'), t('Refeição adicionada com sucesso.'));
        } catch (error: any) {
            console.error('Erro ao criar refeição:', error);
            if (error?.response?.data) {
                console.error('Detalhes do erro do servidor:', JSON.stringify(error.response.data, null, 2));
            }
            const details = error?.response?.data
                ? typeof error.response.data === 'string'
                    ? error.response.data
                    : JSON.stringify(error.response.data)
                : error?.message || String(error);
            Alert.alert(t('Erro'), `${t('Falha ao criar refeição.')}\n\nDetalhes: ${details}`);
        } finally {
            snackStore.setLoading(false);
        }
    };

    const handleToggleMealStatus = async (meal: any) => {
        const newStatus = meal.status === StatusMeal.Finished 
            ? StatusMeal.NotAwnsered 
            : StatusMeal.Finished;

        setActionLoadingId(meal.id);
        try {
            await sendSnack(newStatus, '', meal.id);
            await loadDailySummary();
        } catch (error) {
            Alert.alert(t('Erro'), t('Falha ao atualizar o status da refeição'));
        } finally {
            setActionLoadingId(null);
        }
    };

    // Calculate Week Days (Monday to Saturday)
    const getWeekDays = () => {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 = Sun, 1 = Mon...
        const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        const monday = new Date(today);
        monday.setDate(today.getDate() + mondayOffset);

        const days = [];
        for (let i = 0; i < 6; i++) {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);
            days.push(date);
        }
        return days;
    };

    const getDayName = (date: Date) => {
        const days = [t('DOM'), t('SEG'), t('TER'), t('QUA'), t('QUI'), t('SEX'), t('SAB')];
        return days[date.getDay()];
    };

    const getHeaderDateTitle = (date: Date) => {
        const today = new Date();
        if (formatDate(date) === formatDate(today)) {
            return t('Hoje');
        }
        const weekdays = [
            t('Domingo'),
            t('Segunda-feira'),
            t('Terça-feira'),
            t('Quarta-feira'),
            t('Quinta-feira'),
            t('Sexta-feira'),
            t('Sábado')
        ];
        return weekdays[date.getDay()];
    };

    const getHeaderDateSubtitle = (date: Date) => {
        const months = [
            t('Janeiro'),
            t('Fevereiro'),
            t('Março'),
            t('Abril'),
            t('Maio'),
            t('Junho'),
            t('Julho'),
            t('Agosto'),
            t('Setembro'),
            t('Outubro'),
            t('Novembro'),
            t('Dezembro')
        ];
        return `${date.getDate()} ${months[date.getMonth()]}`;
    };

    const getCategoryStyles = (name: string) => {
        const normalized = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
        
        if (normalized.includes("cafe da manha") || normalized.includes("breakfast")) {
            return {
                icon: "cafe-outline" as const,
                color: "#3B82F6",
                bgColor: "#3B82F61A"
            };
        } else if (normalized.includes("almoco") || normalized.includes("lunch")) {
            return {
                icon: "sunny-outline" as const,
                color: "#FFA70B",
                bgColor: "#FFA70B1A"
            };
        } else if (normalized.includes("lanche") || normalized.includes("snack") || normalized.includes("cafe da tarde")) {
            return {
                icon: "fast-food-outline" as const,
                color: "#D97706",
                bgColor: "#D977061A"
            };
        } else if (normalized.includes("jantar") || normalized.includes("dinner")) {
            return {
                icon: "moon-outline" as const,
                color: "#8B5CF6",
                bgColor: "#8B5CF61A"
            };
        }
        
        return {
            icon: "restaurant-outline" as const,
            color: "#00B38C",
            bgColor: "#00B38C1A"
        };
    };

    const weekDays = getWeekDays();

    // Summary calculations
    const calories = snackStore.data?.calories || 0;
    const totalCalories = snackStore.data?.totalCalories || 2000;
    const caloriesPercent = totalCalories > 0 ? (calories / totalCalories) * 100 : 0;

    // Standard macros targets (Protein, Carbs, Fats)
    const proteinGoal = 150;
    const protein = snackStore.data?.protein || 0;
    const proteinPercent = (protein / proteinGoal) * 100;

    const carbsGoal = 250;
    const carbs = snackStore.data?.carbohydrates || 0;
    const carbsPercent = (carbs / carbsGoal) * 100;

    const fatGoal = 70;
    const fat = snackStore.data?.fat || 0;
    const fatPercent = (fat / fatGoal) * 100;

    // Meals counting
    const meals = snackStore.data?.meals || [];
    const completedCount = meals.filter(m => m.status === StatusMeal.Finished).length;
    const totalCount = meals.length;

    return (
        <PageContainer style={{ paddingTop: insets.top || 16 }}>
            {snackStore.loading ? (
                <LoadingPageComponent />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    
                    {/* Header */}
                    <HeaderContainer>
                        <HeaderSideButton 
                            theme={colorScheme} 
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Ionicons name="calendar-outline" size={20} color={colorScheme === 'light' ? Colors.light.text : Colors.dark.text} />
                        </HeaderSideButton>
                        
                        <HeaderTitleColumn>
                            <HeaderTitleText>{getHeaderDateTitle(snackStore.date)}</HeaderTitleText>
                            <HeaderSubtitleText>{getHeaderDateSubtitle(snackStore.date)}</HeaderSubtitleText>
                        </HeaderTitleColumn>
                        
                        <HeaderSideButton theme={colorScheme} onPress={() => setShowDropdown(!showDropdown)}>
                            <Ionicons name="ellipsis-horizontal" size={20} color={colorScheme === 'light' ? Colors.light.text : Colors.dark.text} />
                        </HeaderSideButton>
                    </HeaderContainer>

                    {showDropdown && (
                        <>
                            <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
                                <View style={{
                                    position: 'absolute',
                                    top: 0,
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    zIndex: 999,
                                }} />
                            </TouchableWithoutFeedback>
                            <DropdownContainer theme={colorScheme} topInset={insets.top}>
                                <DropdownItem onPress={() => {
                                    setShowDropdown(false);
                                    setShowCreateMealModal(true);
                                }}>
                                    <Ionicons name="add-circle-outline" size={20} color={Colors.color.blue} />
                                    <DropdownItemText theme={colorScheme}>{t('Adicionar refeição')}</DropdownItemText>
                                </DropdownItem>
                                <DropdownItem onPress={() => {
                                    setShowDropdown(false);
                                    const hasMeals = (snackStore.data?.meals || []).length > 0;
                                    if (hasMeals) {
                                        Alert.alert(
                                            t('Confirmação'),
                                            t('Tem certeza que deseja reiniciar as refeições de hoje? Isso apagará todas as refeições atuais e registrará as refeições padrão/do nutricionista novamente.'),
                                            [
                                                { text: t('Cancelar'), style: 'cancel' as const },
                                                { text: t('Confirmar'), onPress: handleResetMeals }
                                            ]
                                        );
                                    } else {
                                        handleResetMeals();
                                    }
                                }}>
                                    <Ionicons name="refresh-outline" size={20} color={Colors.color.green} />
                                    <DropdownItemText theme={colorScheme}>
                                        {(snackStore.data?.meals || []).length > 0 ? t('Resetar refeições do dia') : t('Criar refeições do dia')}
                                    </DropdownItemText>
                                </DropdownItem>
                            </DropdownContainer>
                        </>
                    )}

                    {showDatePicker && (
                        <RNDateTimePicker
                            mode="date"
                            value={snackStore.date}
                            themeVariant={colorScheme === 'light' ? 'light' : 'dark'}
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false);
                                if (event.type === 'set' && selectedDate) {
                                    snackStore.setDate(selectedDate);
                                }
                            }}
                        />
                    )}

                    {/* Weekly Calendar */}
                    <View>
                        <CalendarScrollView testID="home-calendar-scroll" horizontal showsHorizontalScrollIndicator={false}>
                            {weekDays.map((dayDate, idx) => {
                                const isSelected = formatDate(dayDate) === formatDate(snackStore.date);
                                return (
                                    <DayNode 
                                        key={idx} 
                                        active={isSelected} 
                                        theme={colorScheme} 
                                        onPress={() => snackStore.setDate(dayDate)}
                                    >
                                        <DayOfWeekText active={isSelected}>{getDayName(dayDate)}</DayOfWeekText>
                                        <DayOfMonthText active={isSelected}>{dayDate.getDate()}</DayOfMonthText>
                                    </DayNode>
                                );
                            })}
                        </CalendarScrollView>
                    </View>

                    {/* Resumo Diário Card */}
                    <NutritionalSummaryCard testID="home-daily-summary-card" theme={colorScheme}>
                        <CardHeader>
                            <CardTitle>{t('Resumo Diário')}</CardTitle>
                        </CardHeader>
                        
                        <CaloriesLabel>{t('Calorias Consumidas')}</CaloriesLabel>
                        <CaloriesProgressRow>
                            <CaloriesValuesContainer>
                                <CaloriesValuesText>{calories.toLocaleString()}</CaloriesValuesText>
                                <CaloriesMetaText>/ {totalCalories.toLocaleString()} kcal</CaloriesMetaText>
                            </CaloriesValuesContainer>
                            <PercentageText>{caloriesPercent.toFixed(0)}%</PercentageText>
                        </CaloriesProgressRow>

                        <ProgressBarContainer theme={colorScheme}>
                            <ProgressBarFill percent={caloriesPercent} />
                        </ProgressBarContainer>

                        {/* Macros Underline Columns */}
                        <MacrosRow>
                            {/* Protein */}
                            <MacroItemCard theme={colorScheme}>
                                <MacroHeader>
                                    <Ionicons name="shield-outline" size={12} color="#3B82F6" />
                                    <MacroLabelText color="#3B82F6">{t('PROT')}</MacroLabelText>
                                </MacroHeader>
                                <MacroValueContainer>
                                    <MacroCurrentText>{protein.toFixed(0)}</MacroCurrentText>
                                    <MacroGoalText>/{proteinGoal}g</MacroGoalText>
                                </MacroValueContainer>
                                <MacroProgressUnderline theme={colorScheme}>
                                    <MacroProgressUnderlineFill percent={proteinPercent} color="#3B82F6" />
                                </MacroProgressUnderline>
                            </MacroItemCard>

                            {/* Carbs */}
                            <MacroItemCard theme={colorScheme}>
                                <MacroHeader>
                                    <Ionicons name="bar-chart-outline" size={12} color="#FFA70B" />
                                    <MacroLabelText color="#FFA70B">{t('CARB')}</MacroLabelText>
                                </MacroHeader>
                                <MacroValueContainer>
                                    <MacroCurrentText>{carbs.toFixed(0)}</MacroCurrentText>
                                    <MacroGoalText>/{carbsGoal}g</MacroGoalText>
                                </MacroValueContainer>
                                <MacroProgressUnderline theme={colorScheme}>
                                    <MacroProgressUnderlineFill percent={carbsPercent} color="#FFA70B" />
                                </MacroProgressUnderline>
                            </MacroItemCard>

                            {/* Fats */}
                            <MacroItemCard theme={colorScheme}>
                                <MacroHeader>
                                    <Ionicons name="flame-outline" size={12} color="#8B5CF6" />
                                    <MacroLabelText color="#8B5CF6">{t('GOR')}</MacroLabelText>
                                </MacroHeader>
                                <MacroValueContainer>
                                    <MacroCurrentText>{fat.toFixed(0)}</MacroCurrentText>
                                    <MacroGoalText>/{fatGoal}g</MacroGoalText>
                                </MacroValueContainer>
                                <MacroProgressUnderline theme={colorScheme}>
                                    <MacroProgressUnderlineFill percent={fatPercent} color="#8B5CF6" />
                                </MacroProgressUnderline>
                            </MacroItemCard>
                        </MacrosRow>
                    </NutritionalSummaryCard>

                    {/* Meals Header Row */}
                    <MealsHeaderRow testID="home-meals-header">
                        <MealsTitle>{t('Refeições')}</MealsTitle>
                        <MealsCountBadge>
                            <MealsCountText>{completedCount} {t('de')} {totalCount} {t('Feitas')}</MealsCountText>
                        </MealsCountBadge>
                    </MealsHeaderRow>

                    {/* Meals List */}
                    <MealsListContainer>
                        {meals.length > 0 ? (
                            meals.map((meal) => {
                                const isCompleted = meal.status === StatusMeal.Finished;
                                const isPending = meal.status !== StatusMeal.Finished;
                                const timeStr = meal.typeSnack.timeSnack ? meal.typeSnack.timeSnack.substring(0, 5) : '00:00';
                                
                                const catStyles = getCategoryStyles(meal.typeSnack.name);
                                
                                // Generate list of food names inside the meal
                                const foodNames = meal.snacks?.map(s => s.food.name).join(' & ') || t('Refeição sem alimentos');
                                const foodDetails = meal.snacks?.map(s => `${s.quantity}${s.unitMeasurement.name} ${s.food.name}`).join(', ') || '';

                                return (
                                    <MealTrackingCard 
                                        key={meal.id}
                                        active={isPending}
                                        theme={colorScheme}
                                        onPress={() => router.navigate(`/snack/${meal.id}/${meal.typeSnack.id}`)}
                                    >
                                        <MealIconCircle bgColor={catStyles.bgColor}>
                                            <Ionicons name={catStyles.icon} size={22} color={catStyles.color} />
                                        </MealIconCircle>

                                        <MealContentColumn>
                                            <MealTitleText>{meal.typeSnack.name}</MealTitleText>
                                            <MealTimeText>{timeStr}</MealTimeText>
                                            
                                            {foodDetails !== '' ? (
                                                <MealDescriptionText>{foodDetails}</MealDescriptionText>
                                            ) : (
                                                <MealDescriptionText>{foodNames}</MealDescriptionText>
                                            )}

                                            <MealBadgesRow>
                                                <MealCaloriesBadge theme={colorScheme}>
                                                    <MealCaloriesText>{meal.totalCalories} kcal</MealCaloriesText>
                                                </MealCaloriesBadge>
                                                <MealStatusText completed={isCompleted}>
                                                    {isCompleted ? t('Concluido') : t('Pendente')}
                                                </MealStatusText>
                                            </MealBadgesRow>
                                        </MealContentColumn>

                                        <CheckboxContainer onPress={() => handleToggleMealStatus(meal)}>
                                            {actionLoadingId === meal.id ? (
                                                <ActivityIndicator size="small" color="#00B38C" />
                                            ) : (
                                                <CheckboxCircle checked={isCompleted} theme={colorScheme}>
                                                    {isCompleted && (
                                                        <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                                                    )}
                                                </CheckboxCircle>
                                            )}
                                        </CheckboxContainer>
                                    </MealTrackingCard>
                                );
                            })
                        ) : (
                            <View style={{ padding: 20, alignItems: 'center' }}>
                                <ThemedText>{t('Nenhuma refeição cadastrada para este dia')}</ThemedText>
                            </View>
                        )}
                    </MealsListContainer>

                </ScrollView>
            )}
            <Modal
                visible={showCreateMealModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => {
                    setShowCreateMealModal(false);
                    setIsCustomMeal(false);
                    setMealName('Café da Manhã');
                }}
            >
                <TouchableWithoutFeedback onPress={() => {
                    setShowCreateMealModal(false);
                    setIsCustomMeal(false);
                    setMealName('Café da Manhã');
                }}>
                    <ModalOverlay>
                        <TouchableWithoutFeedback>
                            <ModalCard theme={colorScheme}>
                                <ModalTitle theme={colorScheme}>{t('Adicionar Refeição')}</ModalTitle>
                                
                                <MealPillsContainer>
                                    {['Café da Manhã', 'Almoço', 'Lanche da Tarde', 'Jantar'].map((name) => (
                                        <MealPill 
                                            key={name}
                                            active={mealName === name && !isCustomMeal}
                                            onPress={() => {
                                                setMealName(name);
                                                setIsCustomMeal(false);
                                            }}
                                        >
                                            <MealPillText active={mealName === name && !isCustomMeal} theme={colorScheme}>
                                                {t(name)}
                                            </MealPillText>
                                        </MealPill>
                                    ))}
                                    <MealPill 
                                        active={isCustomMeal}
                                        onPress={() => setIsCustomMeal(true)}
                                    >
                                        <MealPillText active={isCustomMeal} theme={colorScheme}>
                                            {t('Outro')}
                                        </MealPillText>
                                    </MealPill>
                                </MealPillsContainer>

                                {isCustomMeal && (
                                    <CustomInputWrapper>
                                        <ModalTextInput
                                            theme={colorScheme}
                                            placeholder={t('Nome da Refeição')}
                                            placeholderTextColor={Colors.color.grey}
                                            value={customMealName}
                                            onChangeText={setCustomMealName}
                                            maxLength={30}
                                        />
                                    </CustomInputWrapper>
                                )}

                                <TimePickerRow theme={colorScheme} onPress={() => setShowTimePicker(true)}>
                                    <TimeLabel>{t('Horário')}</TimeLabel>
                                    <TimeValue theme={colorScheme}>
                                        {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </TimeValue>
                                </TimePickerRow>

                                {showTimePicker && (
                                    <RNDateTimePicker
                                        mode="time"
                                        value={selectedTime}
                                        display="spinner"
                                        themeVariant={colorScheme === 'light' ? 'light' : 'dark'}
                                        onChange={(event, date) => {
                                            setShowTimePicker(false);
                                            if (date) {
                                                setSelectedTime(date);
                                            }
                                        }}
                                    />
                                )}

                                <ModalActionsRow>
                                    <ModalActionButton 
                                        isCancel={true} 
                                        onPress={() => {
                                            setShowCreateMealModal(false);
                                            setIsCustomMeal(false);
                                            setMealName('Café da Manhã');
                                        }}
                                    >
                                        <ModalActionButtonText isCancel={true}>
                                            {t('Cancelar')}
                                        </ModalActionButtonText>
                                    </ModalActionButton>
                                    <ModalActionButton onPress={handleCreateMeal}>
                                        <ModalActionButtonText>
                                            {t('Adicionar')}
                                        </ModalActionButtonText>
                                    </ModalActionButton>
                                </ModalActionsRow>
                            </ModalCard>
                        </TouchableWithoutFeedback>
                    </ModalOverlay>
                </TouchableWithoutFeedback>
            </Modal>
        </PageContainer>
    );
}