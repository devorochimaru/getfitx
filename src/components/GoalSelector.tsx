import { Flame, Dumbbell, TrendingUp, Heart, Activity, Shield } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
}

const goals: Goal[] = [
  {
    id: 'fat-loss',
    title: 'Fat Loss',
    description: 'Burn fat, maintain muscle, caloric deficit focus',
    icon: Flame,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    id: 'muscle-gain',
    title: 'Muscle Gain',
    description: 'Build strength, increase mass, caloric surplus',
    icon: Dumbbell,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'recomposition',
    title: 'Recomposition',
    description: 'Lose fat & gain muscle simultaneously',
    icon: TrendingUp,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    id: 'endurance',
    title: 'Endurance',
    description: 'Boost stamina, cardio health, athletic performance',
    icon: Heart,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
  },
  {
    id: 'general-fitness',
    title: 'General Fitness',
    description: 'Overall health, balanced routine, maintenance',
    icon: Activity,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    id: 'medical-recovery',
    title: 'Medical Recovery',
    description: 'Gentle rehabilitation, safe progression',
    icon: Shield,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
];

interface GoalSelectorProps {
  selectedGoal: string | null;
  onSelectGoal: (goalId: string) => void;
  onContinue: () => void;
}

export function GoalSelector({ selectedGoal, onSelectGoal, onContinue }: GoalSelectorProps) {
  return (
    <div className="w-full max-w-6xl mx-auto animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-slate-900 mb-3">Choose Your Primary Goal</h2>
        <p className="text-slate-600">
          Select the goal that aligns with your health and fitness aspirations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {goals.map((goal) => {
          const Icon = goal.icon;
          return (
            <button
              key={goal.id}
              onClick={() => onSelectGoal(goal.id)}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left group hover:shadow-lg ${
                selectedGoal === goal.id
                  ? `border-blue-500 ${goal.bgColor} shadow-lg scale-105`
                  : 'border-slate-200 bg-white hover:border-blue-300'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-xl ${goal.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <Icon className={goal.color} size={28} />
              </div>
              <h4 className="text-slate-900 mb-2">{goal.title}</h4>
              <p className="text-sm text-slate-600">{goal.description}</p>

              {/* Selection indicator */}
              <div className="mt-4 flex items-center justify-end">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedGoal === goal.id
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {selectedGoal === goal.id && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onContinue}
          disabled={!selectedGoal}
          className={`px-8 py-4 rounded-xl transition-all ${
            selectedGoal
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-xl text-white scale-100 hover:scale-105'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          Continue to Results
        </button>
      </div>
    </div>
  );
}
