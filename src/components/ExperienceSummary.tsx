import React from 'react';

interface ExperienceSummaryProps {
  title?: string;
  items: {
    icon: string;
    label: string;
    value: string;
    color: string;
  }[];
}

const ExperienceSummary: React.FC<ExperienceSummaryProps> = ({
  title = "Tóm tắt kinh nghiệm",
  items
}) => {
  const getIconColor = (color: string) => {
    const colors: Record<string, string> = {
      'purple': 'bg-purple-500/20 text-purple-300',
      'pink': 'bg-pink-500/20 text-pink-300',
      'blue': 'bg-blue-500/20 text-blue-300',
      'green': 'bg-green-500/20 text-green-300',
      'yellow': 'bg-yellow-500/20 text-yellow-300',
      'red': 'bg-red-500/20 text-red-300',
      'indigo': 'bg-indigo-500/20 text-indigo-300',
      'cyan': 'bg-cyan-500/20 text-cyan-300'
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div key={index} className="text-center">
            <div className={`w-16 h-16 rounded-full ${getIconColor(item.color)} flex items-center justify-center mx-auto mb-3`}>
              <span className="text-2xl">{item.icon}</span>
            </div>
            <h4 className="text-gray-300 text-sm font-medium mb-1">
              {item.label}
            </h4>
            <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSummary;
