export interface DayData {
    id: number;
    title: string; // Now a translation key, e.g., 'course.1.title'
    subtitle: string;
    introduction: string;
    sections: {
        title: string;
        content: (string | { type: 'list'; items: string[] })[];
    }[];
    exercise: {
        title: string;
        description: string;
        specialFeature?: 'feedback' | 'visualize';
    };
    takeaways: string[];
}

// Data now contains translation keys
export const courseData: DayData[] = [
    {
        id: 1,
        title: "course.1.title",
        subtitle: "course.1.subtitle",
        introduction: "course.1.introduction",
        sections: [
            {
                title: "course.1.sections.0.title",
                content: [ "course.1.sections.0.content.0", "course.1.sections.0.content.1" ]
            },
            {
                title: "course.1.sections.1.title",
                content: [ { type: 'list', items: [ "course.1.sections.1.content.0.items.0", "course.1.sections.1.content.0.items.1" ] } ]
            }
        ],
        exercise: { title: "course.1.exercise.title", description: "course.1.exercise.description" },
        takeaways: ["course.1.takeaways.0", "course.1.takeaways.1"]
    },
    {
        id: 2,
        title: "course.2.title",
        subtitle: "course.2.subtitle",
        introduction: "course.2.introduction",
        sections: [
            {
                title: "course.2.sections.0.title",
                content: [ "course.2.sections.0.content.0", "course.2.sections.0.content.1", "course.2.sections.0.content.2", { type: 'list', items: [ "course.2.sections.0.content.3.items.0", "course.2.sections.0.content.3.items.1" ] } ]
            }
        ],
        exercise: { title: "course.2.exercise.title", description: "course.2.exercise.description" },
        takeaways: ["course.2.takeaways.0", "course.2.takeaways.1"]
    },
     {
        id: 3,
        title: "course.3.title",
        subtitle: "course.3.subtitle",
        introduction: "course.3.introduction",
        sections: [
            {
                title: "course.3.sections.0.title",
                content: [ "course.3.sections.0.content.0", "course.3.sections.0.content.1" ]
            }
        ],
        exercise: { title: "course.3.exercise.title", description: "course.3.exercise.description" },
        takeaways: ["course.3.takeaways.0", "course.3.takeaways.1"]
    },
    {
        id: 4,
        title: "course.4.title",
        subtitle: "course.4.subtitle",
        introduction: "course.4.introduction",
        sections: [
            {
                title: "course.4.sections.0.title",
                content: [ "course.4.sections.0.content.0", "course.4.sections.0.content.1", "course.4.sections.0.content.2", { type: 'list', items: [ "course.4.sections.0.content.3.items.0", "course.4.sections.0.content.3.items.1" ] } ]
            }
        ],
        exercise: { title: "course.4.exercise.title", description: "course.4.exercise.description" },
        takeaways: ["course.4.takeaways.0", "course.4.takeaways.1"]
    },
    {
        id: 5,
        title: "course.5.title",
        subtitle: "course.5.subtitle",
        introduction: "course.5.introduction",
        sections: [
            {
                title: "course.5.sections.0.title",
                content: [ "course.5.sections.0.content.0", "course.5.sections.0.content.1", "course.5.sections.0.content.2", { type: 'list', items: [ "course.5.sections.0.content.3.items.0", "course.5.sections.0.content.3.items.1", "course.5.sections.0.content.3.items.2" ] } ]
            }
        ],
        exercise: { title: "course.5.exercise.title", description: "course.5.exercise.description" },
        takeaways: ["course.5.takeaways.0", "course.5.takeaways.1"]
    },
    {
        id: 6,
        title: "course.6.title",
        subtitle: "course.6.subtitle",
        introduction: "course.6.introduction",
        sections: [ { title: "course.6.sections.0.title", content: [ "course.6.sections.0.content.0", "course.6.sections.0.content.1" ] } ],
        exercise: { title: "course.6.exercise.title", description: "course.6.exercise.description" },
        takeaways: ["course.6.takeaways.0", "course.6.takeaways.1"]
    },
    {
        id: 7,
        title: "course.7.title",
        subtitle: "course.7.subtitle",
        introduction: "course.7.introduction",
        sections: [ { title: "course.7.sections.0.title", content: [ { type: 'list', items: [ "course.7.sections.0.content.0.items.0", "course.7.sections.0.content.0.items.1" ] } ] } ],
        exercise: { title: "course.7.exercise.title", description: "course.7.exercise.description" },
        takeaways: ["course.7.takeaways.0", "course.7.takeaways.1"]
    },
    {
        id: 8,
        title: "course.8.title",
        subtitle: "course.8.subtitle",
        introduction: "course.8.introduction",
        sections: [ { title: "course.8.sections.0.title", content: [ "course.8.sections.0.content.0", "course.8.sections.0.content.1" ] } ],
        exercise: { title: "course.8.exercise.title", description: "course.8.exercise.description" },
        takeaways: ["course.8.takeaways.0", "course.8.takeaways.1"]
    },
    {
        id: 9,
        title: "course.9.title",
        subtitle: "course.9.subtitle",
        introduction: "course.9.introduction",
        sections: [ { title: "course.9.sections.0.title", content: [ { type: 'list', items: [ "course.9.sections.0.content.0.items.0", "course.9.sections.0.content.0.items.1", "course.9.sections.0.content.0.items.2", "course.9.sections.0.content.0.items.3" ] } ] } ],
        exercise: { title: "course.9.exercise.title", description: "course.9.exercise.description" },
        takeaways: ["course.9.takeaways.0", "course.9.takeaways.1"]
    },
    {
        id: 10,
        title: "course.10.title",
        subtitle: "course.10.subtitle",
        introduction: "course.10.introduction",
        sections: [ { title: "course.10.sections.0.title", content: [ "course.10.sections.0.content.0", "course.10.sections.0.content.1" ] } ],
        exercise: { title: "course.10.exercise.title", description: "course.10.exercise.description" },
        takeaways: ["course.10.takeaways.0", "course.10.takeaways.1"]
    },
    {
        id: 11,
        title: "course.11.title",
        subtitle: "course.11.subtitle",
        introduction: "course.11.introduction",
        sections: [ { title: "course.11.sections.0.title", content: [ "course.11.sections.0.content.0", { type: 'list', items: [ "course.11.sections.0.content.1.items.0", "course.11.sections.0.content.1.items.1", "course.11.sections.0.content.1.items.2", "course.11.sections.0.content.1.items.3", "course.11.sections.0.content.1.items.4", "course.11.sections.0.content.1.items.5", "course.11.sections.0.content.1.items.6" ] } ] } ],
        exercise: { title: "course.11.exercise.title", description: "course.11.exercise.description" },
        takeaways: ["course.11.takeaways.0", "course.11.takeaways.1"]
    },
    {
        id: 12,
        title: "course.12.title",
        subtitle: "course.12.subtitle",
        introduction: "course.12.introduction",
        sections: [ { title: "course.12.sections.0.title", content: [ "course.12.sections.0.content.0", "course.12.sections.0.content.1" ] } ],
        exercise: { title: "course.12.exercise.title", description: "course.12.exercise.description" },
        takeaways: ["course.12.takeaways.0", "course.12.takeaways.1"]
    },
    {
        id: 13,
        title: "course.13.title",
        subtitle: "course.13.subtitle",
        introduction: "course.13.introduction",
        sections: [ { title: "course.13.sections.0.title", content: [ "course.13.sections.0.content.0", "course.13.sections.0.content.1" ] } ],
        exercise: { title: "course.13.exercise.title", description: "course.13.exercise.description" },
        takeaways: ["course.13.takeaways.0", "course.13.takeaways.1"]
    },
    {
        id: 14,
        title: "course.14.title",
        subtitle: "course.14.subtitle",
        introduction: "course.14.introduction",
        sections: [ { title: "course.14.sections.0.title", content: [ "course.14.sections.0.content.0" ] } ],
        exercise: { title: "course.14.exercise.title", description: "course.14.exercise.description" },
        takeaways: ["course.14.takeaways.0", "course.14.takeaways.1"]
    },
    {
        id: 15,
        title: "course.15.title",
        subtitle: "course.15.subtitle",
        introduction: "course.15.introduction",
        sections: [ { title: "course.15.sections.0.title", content: [ "course.15.sections.0.content.0", "course.15.sections.0.content.1" ] } ],
        exercise: { title: "course.15.exercise.title", description: "course.15.exercise.description" },
        takeaways: ["course.15.takeaways.0", "course.15.takeaways.1"]
    },
    {
        id: 16,
        title: "course.16.title",
        subtitle: "course.16.subtitle",
        introduction: "course.16.introduction",
        sections: [ { title: "course.16.sections.0.title", content: [ "course.16.sections.0.content.0", { type: 'list', items: [ "course.16.sections.0.content.1.items.0", "course.16.sections.0.content.1.items.1", "course.16.sections.0.content.1.items.2", "course.16.sections.0.content.1.items.3" ] } ] } ],
        exercise: { title: "course.16.exercise.title", description: "course.16.exercise.description" },
        takeaways: ["course.16.takeaways.0", "course.16.takeaways.1"]
    },
    {
        id: 17,
        title: "course.17.title",
        subtitle: "course.17.subtitle",
        introduction: "course.17.introduction",
        sections: [ { title: "course.17.sections.0.title", content: [ "course.17.sections.0.content.0", "course.17.sections.0.content.1", "course.17.sections.0.content.2" ] } ],
        exercise: { title: "course.17.exercise.title", description: "course.17.exercise.description" },
        takeaways: ["course.17.takeaways.0", "course.17.takeaways.1"]
    },
    {
        id: 18,
        title: "course.18.title",
        subtitle: "course.18.subtitle",
        introduction: "course.18.introduction",
        sections: [ { title: "course.18.sections.0.title", content: [ "course.18.sections.0.content.0", "course.18.sections.0.content.1" ] } ],
        exercise: { title: "course.18.exercise.title", description: "course.18.exercise.description" },
        takeaways: ["course.18.takeaways.0", "course.18.takeaways.1"]
    },
    {
        id: 19,
        title: "course.19.title",
        subtitle: "course.19.subtitle",
        introduction: "course.19.introduction",
        sections: [
            { title: "course.19.sections.0.title", content: [ "course.19.sections.0.content.0", "course.19.sections.0.content.1" ] },
            { title: "course.19.sections.1.title", content: [ "course.19.sections.1.content.0", { type: 'list', items: [ "course.19.sections.1.content.1.items.0", "course.19.sections.1.content.1.items.1", "course.19.sections.1.content.1.items.2" ] } ] }
        ],
        exercise: { title: "course.19.exercise.title", description: "course.19.exercise.description" },
        takeaways: ["course.19.takeaways.0", "course.19.takeaways.1"]
    },
    {
        id: 20,
        title: "course.20.title",
        subtitle: "course.20.subtitle",
        introduction: "course.20.introduction",
        sections: [ { title: "course.20.sections.0.title", content: [ "course.20.sections.0.content.0", "course.20.sections.0.content.1" ] } ],
        exercise: { title: "course.20.exercise.title", description: "course.20.exercise.description" },
        takeaways: ["course.20.takeaways.0", "course.20.takeaways.1"]
    },
    {
        id: 21,
        title: "course.21.title",
        subtitle: "course.21.subtitle",
        introduction: "course.21.introduction",
        sections: [ { title: "course.21.sections.0.title", content: [ "course.21.sections.0.content.0", "course.21.sections.0.content.1" ] } ],
        exercise: { title: "course.21.exercise.title", description: "course.21.exercise.description" },
        takeaways: ["course.21.takeaways.0", "course.21.takeaways.1"]
    },
    {
        id: 22,
        title: "course.22.title",
        subtitle: "course.22.subtitle",
        introduction: "course.22.introduction",
        sections: [ { title: "course.22.sections.0.title", content: [ "course.22.sections.0.content.0", "course.22.sections.0.content.1" ] } ],
        exercise: { title: "course.22.exercise.title", description: "course.22.exercise.description" },
        takeaways: ["course.22.takeaways.0", "course.22.takeaways.1"]
    },
    {
        id: 23,
        title: "course.23.title",
        subtitle: "course.23.subtitle",
        introduction: "course.23.introduction",
        sections: [ { title: "course.23.sections.0.title", content: [ "course.23.sections.0.content.0", "course.23.sections.0.content.1" ] } ],
        exercise: { 
            title: "course.23.exercise.title", 
            description: "course.23.exercise.description",
            specialFeature: 'feedback' 
        },
        takeaways: ["course.23.takeaways.0", "course.23.takeaways.1"]
    },
    {
        id: 24,
        title: "course.24.title",
        subtitle: "course.24.subtitle",
        introduction: "course.24.introduction",
        sections: [ { title: "course.24.sections.0.title", content: [ "course.24.sections.0.content.0", "course.24.sections.0.content.1" ] } ],
        exercise: { title: "course.24.exercise.title", description: "course.24.exercise.description" },
        takeaways: ["course.24.takeaways.0", "course.24.takeaways.1"]
    },
    {
        id: 25,
        title: "course.25.title",
        subtitle: "course.25.subtitle",
        introduction: "course.25.introduction",
        sections: [ { title: "course.25.sections.0.title", content: [ "course.25.sections.0.content.0", "course.25.sections.0.content.1" ] } ],
        exercise: { 
            title: "course.25.exercise.title", 
            description: "course.25.exercise.description",
            specialFeature: 'visualize'
        },
        takeaways: ["course.25.takeaways.0", "course.25.takeaways.1"]
    },
    {
        id: 26,
        title: "course.26.title",
        subtitle: "course.26.subtitle",
        introduction: "course.26.introduction",
        sections: [ { title: "course.26.sections.0.title", content: [ "course.26.sections.0.content.0", "course.26.sections.0.content.1" ] } ],
        exercise: { title: "course.26.exercise.title", description: "course.26.exercise.description" },
        takeaways: ["course.26.takeaways.0", "course.26.takeaways.1"]
    },
    {
        id: 27,
        title: "course.27.title",
        subtitle: "course.27.subtitle",
        introduction: "course.27.introduction",
        sections: [ { title: "course.27.sections.0.title", content: [ "course.27.sections.0.content.0", "course.27.sections.0.content.1" ] } ],
        exercise: { title: "course.27.exercise.title", description: "course.27.exercise.description" },
        takeaways: ["course.27.takeaways.0", "course.27.takeaways.1"]
    },
    {
        id: 28,
        title: "course.28.title",
        subtitle: "course.28.subtitle",
        introduction: "course.28.introduction",
        sections: [ { title: "course.28.sections.0.title", content: [ "course.28.sections.0.content.0", "course.28.sections.0.content.1" ] } ],
        exercise: { title: "course.28.exercise.title", description: "course.28.exercise.description" },
        takeaways: ["course.28.takeaways.0", "course.28.takeaways.1"]
    },
    {
        id: 29,
        title: "course.29.title",
        subtitle: "course.29.subtitle",
        introduction: "course.29.introduction",
        sections: [ { title: "course.29.sections.0.title", content: [ "course.29.sections.0.content.0", "course.29.sections.0.content.1" ] } ],
        exercise: { title: "course.29.exercise.title", description: "course.29.exercise.description" },
        takeaways: ["course.29.takeaways.0", "course.29.takeaways.1"]
    },
    {
        id: 30,
        title: "course.30.title",
        subtitle: "course.30.subtitle",
        introduction: "course.30.introduction",
        sections: [ { title: "course.30.sections.0.title", content: [ "course.30.sections.0.content.0", { type: 'list', items: [ "course.30.sections.0.content.1.items.0", "course.30.sections.0.content.1.items.1", "course.30.sections.0.content.1.items.2" ] } ] } ],
        exercise: { title: "course.30.exercise.title", description: "course.30.exercise.description" },
        takeaways: ["course.30.takeaways.0", "course.30.takeaways.1"]
    }
];

courseData.sort((a, b) => a.id - b.id);


export interface Badge {
    id: string;
    icon: string; // Icon name from Header.tsx
    condition: (completedDays: Set<number>) => boolean;
}

export const gamificationData: { badges: Badge[] } = {
    badges: [
        { id: 'day1', icon: 'sparkles', condition: (completed) => completed.has(1) },
        { id: 'week1', icon: 'award', condition: (completed) => completed.size >= 7 },
        { id: 'halfway', icon: 'flag', condition: (completed) => completed.size >= 15 },
        { id: 'week3', icon: 'rocket', condition: (completed) => completed.size >= 21 },
        { id: 'finish', icon: 'trophy', condition: (completed) => completed.size >= 30 },
        { id: 'journal-pro', icon: 'edit-3', condition: (completed) => completed.size >= 10 },
        { id: 'dna_report', icon: 'brain-circuit', condition: () => false }, // Awarded manually
    ]
};