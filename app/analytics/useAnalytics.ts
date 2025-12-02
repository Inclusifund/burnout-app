import { useEffect } from 'react';
import PostHog from 'posthog-react-native';

// Initialize PostHog client
const posthogClient = new PostHog('POSTHOG_API_KEY', {
    host: 'https://us.i.posthog.com',
});

export const useAnalytics = () => {
    const trackEvent = (eventName: string, properties?: Record<string, any>) => {
        try {
            posthogClient.capture(eventName, properties);
        } catch (error) {
            console.warn(`Failed to track event: ${eventName}`, error);
        }
    };

    return {
        trackEvent,
        // Convenience methods for common events
        trackScreenView: (routeName: string) => trackEvent('screen_viewed', { route_name: routeName }),
        trackResetPlayed: (id: string, type: string) => trackEvent('reset_played', { id, type }),
        trackDiscountOpened: (id: string, category: string) => trackEvent('discount_opened', { id, category }),
        trackScriptCopied: (id: string) => trackEvent('script_copied', { id }),
    };
};

// Hook for tracking screen views automatically
export const useScreenView = (routeName: string) => {
    const { trackScreenView } = useAnalytics();

    useEffect(() => {
        trackScreenView(routeName);
    }, [routeName]);
};
