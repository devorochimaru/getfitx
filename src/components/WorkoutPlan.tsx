import { Dumbbell, Heart, Zap, Moon } from 'lucide-react';

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  muscleGroup: string;
}

interface WorkoutDay {
  day: string;
  focus: string;
  intensity: 'low' | 'medium' | 'high';
  duration: string;
  exercises: Exercise[];
  isRest?: boolean;
}

interface WorkoutPlanProps {
  goal: string;
  activityLevel: string;
}

export function WorkoutPlan({ goal, activityLevel }: WorkoutPlanProps) {
  const getWorkoutPlan = (): WorkoutDay[] => {
    if (goal === 'fat-loss') {
      return [
        {
          day: 'Monday',
          focus: 'Full Body Circuit',
          intensity: 'high',
          duration: '45 min',
          exercises: [
            { name: 'Burpees', sets: '3', reps: '12', rest: '30s', muscleGroup: 'Full Body' },
            { name: 'Jump Squats', sets: '3', reps: '15', rest: '30s', muscleGroup: 'Legs' },
            { name: 'Mountain Climbers', sets: '3', reps: '20', rest: '30s', muscleGroup: 'Core' },
            { name: 'Jumping Jacks', sets: '3', reps: '30', rest: '30s', muscleGroup: 'Cardio' },
          ],
        },
        {
          day: 'Tuesday',
          focus: 'Cardio + Core',
          intensity: 'medium',
          duration: '40 min',
          exercises: [
            { name: 'Running', sets: '1', reps: '25 min', rest: '-', muscleGroup: 'Cardio' },
            { name: 'Plank', sets: '3', reps: '60s', rest: '30s', muscleGroup: 'Core' },
            { name: 'Bicycle Crunches', sets: '3', reps: '20', rest: '30s', muscleGroup: 'Abs' },
            { name: 'Leg Raises', sets: '3', reps: '15', rest: '30s', muscleGroup: 'Lower Abs' },
          ],
        },
        {
          day: 'Wednesday',
          focus: 'Rest & Recovery',
          intensity: 'low',
          duration: '-',
          exercises: [],
          isRest: true,
        },
        {
          day: 'Thursday',
          focus: 'HIIT Training',
          intensity: 'high',
          duration: '35 min',
          exercises: [
            { name: 'Sprint Intervals', sets: '6', reps: '30s', rest: '60s', muscleGroup: 'Cardio' },
            { name: 'Box Jumps', sets: '3', reps: '12', rest: '45s', muscleGroup: 'Legs' },
            { name: 'Push-ups', sets: '3', reps: '15', rest: '30s', muscleGroup: 'Chest' },
            { name: 'Kettlebell Swings', sets: '3', reps: '20', rest: '45s', muscleGroup: 'Full Body' },
          ],
        },
        {
          day: 'Friday',
          focus: 'Upper Body + Cardio',
          intensity: 'medium',
          duration: '45 min',
          exercises: [
            { name: 'Rowing Machine', sets: '1', reps: '15 min', rest: '-', muscleGroup: 'Back' },
            { name: 'Dumbbell Press', sets: '3', reps: '12', rest: '45s', muscleGroup: 'Chest' },
            { name: 'Lat Pulldown', sets: '3', reps: '12', rest: '45s', muscleGroup: 'Back' },
            { name: 'Tricep Dips', sets: '3', reps: '15', rest: '30s', muscleGroup: 'Arms' },
          ],
        },
        {
          day: 'Saturday',
          focus: 'Active Recovery',
          intensity: 'low',
          duration: '30 min',
          exercises: [
            { name: 'Yoga Flow', sets: '1', reps: '20 min', rest: '-', muscleGroup: 'Flexibility' },
            { name: 'Light Walk', sets: '1', reps: '15 min', rest: '-', muscleGroup: 'Recovery' },
          ],
        },
        {
          day: 'Sunday',
          focus: 'Complete Rest',
          intensity: 'low',
          duration: '-',
          exercises: [],
          isRest: true,
        },
      ];
    }

    if (goal === 'muscle-gain') {
      return [
        {
          day: 'Monday',
          focus: 'Chest & Triceps',
          intensity: 'high',
          duration: '60 min',
          exercises: [
            { name: 'Bench Press', sets: '4', reps: '8-10', rest: '90s', muscleGroup: 'Chest' },
            { name: 'Incline Dumbbell Press', sets: '3', reps: '10-12', rest: '60s', muscleGroup: 'Chest' },
            { name: 'Cable Flyes', sets: '3', reps: '12-15', rest: '60s', muscleGroup: 'Chest' },
            { name: 'Tricep Pushdowns', sets: '3', reps: '12', rest: '45s', muscleGroup: 'Triceps' },
            { name: 'Overhead Extension', sets: '3', reps: '12', rest: '45s', muscleGroup: 'Triceps' },
          ],
        },
        {
          day: 'Tuesday',
          focus: 'Back & Biceps',
          intensity: 'high',
          duration: '60 min',
          exercises: [
            { name: 'Deadlifts', sets: '4', reps: '6-8', rest: '120s', muscleGroup: 'Back' },
            { name: 'Pull-ups', sets: '3', reps: '8-10', rest: '90s', muscleGroup: 'Back' },
            { name: 'Bent-over Rows', sets: '3', reps: '10-12', rest: '60s', muscleGroup: 'Back' },
            { name: 'Barbell Curls', sets: '3', reps: '10-12', rest: '45s', muscleGroup: 'Biceps' },
            { name: 'Hammer Curls', sets: '3', reps: '12', rest: '45s', muscleGroup: 'Biceps' },
          ],
        },
        {
          day: 'Wednesday',
          focus: 'Rest Day',
          intensity: 'low',
          duration: '-',
          exercises: [],
          isRest: true,
        },
        {
          day: 'Thursday',
          focus: 'Legs & Glutes',
          intensity: 'high',
          duration: '60 min',
          exercises: [
            { name: 'Squats', sets: '4', reps: '8-10', rest: '120s', muscleGroup: 'Legs' },
            { name: 'Romanian Deadlifts', sets: '3', reps: '10-12', rest: '90s', muscleGroup: 'Hamstrings' },
            { name: 'Leg Press', sets: '3', reps: '12-15', rest: '60s', muscleGroup: 'Quads' },
            { name: 'Lunges', sets: '3', reps: '12 each', rest: '60s', muscleGroup: 'Legs' },
            { name: 'Calf Raises', sets: '4', reps: '15', rest: '45s', muscleGroup: 'Calves' },
          ],
        },
        {
          day: 'Friday',
          focus: 'Shoulders & Abs',
          intensity: 'medium',
          duration: '50 min',
          exercises: [
            { name: 'Military Press', sets: '4', reps: '8-10', rest: '90s', muscleGroup: 'Shoulders' },
            { name: 'Lateral Raises', sets: '3', reps: '12-15', rest: '60s', muscleGroup: 'Shoulders' },
            { name: 'Face Pulls', sets: '3', reps: '15', rest: '45s', muscleGroup: 'Rear Delts' },
            { name: 'Hanging Leg Raises', sets: '3', reps: '12', rest: '60s', muscleGroup: 'Abs' },
            { name: 'Cable Crunches', sets: '3', reps: '15', rest: '45s', muscleGroup: 'Abs' },
          ],
        },
        {
          day: 'Saturday',
          focus: 'Light Cardio',
          intensity: 'low',
          duration: '30 min',
          exercises: [
            { name: 'Cycling', sets: '1', reps: '30 min', rest: '-', muscleGroup: 'Cardio' },
          ],
        },
        {
          day: 'Sunday',
          focus: 'Complete Rest',
          intensity: 'low',
          duration: '-',
          exercises: [],
          isRest: true,
        },
      ];
    }

    // Default: General Fitness
    return [
      {
        day: 'Monday',
        focus: 'Full Body Strength',
        intensity: 'medium',
        duration: '45 min',
        exercises: [
          { name: 'Squats', sets: '3', reps: '12', rest: '60s', muscleGroup: 'Legs' },
          { name: 'Push-ups', sets: '3', reps: '15', rest: '45s', muscleGroup: 'Chest' },
          { name: 'Dumbbell Rows', sets: '3', reps: '12', rest: '60s', muscleGroup: 'Back' },
          { name: 'Plank', sets: '3', reps: '45s', rest: '30s', muscleGroup: 'Core' },
        ],
      },
      {
        day: 'Tuesday',
        focus: 'Cardio & Core',
        intensity: 'medium',
        duration: '40 min',
        exercises: [
          { name: 'Jogging', sets: '1', reps: '20 min', rest: '-', muscleGroup: 'Cardio' },
          { name: 'Bicycle Crunches', sets: '3', reps: '20', rest: '30s', muscleGroup: 'Abs' },
          { name: 'Russian Twists', sets: '3', reps: '20', rest: '30s', muscleGroup: 'Obliques' },
        ],
      },
      {
        day: 'Wednesday',
        focus: 'Rest Day',
        intensity: 'low',
        duration: '-',
        exercises: [],
        isRest: true,
      },
      {
        day: 'Thursday',
        focus: 'Upper Body',
        intensity: 'medium',
        duration: '45 min',
        exercises: [
          { name: 'Dumbbell Press', sets: '3', reps: '12', rest: '60s', muscleGroup: 'Chest' },
          { name: 'Shoulder Press', sets: '3', reps: '12', rest: '60s', muscleGroup: 'Shoulders' },
          { name: 'Bicep Curls', sets: '3', reps: '15', rest: '45s', muscleGroup: 'Biceps' },
          { name: 'Tricep Dips', sets: '3', reps: '12', rest: '45s', muscleGroup: 'Triceps' },
        ],
      },
      {
        day: 'Friday',
        focus: 'Lower Body',
        intensity: 'medium',
        duration: '45 min',
        exercises: [
          { name: 'Lunges', sets: '3', reps: '12 each', rest: '60s', muscleGroup: 'Legs' },
          { name: 'Leg Curls', sets: '3', reps: '15', rest: '45s', muscleGroup: 'Hamstrings' },
          { name: 'Calf Raises', sets: '3', reps: '20', rest: '30s', muscleGroup: 'Calves' },
          { name: 'Glute Bridges', sets: '3', reps: '15', rest: '45s', muscleGroup: 'Glutes' },
        ],
      },
      {
        day: 'Saturday',
        focus: 'Active Recovery',
        intensity: 'low',
        duration: '30 min',
        exercises: [
          { name: 'Stretching', sets: '1', reps: '15 min', rest: '-', muscleGroup: 'Flexibility' },
          { name: 'Walking', sets: '1', reps: '15 min', rest: '-', muscleGroup: 'Recovery' },
        ],
      },
      {
        day: 'Sunday',
        focus: 'Complete Rest',
        intensity: 'low',
        duration: '-',
        exercises: [],
        isRest: true,
      },
    ];
  };

  const workoutPlan = getWorkoutPlan();

  const getIntensityColor = (intensity: string) => {
    if (intensity === 'high') return { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200' };
    if (intensity === 'medium') return { bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-200' };
    return { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' };
  };

  const getMuscleGroupIcon = (group: string) => {
    if (group.includes('Cardio') || group.includes('Full Body')) return <Heart size={16} />;
    if (group.includes('Core') || group.includes('Abs')) return <Zap size={16} />;
    return <Dumbbell size={16} />;
  };

  return (
    <div className="space-y-6">
      {/* Weekly Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="text-slate-900 mb-3">Weekly Training Schedule</h3>
        <div className="grid grid-cols-7 gap-2">
          {workoutPlan.map((day, index) => {
            const colors = getIntensityColor(day.intensity);
            return (
              <div
                key={index}
                className={`text-center p-3 rounded-xl border ${
                  day.isRest ? 'bg-slate-50 border-slate-200' : `${colors.bg} ${colors.border}`
                }`}
              >
                <div className="text-xs text-slate-600 mb-1">{day.day.slice(0, 3)}</div>
                <div className={`text-xs ${day.isRest ? 'text-slate-500' : colors.text}`}>
                  {day.isRest ? 'Rest' : day.duration}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Workout Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workoutPlan.map((day, index) => {
          const colors = getIntensityColor(day.intensity);
          
          if (day.isRest) {
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md border-2 border-slate-100 flex flex-col items-center justify-center h-64"
              >
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <Moon className="text-slate-400" size={32} />
                </div>
                <h4 className="text-slate-900 mb-2">{day.day}</h4>
                <p className="text-slate-600">{day.focus}</p>
                <p className="text-sm text-slate-500 mt-2">Take time to recover and recharge</p>
              </div>
            );
          }

          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-slate-900">{day.day}</h4>
                  <p className="text-sm text-slate-600">{day.focus}</p>
                </div>
                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-xs ${colors.bg} ${colors.text} mb-1`}>
                    {day.intensity.toUpperCase()}
                  </div>
                  <div className="text-xs text-slate-500">{day.duration}</div>
                </div>
              </div>

              <div className="space-y-2">
                {day.exercises.map((exercise, exerciseIndex) => (
                  <div
                    key={exerciseIndex}
                    className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="text-blue-600">{getMuscleGroupIcon(exercise.muscleGroup)}</div>
                        <span className="text-sm text-slate-900">{exercise.name}</span>
                      </div>
                      <span className="text-xs text-slate-500">{exercise.muscleGroup}</span>
                    </div>
                    <div className="flex gap-4 text-xs text-slate-600">
                      <span>Sets: {exercise.sets}</span>
                      <span>Reps: {exercise.reps}</span>
                      <span>Rest: {exercise.rest}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Workout Tips */}
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
        <h4 className="text-slate-900 mb-3">Training Guidelines</h4>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Always warm up for 5-10 minutes before starting your workout</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Focus on proper form rather than lifting heavy weights</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Progressive overload: gradually increase weight or reps each week</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span>Rest days are crucial for muscle recovery and growth</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
