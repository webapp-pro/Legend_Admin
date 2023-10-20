export interface PageType {
    count: number|null;
    pages: number|null;
    next: string | null;
    prev: string | null;
}
export interface optionType {
    label: string ;
    value: string ;
}

export interface DataType { 
    id: number|null;
    name: string|null;
    category: string|null;
    age: number|null ;
}