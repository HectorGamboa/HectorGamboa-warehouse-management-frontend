export interface ApiErrorResponse {
    isSuccess: boolean; 
    data: any | null;  
    message: string;    
    totalRecords?: number | null;  
    errors?: any | null;  
}