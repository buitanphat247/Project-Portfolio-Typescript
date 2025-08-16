import React from 'react';

interface Strength {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface StrengthsProps {
  title?: string;
  strengths: Strength[];
}

const Strengths: React.FC<StrengthsProps> = ({
  title = "Điểm mạnh",
  strengths
}) => {
  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      'purple': 'bg-purple-500/20 border-purple-500/30 text-purple-300',
      'pink': 'bg-pink-500/20 border-pink-500/30 text-pink-300',
      'blue': 'bg-blue-500/20 border-blue-500/30 text-blue-300',
      'green': 'bg-green-500/20 border-green-500/30 text-green-300',
      'yellow': 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300',
      'red': 'bg-red-500/20 border-red-500/30 text-red-300',
      'indigo': 'bg-indigo-500/20 border-indigo-500/30 text-indigo-300',
      'cyan': 'bg-cyan-500/20 border-cyan-500/30 text-cyan-300'
    };
    return colors[color] || colors['purple'];
  };

  return (
    <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-6 mb-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">
          {title}
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {strengths.map((strength, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg border ${getColorClasses(strength.color)} hover:scale-105 transition-all duration-300 cursor-pointer`}
          >
            <div className="flex items-start space-x-3">
              <div className="text-2xl flex-shrink-0">
                {strength.icon}
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">
                  {strength.title}
                </h4>
                <p className="text-sm text-gray-300">
                  {strength.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Strengths;
