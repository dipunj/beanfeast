import { Wrapper } from './styles';
import Header from '../Layouts/Header';

const defaultGetLayout = (page) => {
	return (
		<>
			<Header />
			{page}
		</>
	);
};

export { defaultGetLayout };
