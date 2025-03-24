import Swal from 'sweetalert2';

export function showSuccess(message: string) {
  Swal.fire({
    title: 'Success!',
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

export function showWarning(message: string) {
  Swal.fire({
    title: 'Warning',
    text: message,
    icon: 'warning'
  });
}

export function showInfo(message: string) {
  Swal.fire({
    title: 'Information',
    text: message,
    icon: 'info'
  });
}

export function showConfirmation(message: string) {
  return Swal.fire({
    title: 'Are you sure?',
    text: message,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  });
}
