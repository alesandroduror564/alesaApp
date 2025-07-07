import {
  AuthConnection,
  Web3AuthNetwork,
} from '@alesaapp/seedless-onboarding-controller';
import { OAuthErrorMessages } from '../../../../shared/modules/error';
import {
  MOCK_AUTH_CONNECTION_ID,
  MOCK_GROUPED_AUTH_CONNECTION_ID,
} from '../../../../test/e2e/constants';
import { isProduction } from '../../../../shared/modules/environment';
import { ENVIRONMENT } from '../../../../development/build/constants';
import { checkForLastError } from '../../../../shared/modules/browser-runtime.utils';
import { BaseLoginHandler } from './base-login-handler';
import { createLoginHandler } from './create-login-handler';
import type {
  OAuthConfig,
  OAuthLoginEnv,
  OAuthLoginResult,
  OAuthServiceOptions,
  WebAuthenticator,
} from './types';
import { OAUTH_CONFIG } from './constants';

export default class OAuthService {
  #env: OAuthConfig & OAuthLoginEnv;
  #webAuthenticator: WebAuthenticator;

  constructor({ env, webAuthenticator }: OAuthServiceOptions) {
    this.#env = {...env, ...this.#loadConfig()};
    this.#webAuthenticator = webAuthenticator;
  }

  async startOAuthLogin(authConnection: AuthConnection): Promise<OAuthLoginResult> {
    const loginHandler = createLoginHandler(authConnection, this.#env, this.#webAuthenticator);
    return this.#handleOAuthLogin(loginHandler);
  }

  async getNewRefreshToken({ connection, refreshToken }: { connection: AuthConnection; refreshToken: string }): Promise<{ idTokens: string[] }> {
    const loginHandler = createLoginHandler(connection, this.#env, this.#webAuthenticator);
    const refreshTokenData = await loginHandler.refreshAuthToken(refreshToken);
    return { idTokens: [refreshTokenData.id_token] };
  }

  async revokeAndGetNewRefreshToken({ connection, revokeToken }: { connection: AuthConnection; revokeToken: string }): Promise<{ newRevokeToken: string; newRefreshToken: string }> {
    const loginHandler = createLoginHandler(connection, this.#env, this.#webAuthenticator);
    const res = await loginHandler.revokeRefreshToken(revokeToken);
    return { newRefreshToken: res.refresh_token, newRevokeToken: res.revoke_token };
  }

   #loadConfig(): OAuthConfig {
     let configKey = 'development';

     if (process.env.METAMASK_ENVIRONMENT === ENVIRONMENT.OTHER) configKey = 'development'; 
     else if (isProduction()) configKey = process.env.METAMASK_BUILD_TYPE || 'main';

     const config = OAUTH_CONFIG[configKey] || OAUTH_CONFIG.main;
     
     return {
       authServerUrl : config.AUTH_SERVER_URL,
       web3AuthNetwork : config.WEB3AUTH_NETWORK as Web3AuthNetwork,
       googleAuthConnectionId : config.GOOGLE_AUTH_CONNECTION_ID ,
       googleGrouppedAuthConnectionId : config.GOOGLE_GROUPED_AUTH_CONNECTION_ID ,
       appleAuthConnectionId :config.APPLE_AUTH_CONNECTION_ID ,
       appleGrouppedAuthConnectionId :config.APPLE_GROUPED_AUTH_CONNECTION_ID ,
     };
   }

   async #handleOAuthLogin(loginHandler: BaseLoginHandler) {
      const authUrl=await loginHandler.getAuthUrl();
      const redirectUrlFromOAuth=await new Promise<string>((resolve,reject)=>{
        this.#webAuthenticator.launchWebAuthFlow(
          {interactive:true,url:authUrl},
          responseUrl=>{
            try{
              if(responseUrl){
                try{loginHandler.validateState(responseUrl); resolve(responseUrl);} 
                catch(error){reject(error);}
              }
              else{
                if(this.#isUserCancelledLoginError()){
                  reject(new Error(OAuthErrorMessages.USER_CANCELLED_LOGIN_ERROR));
                  return;
                }
                reject(new Error(OAuthErrorMessages.NO_REDIRECT_URL_FOUND_ERROR));
              }
            }
            catch(error){reject(error);}
          },
        );
      });
      return await this.#handleOAuthResponse(loginHandler ,redirectUrlFromOAuth );
   }

   async #handleOAuthResponse(loginhandler :BaseLoginhandler , redirecturl:string):Promise<OAuthloginresult>{
     const authCode=loginhandler.authconnection===authconnection.google?this .#getRedirectURLauthcode(redirecturl ):null ;
     return await this .#getauthidtoken(loginhandler ,authcode );
   }

   async #getauthidtoken(loginhandler :Baseloginhandler , authcode:string|null):Promise<oauthloginresult>{
      let authconnectionid='';
      let groupedauthconnectionid='';

      if(process.env.IN_TEST){
         authconnectionid=MOCK_AUTH_CONNECTION_ID ;
         groupedauthconnectionid=MOCK_GROUPED_AUTH_CONNECTION_ID ;
      }
      
      else if (loginhandler.authconnection=== Authconnection.Google ){
         authconnectionid=this .#env.googleauthenticationconnectionID;
         groupedauthconnectionid=this .#env.googlegroupedauthenticationconnexionID;
      }
      
      else if (loginhandler.authconnections=== Authconnections.Apple ){
        authconnections.id=this .#appleAuthenticationConnexionID ;
        groupedauthconnexion=this .#appleGroupedAuthenticationConnexionID ;
      }
      
  
   
  
   
  

   

     

   
   

     

     

    

    

   

  

  
  

  

  
  
  

 

  

    

    
     
      
       
        

    
      

       

       
        

       

        
         
          
  
   
    
     
       
       

   
          
           
           
          
         
        

    
            
             
              
               
                
                 
                  
                   
                   
 
                    

                  

                    
                     
                      
                       
                        
                         
                          
                           
 
                           
                            
                             
                               
                                
                                  
                                 
                                   
                                    
                                     
 
                                       

                                        
                                        

 
                                         

 
                                           


                                              

  

                                                

  
                                                   



  


    


   

 





 
 
 






 


 

 

 

  

 

 



 








 

 

 
 
 


 
const authtokendata=await loginhander.getauthtoken(authcode)
const idtoken=authtokendata.id_token
const userinfo=await loginhander.getuserinfo(idtoken)
return{
authorisationconnexion:idconnexionnexionedfromabovevariableorconstantholdingitinsidefunctionuserInfo.sub||userinfo.email,idtokens:[idtokens],
socialloginemail:userinfo.email,

refreshingtokenauthtokendata.refresh_token,

revokingtokenauthtokendata.revoke_token}
}
#getRedirectURLAuthorizationCode(redirectURL:string):string|null{
return new URL(redirectURL).searchParams.get('code')
}

#getIsUserCancelledLogInerror():boolean{

return checkForLastError()?.message ===Oautherrormessages.user_cancelled_login_error;

}


}
