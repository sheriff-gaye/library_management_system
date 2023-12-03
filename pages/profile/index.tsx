import React from 'react'
import  GeneralSettings  from '.';
import { GeneralSetting } from '../../components/profile/settings';
import EmailSetting from '../../components/profile/email';
import DeleteAccount from '../../components/profile/delete';

const index = () => {
  return (
 <div className='p-5'>
     <GeneralSetting/>
     <EmailSetting/>
     <DeleteAccount/>
 </div>
  )
}

export default index