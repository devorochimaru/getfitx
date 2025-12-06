import { useEffect, useState } from 'react';
import { TrendingUp, Activity, Zap } from 'lucide-react';

interface MetricsDisplayProps {
  bmi: number;
  bmr: number;
  bodyFat: number;
  gender: string;
  onContinue: () => void;
}

export function MetricsDisplay({ bmi, bmr, bodyFat, gender, onContinue }: MetricsDisplayProps) {
  const [animatedBMI, setAnimatedBMI] = useState(0);
  const [animatedBMR, setAnimatedBMR] = useState(0);
  const [animatedBodyFat, setAnimatedBodyFat] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedBMI(bmi * progress);
      setAnimatedBMR(bmr * progress);
      setAnimatedBodyFat(bodyFat * progress);

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [bmi, bmr, bodyFat]);

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-600', bgColor: 'bg-blue-500' };
    if (bmi < 25) return { label: 'Normal', color: 'text-green-600', bgColor: 'bg-green-500' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-600', bgColor: 'bg-yellow-500' };
    return { label: 'Obese', color: 'text-red-600', bgColor: 'bg-red-500' };
  };

  const getBMIPercentage = (bmi: number) => {
    const min = 15;
    const max = 40;
    return Math.min(Math.max(((bmi - min) / (max - min)) * 100, 0), 100);
  };

  const bmiCategory = getBMICategory(bmi);
  const bmiPercentage = getBMIPercentage(bmi);

  const getBodyFatRange = (gender: string) => {
    if (gender === 'male') {
      return { essential: '2-5%', athlete: '6-13%', fitness: '14-17%', average: '18-24%', obese: '25%+' };
    }
    return { essential: '10-13%', athlete: '14-20%', fitness: '21-24%', average: '25-31%', obese: '32%+' };
  };

  const bodyFatRange = getBodyFatRange(gender);

  const getInterpretation = () => {
    const category = getBMICategory(bmi).label;
    let interpretation = '';

    if (category === 'Underweight') {
      interpretation = 'Your BMI suggests you may be underweight. Focus on nutrient-dense foods and strength training to build healthy muscle mass.';
    } else if (category === 'Normal') {
      interpretation = 'Your BMI is in the healthy range. Maintain your current lifestyle with balanced nutrition and regular exercise.';
    } else if (category === 'Overweight') {
      interpretation = 'Your BMI indicates you are slightly overweight. A moderate caloric deficit with cardio and resistance training can help you reach a healthier weight.';
    } else {
      interpretation = 'Your BMI suggests obesity. Consider consulting a healthcare professional and starting with gentle, sustainable lifestyle changes.';
    }

    return interpretation;
  };

  return (
    <div className="w-full max-w-6xl mx-auto animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-slate-900 mb-3">Your Health Metrics</h2>
        <p className="text-slate-600">
          Based on your inputs, here's a comprehensive analysis of your current state
        </p>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* BMI Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <TrendingUp className="text-blue-600" size={20} />
            </div>
            <div>
              <h4 className="text-slate-900">Body Mass Index</h4>
              <p className="text-xs text-slate-500">BMI</p>
            </div>
          </div>

          {/* Circular Gauge */}
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="transform -rotate-90 w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#e2e8f0"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#bmiGradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${(animatedBMI / 40) * 351.86} 351.86`}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
              <defs>
                <linearGradient id="bmiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl text-slate-900">{animatedBMI.toFixed(1)}</span>
              <span className={`text-xs ${bmiCategory.color}`}>{bmiCategory.label}</span>
            </div>
          </div>

          {/* BMI Scale */}
          <div className="mt-4">
            <div className="h-2 bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-400 rounded-full mb-2" />
            <div className="flex justify-between text-xs text-slate-500">
              <span>15</span>
              <span>25</span>
              <span>40</span>
            </div>
          </div>
        </div>

        {/* BMR Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <Zap className="text-purple-600" size={20} />
            </div>
            <div>
              <h4 className="text-slate-900">Basal Metabolic Rate</h4>
              <p className="text-xs text-slate-500">BMR</p>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="text-5xl text-slate-900 mb-2">{Math.round(animatedBMR)}</div>
            <div className="text-sm text-slate-600">calories/day</div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Sedentary</span>
              <span className="text-slate-900">{Math.round(bmr * 1.2)} cal/day</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Moderate</span>
              <span className="text-slate-900">{Math.round(bmr * 1.55)} cal/day</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Very Active</span>
              <span className="text-slate-900">{Math.round(bmr * 1.9)} cal/day</span>
            </div>
          </div>
        </div>

        {/* Body Fat Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <Activity className="text-green-600" size={20} />
            </div>
            <div>
              <h4 className="text-slate-900">Body Fat</h4>
              <p className="text-xs text-slate-500">Estimate</p>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="text-5xl text-slate-900 mb-2">{animatedBodyFat.toFixed(1)}%</div>
            <div className="text-sm text-slate-600">estimated</div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600">Essential</span>
              <span className="text-slate-900">{bodyFatRange.essential}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Athlete</span>
              <span className="text-slate-900">{bodyFatRange.athlete}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Fitness</span>
              <span className="text-slate-900">{bodyFatRange.fitness}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Average</span>
              <span className="text-slate-900">{bodyFatRange.average}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interpretation Card */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100 mb-8">
        <h4 className="text-slate-900 mb-3">What This Means For You</h4>
        <p className="text-slate-700 leading-relaxed">{getInterpretation()}</p>
        <div className="mt-4 pt-4 border-t border-blue-200">
          <p className="text-sm text-slate-600">
            <strong>Next Step:</strong> We'll create a personalized diet and workout plan based on your metrics and selected goal.
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onContinue}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-xl text-white transition-all hover:scale-105"
        >
          View My Personalized Plan
        </button>
      </div>
    </div>
  );
}
