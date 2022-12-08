import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/router';
import React, { Dispatch, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { userOnboardingState } from '../../atoms';
import axios from 'axios';
import { INSPECT_MAX_BYTES } from 'buffer';
import { DOMAIN_ENDPOINT } from '../../src/constants';


interface Props { 
  msg: string, 
  end?: boolean,
  arAddress?: string | undefined,
  handleLabels?: Dispatch<any>
}

function LoadingScreen({msg, end, arAddress, handleLabels}: Props) {

  const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);
  const userCurrentStep = useRecoilValue(userOnboardingState);

    // after a timer, redirectr the user to the home page 
    const route = useRouter();
    const [fetched, setFetched] = useState(false);
    const [error, setError] = useState(false);

    const fetchDomains = async() => {
      try {
        const result = await axios(DOMAIN_ENDPOINT+arAddress);
        const payload = result.data;
        if(result.status === 200) {
          setFetched(true);
          // Send handle data back to Onboarding
          handleLabels(payload);
        }
      } catch (e) {
          setError(true);
      } 
    };  
    
    useEffect(() => {
      fetchDomains();
    }, []);


    // if time out and the user is in the last step 
    useEffect(() => {
      if (fetched) { 
        if (end) {
          route.push('/')
        } else { 
          setUserOnboarding(userOnboardingStep + 1)
        }    
      }
    }, [fetched, userCurrentStep])
    

  return ( 
    <>
    {error ?
      (
        <div className='cursor-not-allowed items-center flex flex-col justify-center h-screen space-y-5'>
            <p className='font-medium text-xl text-center text-[#3a3a3a]'>
              There was an error checking your data.
            </p>
            <p onClick={() => setError(false)}>Click here to fetch again.</p>
        </div>
      )
      :
      (
        <div className='cursor-not-allowed items-center flex flex-col justify-center h-screen space-y-5'>
            <CircularProgress color="inherit" size={31}/>
            <p className='font-medium text-xl text-center text-[#3a3a3a]'>
              {msg}
            </p>
        </div>
      )}
    </>
  );
}

export default LoadingScreen