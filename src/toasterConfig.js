import { toast } from 'react-toastify'; // Toaster
import 'react-toastify/dist/ReactToastify.css'; // Toaster
import { css } from 'glamor';

export const errorToasterStyle = {
  position: toast.POSITION.BOTTOM_RIGHT,
  className: css({
    background: 'rgb(245, 179, 179)',
  }),
  bodyClassName: css({
    fontSize: '15px',
    color: 'grey',
  }),
  progressClassName: css({
    background: 'none',
  }),
};

export const validToasterStyle = {};
