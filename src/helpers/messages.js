import Swal from 'sweetalert2';

export const toast = Swal.mixin({
  toast: true,
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

export const toastError = Swal.mixin({
  toast: true,
  showConfirmButton: false,
  icon: 'error',
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

export const message = Swal.mixin({
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

export const messageButton = Swal.mixin({
  showConfirmButton: true,
});

export const closeUploaderImg = Swal.mixin({
  showConfirmButton: false,
  willOpen: () => {
    Swal.close();
  },
});

export const uploaderImg = Swal.mixin({
  position: 'center',
  title: 'Uploading...',
  text: 'Please wait',
  showConfirmButton: false,
  allowOutsideClick: false,
  willOpen: () => {
    Swal.showLoading();
  },
});
