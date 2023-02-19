import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const notifyForSuccess = (message) => toast.success(message);
export const notifyForError = (message) => toast.error(message);


