import { height } from '@mui/system';
import { useAns } from 'ans-for-all';
import React, { useState } from 'react'
import { userInfo } from '../../../src/types'
import ChangeCover from './ChangeCover'
import EditProfile from './EditProfile'

// Cover Page can be generated by:
// - Profile picture's dominant colour 
// - Block hex code 
//  - Custom image 




function CoverPage(props: userInfo) {
  const user_cover = props.userInfo.address_color;
  const coverStyle = { 
    backgroundColor: `${user_cover}`,
    height: 188
  }
  // console.log(user_cover)
  // Ensure the edit feature is only available to the current users page not anyone elses!

  // url site userinfo == userinfo of viewer => show edit else no 
  const {
    walletConnected,
    ansData,
    address,
    arconnectConnect,
    arconnectDisconnect,
    shortenAddress,
  } = useAns();
  // if wallet connected and user info address == address


  return (
    user_cover.length > 0 ? (
      <section style={coverStyle} className="  w-full transition duration relative flex flex-row justify-center">
        <div className='max-w-[1280px]  flex justify-end '>
          <div className=' space-x-3 md:flex pb-3 absolute bottom-1 hidden 
          md:right-1 sm:right-10  md:px-16'>
            {
              address == props.userInfo.user && walletConnected && (
                <>
                  <EditProfile user={props}/>
                  {/* <ChangeCover /> */}
                </>
                )
            }
          </div>
        </div>
        

      </section>
    ) : (
      <section className="h-[218px] bg-white w-full transition duration relative">
        <div className='relative w-[1300px] h-full'>
          <div className='flex flex-row space-x-3 absolute right-1 bottom-1 pb-3 px-4 md:px-16'>
          {
              address == props.userInfo.user && !walletConnected && (
                <>
                  <EditProfile user={props}/>
                  {/* <ChangeCover /> */}
                </>
                )
            }
          </div>
        </div>
      </section>
    )
  
  )
}

export default CoverPage