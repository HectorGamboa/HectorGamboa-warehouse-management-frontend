import { HttpErrorResponse } from "@angular/common/http";
import { ApiErrorResponse } from "../interfaces/api/api_error.response";
import { throwError } from "rxjs";

// Función que procesa los errores del backend
export function handleApiError(error: HttpErrorResponse) {
    console.error("Error capturado:", error); // Log para depuración
    
    const apiError: ApiErrorResponse = {
        isSuccess: error.error?.IsSuccess || false,
        data: error.error?.Data || null,
        message: error.error?.Message || "An unknown error occurred",
        totalRecords: error.error?.TotalRecords || null,
        errors: error.error?.Errors || null
    };

    console.log("Error de API:", apiError); // Log para depuración
    
    return throwError(() => apiError.message ?? apiError.errors); // Devolvemos solo el mensaje
}