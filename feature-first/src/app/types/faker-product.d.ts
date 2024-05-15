interface FakerProduct {
    id?: number;
    title: string;
    price?: number;
    description?: string;
    images?: string[];
    category?: FakerCategory;
    creationAt?: string;
    updatedAt?: string;
}
