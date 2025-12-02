import { useQuery } from '@tanstack/react-query';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../../../firebase/config';

export interface Script {
    id: string;
    title: string;
    content: string;
    category: string;
}

const fetchScripts = async (): Promise<Script[]> => {
    // Mock data for now, similar to Discounts
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: '1',
                    title: 'Talking to your GP about Burnout',
                    category: 'Medical',
                    content: `Doctor, I've been feeling persistently exhausted and emotionally drained for the past [duration]. Even after resting, I don't feel recovered. I'm experiencing [symptoms: insomnia, headaches, irritability]. I'm concerned this might be burnout and would like to discuss a plan for recovery, including potential time off or a referral to a specialist.`
                },
                {
                    id: '2',
                    title: 'Requesting Mental Health Leave from HR',
                    category: 'Work',
                    content: `Dear [HR Manager Name],\n\nI am writing to request a medical leave of absence for health reasons, effective [Start Date]. I have been advised by my doctor to take some time off to focus on my recovery.\n\nI plan to return to work on [Tentative Return Date]. I will do my best to ensure a smooth handover of my current responsibilities before my leave begins.\n\nThank you for your understanding and support.\n\nSincerely,\n[Your Name]`
                },
                {
                    id: '3',
                    title: 'Setting Boundaries with a Manager',
                    category: 'Work',
                    content: `Hi [Manager Name],\n\nI want to ensure I'm delivering high-quality work on my current projects. To do that effectively, I need to manage my capacity. I won't be able to take on [New Task] at this time without deprioritizing [Current Task].\n\nCan we discuss which priority is most critical right now so I can focus my energy there?`
                },
                {
                    id: '4',
                    title: 'Declining a Meeting Invite',
                    category: 'Work',
                    content: `Hi [Name],\n\nThanks for the invite. Given my current focus on [Project/Deadline], I won't be able to attend. Please feel free to send me a summary or action items afterwards, and I'll review them when I can.\n\nThanks,\n[Your Name]`
                },
                {
                    id: '5',
                    title: 'Explaining Burnout to Family',
                    category: 'Personal',
                    content: `I wanted to share something with you because I value our relationship. Lately, I've been going through burnout, which means I'm physically and emotionally depleted. It's not just "tiredness" that a nap can fix.\n\nI might need some space or might not be as social as usual while I recover. I hope you can understand and support me during this time.`
                }
            ]);
        }, 1000);
    });
};

export const useScripts = () => {
    return useQuery({
        queryKey: ['scripts'],
        queryFn: fetchScripts,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
