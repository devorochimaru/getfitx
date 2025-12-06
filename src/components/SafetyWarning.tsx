import { AlertTriangle, AlertCircle, CheckCircle, Shield } from 'lucide-react';

interface SafetyWarningProps {
  bmi: number;
  bmr: number;
  medicalConditions: string[];
  goal: string;
  age: number;
}

interface Alert {
  level: 'green' | 'amber' | 'red';
  title: string;
  message: string;
}

export function SafetyWarning({ bmi, bmr, medicalConditions, goal, age }: SafetyWarningProps) {
  const getAlerts = (): Alert[] => {
    const alerts: Alert[] = [];

    // BMI Checks
    if (bmi < 18.5) {
      alerts.push({
        level: 'red',
        title: 'Underweight Alert',
        message:
          'Your BMI indicates you are underweight. Before starting any weight loss program, please consult a healthcare professional. Focus on nutrient-dense foods and strength training.',
      });
    } else if (bmi >= 30) {
      alerts.push({
        level: 'amber',
        title: 'Obesity Alert',
        message:
          'Your BMI indicates obesity. Consider medical supervision while following this plan. Start gradually and prioritize sustainable lifestyle changes over rapid weight loss.',
      });
    }

    // BMR and Calorie Deficit Check
    if (goal === 'fat-loss' && bmr * 1.2 * 0.8 < 1200) {
      alerts.push({
        level: 'red',
        title: 'Unsafe Caloric Intake',
        message:
          'The calculated calorie target is below the minimum safe threshold (1200 cal/day for women, 1500 for men). This can harm your metabolism. Please consult a nutritionist before proceeding.',
      });
    }

    // Medical Conditions - Diabetes
    if (medicalConditions.includes('diabetes')) {
      if (goal === 'fat-loss' || goal === 'muscle-gain') {
        alerts.push({
          level: 'amber',
          title: 'Diabetes Management Required',
          message:
            'As a diabetic, significant dietary changes can affect blood sugar levels. Monitor glucose regularly, adjust medications with your doctor, and avoid skipping meals. High-intensity workouts may require carb timing.',
        });
      }
    }

    // Medical Conditions - Hypertension
    if (medicalConditions.includes('hypertension')) {
      if (goal === 'muscle-gain' || goal === 'endurance') {
        alerts.push({
          level: 'amber',
          title: 'Blood Pressure Monitoring Needed',
          message:
            'High blood pressure requires careful exercise management. Avoid heavy lifting (Valsalva maneuver), limit sodium intake, and monitor BP before and after workouts. Consult your doctor if BP exceeds 140/90 mmHg.',
        });
      }
    }

    // Medical Conditions - Thyroid
    if (medicalConditions.includes('thyroid')) {
      alerts.push({
        level: 'amber',
        title: 'Thyroid Considerations',
        message:
          'Thyroid disorders affect metabolism and energy levels. Weight changes may be slower than expected. Ensure medication compliance and monitor thyroid levels regularly. Avoid extreme diets.',
      });
    }

    // Age-related warnings
    if (age > 60) {
      if (goal === 'muscle-gain' || goal === 'endurance') {
        alerts.push({
          level: 'amber',
          title: 'Age-Appropriate Training',
          message:
            'At your age, prioritize joint health and recovery. Start with lighter weights and progress slowly. Include flexibility and balance exercises. Consider bone density screening if not done recently.',
        });
      }
    }

    if (age < 18) {
      alerts.push({
        level: 'amber',
        title: 'Youth Training Guidelines',
        message:
          'As you are under 18, your body is still developing. Avoid extreme diets and heavy powerlifting. Focus on balanced nutrition, proper sleep, and age-appropriate exercises. Parental or medical supervision recommended.',
      });
    }

    // Rapid Weight Loss Warning
    if (goal === 'fat-loss' && bmi >= 25) {
      alerts.push({
        level: 'amber',
        title: 'Sustainable Weight Loss',
        message:
          'Aim to lose no more than 0.5-1 kg per week. Rapid weight loss can lead to muscle loss, nutritional deficiencies, and gallstones. Focus on long-term habit changes rather than quick fixes.',
      });
    }

    // Medical Recovery Goal
    if (goal === 'medical-recovery') {
      alerts.push({
        level: 'amber',
        title: 'Medical Supervision Required',
        message:
          'This plan is for general guidance only. Post-injury or post-surgery rehabilitation must be supervised by a physical therapist or sports medicine specialist. Never push through pain.',
      });
    }

    // All clear
    if (alerts.length === 0) {
      alerts.push({
        level: 'green',
        title: 'You\'re Good to Go!',
        message:
          'Based on your inputs, you can safely proceed with this plan. Remember to listen to your body, stay consistent, and adjust as needed. Regular check-ins with healthcare providers are always beneficial.',
      });
    }

    return alerts;
  };

  const alerts = getAlerts();

  const getAlertStyles = (level: string) => {
    if (level === 'red') {
      return {
        bg: 'bg-red-50',
        border: 'border-red-200',
        icon: <AlertTriangle className="text-red-600" size={24} />,
        iconBg: 'bg-red-100',
      };
    }
    if (level === 'amber') {
      return {
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        icon: <AlertCircle className="text-amber-600" size={24} />,
        iconBg: 'bg-amber-100',
      };
    }
    return {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: <CheckCircle className="text-green-600" size={24} />,
      iconBg: 'bg-green-100',
    };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
          <Shield className="text-white" size={20} />
        </div>
        <div>
          <h3 className="text-slate-900">Safety & Risk Assessment</h3>
          <p className="text-sm text-slate-600">Medical-grade analysis of your plan</p>
        </div>
      </div>

      {alerts.map((alert, index) => {
        const styles = getAlertStyles(alert.level);
        return (
          <div
            key={index}
            className={`${styles.bg} border-2 ${styles.border} rounded-2xl p-5 transition-all hover:shadow-md`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl ${styles.iconBg} flex items-center justify-center flex-shrink-0`}>
                {styles.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-slate-900 mb-2">{alert.title}</h4>
                <p className="text-sm text-slate-700 leading-relaxed">{alert.message}</p>
              </div>
            </div>
          </div>
        );
      })}

      {/* General Disclaimer */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 mt-6">
        <h4 className="mb-3">Medical Disclaimer</h4>
        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          This tool provides <strong>general fitness guidance only</strong> and is not a substitute for
          professional medical, nutritional, or therapeutic advice. Always consult with qualified healthcare
          providers before starting any new diet, exercise program, or making changes to existing medical
          treatments.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          This platform is <strong>not intended for collecting personally identifiable information (PII)</strong> or
          securing sensitive medical data. All data is stored locally in your browser and is not transmitted to any
          server.
        </p>
      </div>
    </div>
  );
}
