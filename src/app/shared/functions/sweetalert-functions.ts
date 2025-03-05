import Swal from 'sweetalert2';

export function showSuccess(message: string) {
  Swal.fire({
    title: '¡Éxito!',
    text: message,
    icon: 'success'
  });
}

export function showError(message: string) {
  Swal.fire({
    title: 'Error',
    text: message,
    icon: 'error'
  });
}
