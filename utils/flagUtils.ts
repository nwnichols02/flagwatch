import { FlagStatus } from '@/types';

// This would typically connect to a real API in a production app
export async function getCurrentStatus(): Promise<FlagStatus> {
  // Mock data - this would be replaced with real API call
  const today = new Date();
  
  // Determine if today is Memorial Day (last Monday in May)
  const isMemorialDay = isLastMondayInMay(today);
  
  // Determine if today is one of the other half-mast days
  const isPearlHarborDay = today.getMonth() === 11 && today.getDate() === 7; // December 7
  const isPatriotDay = today.getMonth() === 8 && today.getDate() === 11; // September 11
  
  // For demonstration purposes, we'll create a mock half-mast scenario
  // In a real app, this would come from an API
  const mockHalfMast = isMemorialDay || isPearlHarborDay || isPatriotDay || Math.random() > 0.6;
  
  if (mockHalfMast) {
    // Create a start date (today or yesterday)
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (Math.random() > 0.5 ? 1 : 0));
    startDate.setHours(8, 0, 0, 0); // 8:00 AM
    
    // Create an end date (tomorrow or the day after)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + (Math.random() > 0.5 ? 1 : 2));
    endDate.setHours(19, 0, 0, 0); // 7:00 PM
    
    let reason;
    if (isMemorialDay) {
      reason = {
        title: 'Memorial Day Remembrance',
        summary: 'The flag is at half-mast until noon today to honor those who have made the ultimate sacrifice for our country.',
        source: 'Presidential Proclamation',
        imageUrl: 'https://images.pexels.com/photos/1202723/pexels-photo-1202723.jpeg',
        linkUrl: 'https://www.va.gov/opa/speceven/memday/',
      };
    } else if (isPearlHarborDay) {
      reason = {
        title: 'Pearl Harbor Remembrance Day',
        summary: 'Honoring those who lost their lives in the attack on Pearl Harbor on December 7, 1941.',
        source: 'Presidential Proclamation',
        imageUrl: 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg',
        linkUrl: 'https://www.defense.gov/Spotlights/Pearl-Harbor-Remembrance/',
      };
    } else if (isPatriotDay) {
      reason = {
        title: 'Patriot Day',
        summary: 'Remembering the lives lost during the terrorist attacks on September 11, 2001.',
        source: 'Presidential Proclamation',
        imageUrl: 'https://images.pexels.com/photos/4054035/pexels-photo-4054035.jpeg',
        linkUrl: 'https://www.usa.gov/september11',
      };
    } else {
      // Random reason for demo purposes
      const mockReasons = [
        {
          title: 'Honoring a Fallen Public Servant',
          summary: 'The flag is at half-mast to honor the memory of Supreme Court Justice Eleanor Matthews, who passed away yesterday after 25 years of distinguished service.',
          source: 'Presidential Proclamation',
          imageUrl: 'https://images.pexels.com/photos/6175637/pexels-photo-6175637.jpeg',
          linkUrl: 'https://www.whitehouse.gov/proclamations/',
        },
        {
          title: 'National Day of Mourning',
          summary: 'President declares a national day of mourning for victims of the recent natural disaster that affected multiple states.',
          source: 'White House Press Office',
          imageUrl: 'https://images.pexels.com/photos/4554211/pexels-photo-4554211.jpeg',
          linkUrl: 'https://www.whitehouse.gov/briefing-room/',
        }
      ];
      reason = mockReasons[Math.floor(Math.random() * mockReasons.length)];
    }
    
    return {
      isHalfMast: true,
      startDate,
      endDate,
      reason
    };
  }
  
  // Full staff status
  return {
    isHalfMast: false
  };
}

// Helper to determine if a date is the last Monday in May (Memorial Day)
function isLastMondayInMay(date: Date): boolean {
  if (date.getMonth() !== 4) return false; // Not May
  
  // Get the last day of May
  const lastDay = new Date(date.getFullYear(), 4 + 1, 0);
  
  // Find the last Monday
  const lastMonday = new Date(lastDay);
  const dayOfWeek = lastDay.getDay();
  
  // If last day is not Monday (1), move back to the last Monday
  if (dayOfWeek !== 1) {
    // Calculate days to go back to reach Monday
    const daysToSubtract = (dayOfWeek === 0) ? 6 : dayOfWeek - 1;
    lastMonday.setDate(lastDay.getDate() - daysToSubtract);
  }
  
  // Check if today is that last Monday
  return date.getDate() === lastMonday.getDate();
}