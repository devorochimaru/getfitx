import { Coffee, Sun, Cookie, Moon, RefreshCw } from 'lucide-react';

interface Meal {
  name: string;
  time: string;
  icon: any;
  foods: { item: string; portion: string; calories: number }[];
  macros: { protein: number; carbs: number; fats: number };
}

interface DietPlanProps {
  dietaryPreference: string;
  goal: string;
  bmr: number;
}

export function DietPlan({ dietaryPreference, goal, bmr }: DietPlanProps) {
  const getTargetCalories = () => {
    if (goal === 'fat-loss') return Math.round(bmr * 1.2 * 0.8);
    if (goal === 'muscle-gain') return Math.round(bmr * 1.55 * 1.15);
    if (goal === 'recomposition') return Math.round(bmr * 1.55);
    if (goal === 'endurance') return Math.round(bmr * 1.7);
    return Math.round(bmr * 1.55);
  };

  const targetCalories = getTargetCalories();

  const getMeals = (): Meal[] => {
    const isVeg = dietaryPreference === 'vegetarian';

    return [
      {
        name: 'Breakfast',
        time: '7:00 - 8:00 AM',
        icon: Coffee,
        foods: isVeg
          ? [
              { item: 'Oatmeal with berries', portion: '1 bowl', calories: 220 },
              { item: 'Greek yogurt', portion: '150g', calories: 100 },
              { item: 'Almonds', portion: '10 pieces', calories: 70 },
              { item: 'Green tea', portion: '1 cup', calories: 0 },
            ]
          : [
              { item: 'Scrambled eggs', portion: '3 eggs', calories: 210 },
              { item: 'Whole wheat toast', portion: '2 slices', calories: 160 },
              { item: 'Avocado', portion: '1/2', calories: 120 },
              { item: 'Black coffee', portion: '1 cup', calories: 5 },
            ],
        macros: { protein: 25, carbs: 45, fats: 15 },
      },
      {
        name: 'Lunch',
        time: '12:30 - 1:30 PM',
        icon: Sun,
        foods: isVeg
          ? [
              { item: 'Quinoa bowl', portion: '1 cup', calories: 220 },
              { item: 'Mixed vegetables', portion: '200g', calories: 80 },
              { item: 'Paneer tikka', portion: '100g', calories: 265 },
              { item: 'Lentil dal', portion: '1 bowl', calories: 180 },
            ]
          : [
              { item: 'Grilled chicken breast', portion: '150g', calories: 245 },
              { item: 'Brown rice', portion: '1 cup', calories: 215 },
              { item: 'Steamed broccoli', portion: '150g', calories: 55 },
              { item: 'Mixed salad', portion: '1 bowl', calories: 30 },
            ],
        macros: { protein: 40, carbs: 55, fats: 18 },
      },
      {
        name: 'Snacks',
        time: '4:00 - 5:00 PM',
        icon: Cookie,
        foods: isVeg
          ? [
              { item: 'Protein smoothie', portion: '300ml', calories: 180 },
              { item: 'Apple', portion: '1 medium', calories: 95 },
              { item: 'Peanut butter', portion: '1 tbsp', calories: 95 },
            ]
          : [
              { item: 'Boiled eggs', portion: '2', calories: 140 },
              { item: 'Banana', portion: '1 medium', calories: 105 },
              { item: 'Protein bar', portion: '1', calories: 200 },
            ],
        macros: { protein: 20, carbs: 35, fats: 12 },
      },
      {
        name: 'Dinner',
        time: '7:30 - 8:30 PM',
        icon: Moon,
        foods: isVeg
          ? [
              { item: 'Tofu stir-fry', portion: '200g', calories: 220 },
              { item: 'Multigrain roti', portion: '2 pieces', calories: 160 },
              { item: 'Mixed vegetable curry', portion: '1 bowl', calories: 140 },
              { item: 'Cucumber salad', portion: '100g', calories: 16 },
            ]
          : [
              { item: 'Baked salmon', portion: '150g', calories: 280 },
              { item: 'Sweet potato', portion: '1 medium', calories: 115 },
              { item: 'Asparagus', portion: '150g', calories: 30 },
              { item: 'Garden salad', portion: '1 bowl', calories: 40 },
            ],
        macros: { protein: 35, carbs: 40, fats: 20 },
      },
    ];
  };

  const meals = getMeals();
  const totalCalories = meals.reduce(
    (sum, meal) => sum + meal.foods.reduce((mealSum, food) => mealSum + food.calories, 0),
    0
  );
  const totalProtein = meals.reduce((sum, meal) => sum + meal.macros.protein, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.macros.carbs, 0);
  const totalFats = meals.reduce((sum, meal) => sum + meal.macros.fats, 0);

  return (
    <div className="space-y-6">
      {/* Daily Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="text-slate-900 mb-4">Daily Nutrition Target</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-2xl text-slate-900">{totalCalories}</div>
            <div className="text-sm text-slate-600">Total Calories</div>
            <div className="text-xs text-slate-500 mt-1">Target: {targetCalories}</div>
          </div>
          <div>
            <div className="text-2xl text-blue-600">{totalProtein}g</div>
            <div className="text-sm text-slate-600">Protein</div>
            <div className="w-full h-2 bg-white rounded-full mt-2">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${Math.min((totalProtein / 150) * 100, 100)}%` }}
              />
            </div>
          </div>
          <div>
            <div className="text-2xl text-green-600">{totalCarbs}g</div>
            <div className="text-sm text-slate-600">Carbs</div>
            <div className="w-full h-2 bg-white rounded-full mt-2">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${Math.min((totalCarbs / 250) * 100, 100)}%` }}
              />
            </div>
          </div>
          <div>
            <div className="text-2xl text-amber-600">{totalFats}g</div>
            <div className="text-sm text-slate-600">Fats</div>
            <div className="w-full h-2 bg-white rounded-full mt-2">
              <div
                className="h-full bg-amber-500 rounded-full"
                style={{ width: `${Math.min((totalFats / 80) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Meal Timeline */}
      <div className="space-y-4">
        {meals.map((meal, index) => {
          const Icon = meal.icon;
          const mealCalories = meal.foods.reduce((sum, food) => sum + food.calories, 0);

          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <Icon className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h4 className="text-slate-900">{meal.name}</h4>
                    <p className="text-sm text-slate-500">{meal.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl text-slate-900">{mealCalories}</div>
                  <div className="text-xs text-slate-500">calories</div>
                </div>
              </div>

              {/* Foods List */}
              <div className="space-y-2 mb-4">
                {meal.foods.map((food, foodIndex) => (
                  <div
                    key={foodIndex}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <div>
                        <div className="text-sm text-slate-900">{food.item}</div>
                        <div className="text-xs text-slate-500">{food.portion}</div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-600">{food.calories} cal</div>
                  </div>
                ))}
              </div>

              {/* Macros */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-xs text-slate-600">P: {meal.macros.protein}g</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-slate-600">C: {meal.macros.carbs}g</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="text-xs text-slate-600">F: {meal.macros.fats}g</span>
                </div>
                <button className="ml-auto text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1 transition-colors">
                  <RefreshCw size={14} />
                  Swap
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hydration Reminder */}
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
        <h4 className="text-slate-900 mb-2">Hydration Goal</h4>
        <p className="text-sm text-slate-600">
          Aim for <strong>2.5-3 liters</strong> of water throughout the day. Proper hydration supports
          metabolism, energy levels, and recovery.
        </p>
      </div>
    </div>
  );
}
