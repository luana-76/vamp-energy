import {GoogleOAuthProvider} from "@react-oauth/google";
import { GoogleAut } from './GoogleAuto';

export function Raiz() {

  return (
    <>

      <GoogleOAuthProvider clientId="961797263921-8hesqka7m95ci069n19dqm1498dpf728.apps.googleusercontent.com">
        
        <GoogleAut/>
        
      </GoogleOAuthProvider>

    </>
  )
}