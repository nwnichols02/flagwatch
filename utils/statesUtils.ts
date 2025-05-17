import { State } from '@/types';

// This would connect to a real API in a production app
export function getAllStates(): State[] {
  // Mock data - in a real app, this data would come from an API
  return [
    { name: 'Alabama', code: 'AL', isHalfMast: Math.random() > 0.8 },
    { name: 'Alaska', code: 'AK', isHalfMast: Math.random() > 0.8 },
    { name: 'Arizona', code: 'AZ', isHalfMast: Math.random() > 0.8 },
    { name: 'Arkansas', code: 'AR', isHalfMast: Math.random() > 0.8 },
    { name: 'California', code: 'CA', isHalfMast: Math.random() > 0.8 },
    { name: 'Colorado', code: 'CO', isHalfMast: Math.random() > 0.8 },
    { name: 'Connecticut', code: 'CT', isHalfMast: Math.random() > 0.8 },
    { name: 'Delaware', code: 'DE', isHalfMast: Math.random() > 0.8 },
    { name: 'Florida', code: 'FL', isHalfMast: Math.random() > 0.8 },
    { name: 'Georgia', code: 'GA', isHalfMast: Math.random() > 0.8 },
    { name: 'Hawaii', code: 'HI', isHalfMast: Math.random() > 0.8 },
    { name: 'Idaho', code: 'ID', isHalfMast: Math.random() > 0.8 },
    { name: 'Illinois', code: 'IL', isHalfMast: Math.random() > 0.8 },
    { name: 'Indiana', code: 'IN', isHalfMast: Math.random() > 0.8 },
    { name: 'Iowa', code: 'IA', isHalfMast: Math.random() > 0.8 },
    { name: 'Kansas', code: 'KS', isHalfMast: Math.random() > 0.8 },
    { name: 'Kentucky', code: 'KY', isHalfMast: Math.random() > 0.8 },
    { name: 'Louisiana', code: 'LA', isHalfMast: Math.random() > 0.8 },
    { name: 'Maine', code: 'ME', isHalfMast: Math.random() > 0.8 },
    { name: 'Maryland', code: 'MD', isHalfMast: Math.random() > 0.8 },
    { name: 'Massachusetts', code: 'MA', isHalfMast: Math.random() > 0.8 },
    { name: 'Michigan', code: 'MI', isHalfMast: Math.random() > 0.8 },
    { name: 'Minnesota', code: 'MN', isHalfMast: Math.random() > 0.8 },
    { name: 'Mississippi', code: 'MS', isHalfMast: Math.random() > 0.8 },
    { name: 'Missouri', code: 'MO', isHalfMast: Math.random() > 0.8 },
    { name: 'Montana', code: 'MT', isHalfMast: Math.random() > 0.8 },
    { name: 'Nebraska', code: 'NE', isHalfMast: Math.random() > 0.8 },
    { name: 'Nevada', code: 'NV', isHalfMast: Math.random() > 0.8 },
    { name: 'New Hampshire', code: 'NH', isHalfMast: Math.random() > 0.8 },
    { name: 'New Jersey', code: 'NJ', isHalfMast: Math.random() > 0.8 },
    { name: 'New Mexico', code: 'NM', isHalfMast: Math.random() > 0.8 },
    { name: 'New York', code: 'NY', isHalfMast: Math.random() > 0.8 },
    { name: 'North Carolina', code: 'NC', isHalfMast: Math.random() > 0.8 },
    { name: 'North Dakota', code: 'ND', isHalfMast: Math.random() > 0.8 },
    { name: 'Ohio', code: 'OH', isHalfMast: Math.random() > 0.8 },
    { name: 'Oklahoma', code: 'OK', isHalfMast: Math.random() > 0.8 },
    { name: 'Oregon', code: 'OR', isHalfMast: Math.random() > 0.8 },
    { name: 'Pennsylvania', code: 'PA', isHalfMast: Math.random() > 0.8 },
    { name: 'Rhode Island', code: 'RI', isHalfMast: Math.random() > 0.8 },
    { name: 'South Carolina', code: 'SC', isHalfMast: Math.random() > 0.8 },
    { name: 'South Dakota', code: 'SD', isHalfMast: Math.random() > 0.8 },
    { name: 'Tennessee', code: 'TN', isHalfMast: Math.random() > 0.8 },
    { name: 'Texas', code: 'TX', isHalfMast: Math.random() > 0.8 },
    { name: 'Utah', code: 'UT', isHalfMast: Math.random() > 0.8 },
    { name: 'Vermont', code: 'VT', isHalfMast: Math.random() > 0.8 },
    { name: 'Virginia', code: 'VA', isHalfMast: Math.random() > 0.8 },
    { name: 'Washington', code: 'WA', isHalfMast: Math.random() > 0.8 },
    { name: 'West Virginia', code: 'WV', isHalfMast: Math.random() > 0.8 },
    { name: 'Wisconsin', code: 'WI', isHalfMast: Math.random() > 0.8 },
    { name: 'Wyoming', code: 'WY', isHalfMast: Math.random() > 0.8 },
    { name: 'District of Columbia', code: 'DC', isHalfMast: Math.random() > 0.8 },
  ];
}

// Get flag status for a specific state
export async function getStateStatus(stateCode: string): Promise<State | null> {
  const allStates = getAllStates();
  return allStates.find(state => state.code === stateCode) || null;
}