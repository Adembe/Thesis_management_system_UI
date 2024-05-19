export interface Thesis {
    id?: number;
    status?: number;
    teacher_id?: string;
    eng_name?: string;
    mgl_name?: string;
    content?: string;
    requirement?: string;
    exfired?: string;
    createdAt?: Date; // Assuming you want to work with Date objects in TypeScript
    updatedAt?: Date; // Same assumption as above
}
