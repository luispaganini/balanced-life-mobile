import React, { useEffect, useState } from 'react'
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
    CheckboxCircle 
} from './styles'
import { useTranslation } from 'react-i18next'
import { Colors } from '@/constants/Colors';
import { setupTokenRefresh } from '@/services/login/refreshToken';
import { Alert, ScrollView, View, ActivityIndicator } from 'react-native';
import useUserStore from '@/store/UserStore';
import { useSnackStore } from '@/store/SnackStore';
import { useColorScheme } from '@/hooks/useColorScheme';
import { formatDate } from '@/utils/functionsApp';
import { getSnackAsync, sendSnack } from '@/services/snack/snack';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import StatusMeal from '@/enums/StatusMeal';
import LoadingPageComponent from '@/components/application/Lists/LoadingPageComponent';
import { ThemedText } from '@/components/ThemedText';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export default function HomePage() {
    const { t } = useTranslation();
    const { user } = useUserStore();
    const snackStore = useSnackStore();
    const colorScheme = useColorScheme();
    const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        setupTokenRefresh();
    }, []);

    useEffect(() => {
        loadDailySummary();
    }, [snackStore.date]);

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
        <PageContainer>
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
                        
                        <HeaderSideButton theme={colorScheme}>
                            <Ionicons name="ellipsis-horizontal" size={20} color={colorScheme === 'light' ? Colors.light.text : Colors.dark.text} />
                        </HeaderSideButton>
                    </HeaderContainer>

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
                        <CalendarScrollView horizontal showsHorizontalScrollIndicator={false}>
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
                    <NutritionalSummaryCard theme={colorScheme}>
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
                    <MealsHeaderRow>
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
        </PageContainer>
    );
}