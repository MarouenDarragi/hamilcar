// type/ServiceType.ts
export interface ServiceType {
    id?: string;
    icon: string;
    category: string;
    title: string;
    shortDesc: string;
    desc: string;
    serviceItems?: {
        itemTitle: string;
        itemDesc: string;
    }[];
    serviceQuestions?: {
        qsSubject: string;
        qsResponse: string;
    }[];
    image?: string; // URL de l'image
}