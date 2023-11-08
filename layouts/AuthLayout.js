// import node module libraries
import { Container } from 'react-bootstrap';
import { ToastProvider } from '../hooks/toast-provider';

const AuthLayout = (props) => {
	return (
		<Container className="d-flex flex-column">
			<ToastProvider/>
			{props.children}
		</Container>
	);
};
export default AuthLayout;
