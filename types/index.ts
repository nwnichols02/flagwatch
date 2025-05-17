// Flag status types
export interface FlagStatus {
    enabledStates: State[];
    isHalfMast: boolean;
    startDate?: Date;
    endDate?: Date;
    reason?: FlagReason;
  }
  
  export interface FlagReason {
    title: string;
    summary: string;
    source: string;
    imageUrl?: string;
    linkUrl?: string;
  }
  
  // State types
  export interface State {
    id: string;
    name: string;
    code: string;
    isHalfMast: boolean;
    flagImageUrl?: string;
    startDate?: Date;
    endDate?: Date;
  }
  
  // Notification types
  export interface NotificationItem {
    id: string;
    title: string;
    body: string;
    time: Date;
    read: boolean;
    type: 'national' | 'state';
    stateCode?: string;
  }