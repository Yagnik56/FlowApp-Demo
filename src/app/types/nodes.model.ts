export interface INode {
    title: string;
    content: string;
    position: number;
    workFlow: string;
    userID: string;
    status: NODE_STATUS;
}
export enum NODE_STATUS {
    COMPLETED = 'Completed',
    IN_PROGRESS = 'In Progrss',
    PENDING = 'Pending'
}