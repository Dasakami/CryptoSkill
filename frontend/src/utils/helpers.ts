export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    programming: 'bg-blue-100 text-blue-800',
    design: 'bg-purple-100 text-purple-800',
    blockchain: 'bg-green-100 text-green-800',
    marketing: 'bg-orange-100 text-orange-800',
    data_science: 'bg-pink-100 text-pink-800',
    other: 'bg-gray-100 text-gray-800'
  };
  return colors[category] || colors.other;
};

export const shortenAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};