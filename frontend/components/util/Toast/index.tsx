import toast from 'cogo-toast';
import { TitleDiv, MessageDiv, Container } from './styles';

const Toast = ({ type = 'info', title, message, error = null }) =>
	error
		? toast.error(
				<Container>
					{<TitleDiv>{error.response.data.meta.response.title}</TitleDiv>}
					{<MessageDiv>{error.response.data.meta.response.message}</MessageDiv>}
				</Container>
		  )
		: toast[type](
				<Container>
					{title && <TitleDiv>{title}</TitleDiv>}
					{message && <MessageDiv>{message}</MessageDiv>}
				</Container>
		  );

export default Toast;
