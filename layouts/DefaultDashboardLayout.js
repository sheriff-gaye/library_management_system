// import node module libraries
import { useEffect, useState } from 'react';

// import sub components
import NavbarVertical from './navbars/NavbarVertical';
import NavbarTop from './navbars/NavbarTop';
import { Row, Col } from 'react-bootstrap';
import { ToastProvider } from '../hooks/toast-provider';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const DefaultDashboardLayout = (props) => {
	const [showMenu, setShowMenu] = useState(true);
	const ToggleMenu = () => {
		return setShowMenu(!showMenu);
	};	

	const router = useRouter();
	const token = Cookies.get('token');
  
   useEffect(()=>{
   
	if (!token) router.push('/');
   },[router, token])

   

	return (		
		<div id="db-wrapper" className={`${showMenu ? '' : 'toggled'}`}>
			<div className="navbar-vertical navbar">
				<NavbarVertical
					showMenu={showMenu}
					onClick={(value) => setShowMenu(value)}
				/>
			</div>
			<div id="page-content">
				<div className="header">
					<NavbarTop
						data={{
							showMenu: showMenu,
							SidebarToggleMenu: ToggleMenu
						}}
					/>
				</div>
				<ToastProvider/>
				{props.children}
				
			</div>
		</div>
	);
};
export default DefaultDashboardLayout;
