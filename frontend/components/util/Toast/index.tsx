import toast from 'cogo-toast';
import { TitleDiv, MessageDiv } from './styles';

const Toast = ({ type = 'info', title, message, error = null }) =>
	error
		? toast.error(
				<>
					{<TitleDiv>{error.response.data.meta.response.title}</TitleDiv>}
					{<MessageDiv>{error.response.data.meta.response.message}</MessageDiv>}
				</>
		  )
		: toast[type](
				<>
					{title && <TitleDiv>{title}</TitleDiv>}
					{message && <MessageDiv>{message}</MessageDiv>}
				</>
		  );

export default Toast;
