import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Calendar, Award, Flame, Target, Database } from 'lucide-react';

interface ProgressEntry {
  date: string;
  weight: number;
  bmi: number;
  calories: number;
}

interface ProgressDashboardProps {
  currentWeight: number;
  currentBMI: number;
  targetCalories: number;
}

export function ProgressDashboard({ currentWeight, currentBMI, targetCalories }: ProgressDashboardProps) {
  const [progressData, setProgressData] = useState<ProgressEntry[]>([]);
  const [selectedRange, setSelectedRange] = useState<'week' | 'month' | 'all'>('week');

  useEffect(() => {
    // Load progress data from localStorage
    const savedData = localStorage.getItem('healthProgressData');
    if (savedData) {
      setProgressData(JSON.parse(savedData));
    } else {
      // Generate sample data for demonstration
      const sampleData: ProgressEntry[] = [];
      const today = new Date();
      for (let i = 30; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        sampleData.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          weight: currentWeight + (Math.random() * 2 - 1) * (i / 10),
          bmi: currentBMI + (Math.random() * 0.5 - 0.25) * (i / 10),
          calories: targetCalories + Math.floor(Math.random() * 400 - 200),
        });
      }
      setProgressData(sampleData);
      localStorage.setItem('healthProgressData', JSON.stringify(sampleData));
    }
  }, [currentWeight, currentBMI, targetCalories]);

  const getFilteredData = () => {
    if (selectedRange === 'week') {
      return progressData.slice(-7);
    }
    if (selectedRange === 'month') {
      return progressData.slice(-30);
    }
    return progressData;
  };

  const filteredData = getFilteredData();

  const calculateWeeklyGoalProgress = () => {
    // Mock calculation: return a percentage
    return 78;
  };

  const calculateStreak = () => {
    // Mock calculation: consecutive days
    return 12;
  };

  const weeklyProgress = calculateWeeklyGoalProgress();
  const streak = calculateStreak();

  const achievements = [
    { id: 1, title: 'First Week', icon: '🎯', unlocked: true },
    { id: 2, title: '7-Day Streak', icon: '🔥', unlocked: true },
    { id: 3, title: 'Lost 2kg', icon: '💪', unlocked: true },
    { id: 4, title: 'Perfect Week', icon: '⭐', unlocked: false },
    { id: 5, title: '30-Day Warrior', icon: '🏆', unlocked: false },
  ];

  const beforeStats = {
    weight: currentWeight + 5,
    bmi: currentBMI + 1.5,
    date: '30 days ago',
  };

  const currentStats = {
    weight: currentWeight,
    bmi: currentBMI,
    date: 'Today',
  };

  return (
    <div className="space-y-6">
      {/* Header with Data Storage Indicator */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-slate-900 mb-1">Progress Tracking</h3>
          <p className="text-sm text-slate-600">Your fitness journey over time</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl border border-blue-100">
          <Database size={16} className="text-blue-600" />
          <span className="text-xs text-blue-900">Stored Locally</span>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Weekly Goal Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <Target className="text-purple-600" size={20} />
            </div>
            <div>
              <h4 className="text-slate-900">Weekly Goal</h4>
              <p className="text-xs text-slate-500">Progress</p>
            </div>
          </div>

          <div className="relative w-32 h-32 mx-auto">
            <svg className="transform -rotate-90 w-32 h-32">
              <circle cx="64" cy="64" r="56" stroke="#e2e8f0" strokeWidth="10" fill="none" />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#progressGradient)"
                strokeWidth="10"
                fill="none"
                strokeDasharray={`${(weeklyProgress / 100) * 351.86} 351.86`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl text-slate-900">{weeklyProgress}%</span>
              <span className="text-xs text-slate-500">Complete</span>
            </div>
          </div>
        </div>

        {/* Streak Counter */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
              <Flame className="text-orange-600" size={20} />
            </div>
            <div>
              <h4 className="text-slate-900">Current Streak</h4>
              <p className="text-xs text-slate-500">Consecutive days</p>
            </div>
          </div>

          <div className="text-center">
            <div className="text-6xl text-orange-600 mb-2">{streak}</div>
            <div className="text-sm text-slate-600">days in a row! 🔥</div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500">
                Keep going! Hit 30 days for the Warrior badge
              </p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
              <Award className="text-yellow-600" size={20} />
            </div>
            <div>
              <h4 className="text-slate-900">Achievements</h4>
              <p className="text-xs text-slate-500">3 of 5 unlocked</p>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`aspect-square rounded-xl flex items-center justify-center text-2xl transition-all ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-yellow-100 to-orange-100 scale-100'
                    : 'bg-slate-100 opacity-40 grayscale'
                }`}
                title={achievement.title}
              >
                {achievement.icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Before vs Current Comparison */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
        <h4 className="text-slate-900 mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-blue-600" />
          Progress Comparison
        </h4>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-4">
            <div className="text-xs text-slate-500 mb-2">BEFORE ({beforeStats.date})</div>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-slate-600">Weight:</span>
                <span className="text-xl text-slate-900 ml-2">{beforeStats.weight.toFixed(1)} kg</span>
              </div>
              <div>
                <span className="text-sm text-slate-600">BMI:</span>
                <span className="text-xl text-slate-900 ml-2">{beforeStats.bmi.toFixed(1)}</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl p-4 text-white">
            <div className="text-xs text-blue-100 mb-2">CURRENT ({currentStats.date})</div>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-blue-100">Weight:</span>
                <span className="text-xl ml-2">{currentStats.weight.toFixed(1)} kg</span>
                <span className="text-xs ml-2 text-green-300">
                  ↓ {(beforeStats.weight - currentStats.weight).toFixed(1)} kg
                </span>
              </div>
              <div>
                <span className="text-sm text-blue-100">BMI:</span>
                <span className="text-xl ml-2">{currentStats.bmi.toFixed(1)}</span>
                <span className="text-xs ml-2 text-green-300">
                  ↓ {(beforeStats.bmi - currentStats.bmi).toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="flex items-center gap-3">
        <Calendar className="text-slate-600" size={20} />
        <div className="flex gap-2">
          {['week', 'month', 'all'].map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range as any)}
              className={`px-4 py-2 rounded-xl transition-all ${
                selectedRange === range
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {range === 'week' ? 'Last 7 Days' : range === 'month' ? 'Last 30 Days' : 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {/* Weight Trend Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h4 className="text-slate-900 mb-4">Weight Trend</h4>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" stroke="#64748b" style={{ fontSize: '12px' }} />
            <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '8px 12px',
              }}
            />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* BMI Trend Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h4 className="text-slate-900 mb-4">BMI Trend</h4>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" stroke="#64748b" style={{ fontSize: '12px' }} />
            <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '8px 12px',
              }}
            />
            <Line
              type="monotone"
              dataKey="bmi"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Calorie Balance Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h4 className="text-slate-900 mb-4">Daily Calorie Intake</h4>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" stroke="#64748b" style={{ fontSize: '12px' }} />
            <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '8px 12px',
              }}
            />
            <Line
              type="monotone"
              dataKey="calories"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ fill: '#f59e0b', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 text-sm text-slate-600 text-center">
          Target: <span className="text-slate-900">{targetCalories} cal/day</span>
        </div>
      </div>
    </div>
  );
}
