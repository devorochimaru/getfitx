import { useState, useEffect } from 'react';
import { Heart, Activity, BarChart3, Menu, X } from 'lucide-react';
import { HealthInputForm } from './components/HealthInputForm';
import { GoalSelector } from './components/GoalSelector';
import { MetricsDisplay } from './components/MetricsDisplay';
import { DietPlan } from './components/DietPlan';
import { WorkoutPlan } from './components/WorkoutPlan';
import { SafetyWarning } from './components/SafetyWarning';
import { ProgressDashboard } from './components/ProgressDashboard';

interface HealthData {
  age: string;
  gender: string;
  height: string;
  weight: string;
  activityLevel: string;
  sleepHours: string;
  dietaryPreference: string;
  medicalConditions: string[];
}

type Screen = 'welcome' | 'input' | 'goal' | 'metrics' | 'plan' | 'progress';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'diet' | 'workout'>('diet');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Calculate metrics
  const calculateBMI = () => {
    if (!healthData) return 0;
    const heightM = parseFloat(healthData.height) / 100;
    const weight = parseFloat(healthData.weight);
    return weight / (heightM * heightM);
  };

  const calculateBMR = () => {
    if (!healthData) return 0;
    const weight = parseFloat(healthData.weight);
    const height = parseFloat(healthData.height);
    const age = parseInt(healthData.age);

    if (healthData.gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  };

  const calculateBodyFat = () => {
    if (!healthData) return 0;
    const bmi = calculateBMI();
    const age = parseInt(healthData.age);

    if (healthData.gender === 'male') {
      return 1.2 * bmi + 0.23 * age - 16.2;
    } else {
      return 1.2 * bmi + 0.23 * age - 5.4;
    }
  };

  const bmi = calculateBMI();
  const bmr = calculateBMR();
  const bodyFat = calculateBodyFat();

  const getTargetCalories = () => {
    if (!selectedGoal) return bmr * 1.55;
    if (selectedGoal === 'fat-loss') return Math.round(bmr * 1.2 * 0.8);
    if (selectedGoal === 'muscle-gain') return Math.round(bmr * 1.55 * 1.15);
    if (selectedGoal === 'recomposition') return Math.round(bmr * 1.55);
    if (selectedGoal === 'endurance') return Math.round(bmr * 1.7);
    return Math.round(bmr * 1.55);
  };

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('healthPlannerData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setHealthData(parsed.healthData);
      setSelectedGoal(parsed.selectedGoal);
      if (parsed.healthData && parsed.selectedGoal) {
        setCurrentScreen('plan');
      }
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (healthData && selectedGoal) {
      localStorage.setItem(
        'healthPlannerData',
        JSON.stringify({ healthData, selectedGoal })
      );
    }
  }, [healthData, selectedGoal]);

  const handleStartClick = () => {
    setCurrentScreen('input');
  };

  const handleHealthDataSubmit = (data: HealthData) => {
    setHealthData(data);
    setCurrentScreen('goal');
  };

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
  };

  const handleGoalContinue = () => {
    setCurrentScreen('metrics');
  };

  const handleMetricsContinue = () => {
    setCurrentScreen('plan');
  };

  const navigateToProgress = () => {
    setCurrentScreen('progress');
    setSidebarOpen(false);
  };

  const navigateToPlan = () => {
    setCurrentScreen('plan');
    setSidebarOpen(false);
  };

  const handleRestart = () => {
    localStorage.removeItem('healthPlannerData');
    setHealthData(null);
    setSelectedGoal(null);
    setCurrentScreen('welcome');
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen gradient-soft">
      {/* Header */}
      {currentScreen !== 'welcome' && (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Heart className="text-white" size={20} />
                </div>
                <div>
                  <h1 className="text-slate-900">HealthSync</h1>
                  <p className="text-xs text-slate-500">Your Personal Health Companion</p>
                </div>
              </div>

              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors lg:hidden"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <nav className="hidden lg:flex items-center gap-2">
                {healthData && selectedGoal && (
                  <>
                    <button
                      onClick={navigateToPlan}
                      className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                        currentScreen === 'plan'
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Activity size={18} />
                      My Plan
                    </button>
                    <button
                      onClick={navigateToProgress}
                      className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                        currentScreen === 'progress'
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <BarChart3 size={18} />
                      Progress
                    </button>
                    <button
                      onClick={handleRestart}
                      className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-all"
                    >
                      Start Over
                    </button>
                  </>
                )}
              </nav>
            </div>
          </div>

          {/* Mobile Menu */}
          {sidebarOpen && (
            <div className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-2">
              {healthData && selectedGoal && (
                <>
                  <button
                    onClick={navigateToPlan}
                    className={`w-full px-4 py-3 rounded-xl transition-all flex items-center gap-2 ${
                      currentScreen === 'plan'
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Activity size={18} />
                    My Plan
                  </button>
                  <button
                    onClick={navigateToProgress}
                    className={`w-full px-4 py-3 rounded-xl transition-all flex items-center gap-2 ${
                      currentScreen === 'progress'
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <BarChart3 size={18} />
                    Progress
                  </button>
                  <button
                    onClick={handleRestart}
                    className="w-full px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 transition-all text-left"
                  >
                    Start Over
                  </button>
                </>
              )}
            </div>
          )}
        </header>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Screen */}
        {currentScreen === 'welcome' && (
          <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="text-center max-w-2xl animate-fadeIn">
              <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-2xl">
                <Heart className="text-white" size={40} />
              </div>
              <h1 className="text-slate-900 mb-4">
                Personal Health, Fitness & Nutrition Planner
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Your medical-grade companion for personalized diet plans, workout routines,
                and comprehensive health tracking. Built with safety, trust, and real results in mind.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Activity className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-slate-900 mb-2">Smart Analysis</h3>
                  <p className="text-sm text-slate-600">
                    BMI, BMR & body-fat calculations with AI-powered interpretations
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
                    <Heart className="text-purple-600" size={24} />
                  </div>
                  <h3 className="text-slate-900 mb-2">Personalized Plans</h3>
                  <p className="text-sm text-slate-600">
                    Custom diet & workout routines tailored to your goals
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="text-green-600" size={24} />
                  </div>
                  <h3 className="text-slate-900 mb-2">Track Progress</h3>
                  <p className="text-sm text-slate-600">
                    Visual analytics & achievements to keep you motivated
                  </p>
                </div>
              </div>

              <button
                onClick={handleStartClick}
                className="px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-2xl text-white transition-all hover:scale-105 text-lg shadow-xl"
              >
                Start Your Health Journey
              </button>

              <p className="text-xs text-slate-500 mt-6">
                All data is stored locally in your browser • No account required • 100% private
              </p>
            </div>
          </div>
        )}

        {/* Health Input Form */}
        {currentScreen === 'input' && (
          <HealthInputForm onSubmit={handleHealthDataSubmit} />
        )}

        {/* Goal Selection */}
        {currentScreen === 'goal' && (
          <GoalSelector
            selectedGoal={selectedGoal}
            onSelectGoal={handleGoalSelect}
            onContinue={handleGoalContinue}
          />
        )}

        {/* Metrics Display */}
        {currentScreen === 'metrics' && healthData && (
          <MetricsDisplay
            bmi={bmi}
            bmr={bmr}
            bodyFat={bodyFat}
            gender={healthData.gender}
            onContinue={handleMetricsContinue}
          />
        )}

        {/* Plan Dashboard */}
        {currentScreen === 'plan' && healthData && selectedGoal && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tab Navigation */}
              <div className="bg-white rounded-2xl p-2 shadow-md flex gap-2">
                <button
                  onClick={() => setActiveTab('diet')}
                  className={`flex-1 px-6 py-3 rounded-xl transition-all ${
                    activeTab === 'diet'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Diet Plan
                </button>
                <button
                  onClick={() => setActiveTab('workout')}
                  className={`flex-1 px-6 py-3 rounded-xl transition-all ${
                    activeTab === 'workout'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Workout Plan
                </button>
              </div>

              {/* Content */}
              <div className="animate-fadeIn">
                {activeTab === 'diet' ? (
                  <DietPlan
                    dietaryPreference={healthData.dietaryPreference}
                    goal={selectedGoal}
                    bmr={bmr}
                  />
                ) : (
                  <WorkoutPlan
                    goal={selectedGoal}
                    activityLevel={healthData.activityLevel}
                  />
                )}
              </div>
            </div>

            {/* Safety Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <SafetyWarning
                  bmi={bmi}
                  bmr={bmr}
                  medicalConditions={healthData.medicalConditions}
                  goal={selectedGoal}
                  age={parseInt(healthData.age)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Progress Dashboard */}
        {currentScreen === 'progress' && healthData && selectedGoal && (
          <ProgressDashboard
            currentWeight={parseFloat(healthData.weight)}
            currentBMI={bmi}
            targetCalories={getTargetCalories()}
          />
        )}
      </main>

      {/* Footer */}
      {currentScreen !== 'welcome' && (
        <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm mt-16">
          <div className="container mx-auto px-4 py-6 text-center text-sm text-slate-600">
            <p>
              <strong>Disclaimer:</strong> This tool provides general guidance only. Always consult
              with healthcare professionals before starting any new health program.
            </p>
          </div>
        </footer>
      )}

      {/* Global Styles for Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
