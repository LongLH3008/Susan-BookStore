export interface ICategoryCreateDTO {
    category_name: string;
    category_thumb?: string;
}

export interface ICategoryUpdateDTO {
    id: string;
    category_name?: string;
    category_thumb?: string;
}

export interface ICategoryResponseDTO {
    id: string;
    category_name: string;
    category_thumb?: string;
    is_active: boolean;
    createdAt: Date;
    updatedAt: Date;
}