export type Session = {
    id: number;
    name: string;
    description: string;
    startDate: string;
    limitDate: string;
    numEmployees: number;
    location: string;
    urlVideo: string;
    topics: string[];
}

export type Props = {
    sessions: Session[], 
}