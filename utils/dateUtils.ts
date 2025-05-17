// Format a date to a readable string (e.g., "Jan 1, 2023")
export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
  
  // Format a date range (e.g., "Jan 1-3, 2023" or "Dec 31, 2022 - Jan 2, 2023")
  export function formatDateRange(startDate: Date, endDate: Date): string {
    const startMonth = startDate.getMonth();
    const endMonth = endDate.getMonth();
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    
    if (startMonth === endMonth && startYear === endYear) {
      // Same month and year (e.g., "Jan 1-3, 2023")
      return `${startDate.toLocaleDateString('en-US', { month: 'short' })} ${startDate.getDate()}-${endDate.getDate()}, ${startYear}`;
    } else if (startYear === endYear) {
      // Different month, same year (e.g., "Dec 31 - Jan 2, 2023")
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    } else {
      // Different years (e.g., "Dec 31, 2022 - Jan 2, 2023")
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }
  }
  
  // Format relative time (e.g., "5 minutes ago", "2 hours ago", "yesterday")
  export function formatDistance(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) {
      return 'yesterday';
    }
    
    if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    }
    
    return formatDate(date);
  }