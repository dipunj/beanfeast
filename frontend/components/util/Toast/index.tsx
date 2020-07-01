import toast from 'cogo-toast';
import { TitleDiv, MessageDiv, Container } from './styles';
import { errored } from '../../../common/types';

const Toast = ({
	type = 'info',
	title,
	message,
	error,
}: {
	type?: string;
	title?: string;
	message?: string;
	error?: errored;
}) =>
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
