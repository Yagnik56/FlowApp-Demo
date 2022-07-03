
export interface IWorkflow {
    name: string;
    status: STATUS;
    isChangable: boolean;
    userID: string;
}

export enum STATUS {
    COMPLETED = 'Completed',
    PENDING = 'Pending',
}