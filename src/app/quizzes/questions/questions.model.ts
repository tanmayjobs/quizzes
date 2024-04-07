export interface Option{
    id?: string;
    option: string;
    is_correct?: boolean;
}

export interface Question{
    question_id?: string;
    question_text: string;
    options: Option[]
}