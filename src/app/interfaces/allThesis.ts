export interface AllThesis {
    id?: number;
    status?: string;
    teacher_id?: number;
    eng_name?: string;
    mgl_name?: string;
    content?: string;
    requirement?: string;
    fname?: string;
    lname?: string;
    email?: string;
    phone_number?: string;
    createdAt?: Date; // Assuming you want to work with Date objects in TypeScript
    updatedAt?: Date; // Same assumption as above
}
