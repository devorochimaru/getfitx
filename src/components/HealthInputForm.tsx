import { useState } from 'react';
import { User, Activity, Moon, Utensils, AlertCircle } from 'lucide-react';

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

interface HealthInputFormProps {
  onSubmit: (data: HealthData) => void;
}

export function HealthInputForm({ onSubmit }: HealthInputFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<HealthData>({
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    sleepHours: '',
    dietaryPreference: '',
    medicalConditions: [],
  });

  const updateField = (field: keyof HealthData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleCondition = (condition: string) => {
    setFormData((prev) => ({
      ...prev,
      medicalConditions: prev.medicalConditions.includes(condition)
        ? prev.medicalConditions.filter((c) => c !== condition)
        : [...prev.medicalConditions, condition],
    }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const isStepValid = () => {
    if (step === 1) {
      return formData.age && formData.gender && formData.height && formData.weight;
    }
    if (step === 2) {
      return formData.activityLevel && formData.sleepHours && formData.dietaryPreference;
    }
    return true;
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step >= num
                    ? 'bg-blue-500 text-white shadow-lg scale-110'
                    : 'bg-white text-slate-400 border-2 border-slate-200'
                }`}
              >
                {num}
              </div>
              {num < 3 && (
                <div
                  className={`h-1 flex-1 mx-2 transition-all duration-300 rounded-full ${
                    step > num ? 'bg-blue-500' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between px-2">
          <span className="text-xs text-slate-600">Basic Info</span>
          <span className="text-xs text-slate-600">Lifestyle</span>
          <span className="text-xs text-slate-600">Health Status</span>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl p-8 shadow-xl">
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <User className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-slate-900">Basic Information</h3>
                <p className="text-sm text-slate-500">Tell us about yourself</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm text-slate-700 mb-2">Age (years)</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => updateField('age', e.target.value)}
                  placeholder="e.g., 28"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm text-slate-700 mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => updateField('gender', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors appearance-none bg-white"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm text-slate-700 mb-2">Height (cm)</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => updateField('height', e.target.value)}
                  placeholder="e.g., 170"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm text-slate-700 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => updateField('weight', e.target.value)}
                  placeholder="e.g., 70"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Lifestyle */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Activity className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="text-slate-900">Lifestyle & Habits</h3>
                <p className="text-sm text-slate-500">Help us understand your routine</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-700 mb-2">Daily Activity Level</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { value: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise' },
                    { value: 'moderate', label: 'Moderate', desc: '3-5 days/week' },
                    { value: 'active', label: 'Very Active', desc: '6-7 days/week' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateField('activityLevel', option.value)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        formData.activityLevel === option.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-sm text-slate-900">{option.label}</div>
                      <div className="text-xs text-slate-500 mt-1">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2 flex items-center gap-2">
                  <Moon size={16} />
                  Average Sleep (hours per night)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.sleepHours}
                  onChange={(e) => updateField('sleepHours', e.target.value)}
                  placeholder="e.g., 7.5"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-2 flex items-center gap-2">
                  <Utensils size={16} />
                  Dietary Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { value: 'vegetarian', label: 'Vegetarian' },
                    { value: 'non-vegetarian', label: 'Non-Vegetarian' },
                    { value: 'mixed', label: 'Mixed' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateField('dietaryPreference', option.value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.dietaryPreference === option.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Health Status */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <AlertCircle className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="text-slate-900">Health Status</h3>
                <p className="text-sm text-slate-500">Any existing medical conditions?</p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm text-slate-700 mb-3">
                Select all that apply (or none if healthy)
              </label>
              {[
                { value: 'diabetes', label: 'Diabetes', desc: 'Type 1 or Type 2' },
                { value: 'hypertension', label: 'High Blood Pressure', desc: 'Hypertension' },
                { value: 'thyroid', label: 'Thyroid Disorder', desc: 'Hypo or Hyperthyroidism' },
                { value: 'none', label: 'None of the above', desc: 'I am healthy' },
              ].map((condition) => (
                <button
                  key={condition.value}
                  onClick={() => {
                    if (condition.value === 'none') {
                      updateField('medicalConditions', ['none']);
                    } else {
                      const filtered = formData.medicalConditions.filter((c) => c !== 'none');
                      updateField(
                        'medicalConditions',
                        filtered.includes(condition.value)
                          ? filtered.filter((c) => c !== condition.value)
                          : [...filtered, condition.value]
                      );
                    }
                  }}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                    formData.medicalConditions.includes(condition.value)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div>
                    <div className="text-sm text-slate-900">{condition.label}</div>
                    <div className="text-xs text-slate-500 mt-1">{condition.desc}</div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                      formData.medicalConditions.includes(condition.value)
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-slate-300'
                    }`}
                  >
                    {formData.medicalConditions.includes(condition.value) && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-xs text-amber-800">
                <strong>Medical Disclaimer:</strong> This tool provides general guidance only and is not
                a substitute for professional medical advice. Please consult with a healthcare provider
                before making significant changes to your diet or exercise routine.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="px-6 py-3 rounded-xl border-2 border-slate-200 hover:border-slate-300 text-slate-700 transition-all"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`flex-1 px-6 py-3 rounded-xl transition-all ${
                isStepValid()
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg text-white'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg text-white transition-all"
            >
              Analyze My Health
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
