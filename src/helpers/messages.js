import Swal from 'sweetalert2';

export const toast = Swal.mixin({
  toast: true,
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

export const closeUploaderImg = Swal.mixin({
  showConfirmButton: false,
  onBeforeOpen: () => {
    Swal.close();
  },
});

export const uploaderImg = Swal.mixin({
  position: 'center',
  title: 'Uploading...',
  text: 'Please wait',
  showConfirmButton: false,
  allowOutsideClick: false,
  onBeforeOpen: () => {
    Swal.showLoading();
  },
});
