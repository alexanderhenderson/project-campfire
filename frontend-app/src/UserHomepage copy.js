import React from 'react';
import { AuthContext, getTokenInternal } from "./Authorization";




class UserHomepage extends React.Component {
  
  static contextType = AuthContext;

    constructor(props) {
        super(props)
        this.state = {
            activities: [],
            authenticated: false
        } 
        
      }
    
  
      static contextType = AuthContext;


      
      
  // static contextType = AuthContext;
  // async doSomethingWithToken() {

  //   console.log("logstop 1")
  //   const token = this.context.token;

    const tokenRequest = await fetch(`${process.env.REACT_APP_USERS}/users/api/tokens/mine/`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
      // Other fetch options, like method and body, if applicable
    });
    console.log(await tokenRequest);
  }

    async componentDidMount() {

        const response = await fetch('http://localhost:8080/api/appointments/')
        if (response.ok) {
          const data = await response.json()
          this.setState({ appointments: data.appointments })
          
        }
        
        console.log("is the context empty: ", this.context)
        const contextToken = this.context.token;
        console.log("Context token: ", contextToken)
        console.log("Context token: ", await this.context.setToken())


        const testToken = await getTokenInternal();
        console.log("testing authcontext: ", testToken);

        // const testing = AuthContext;
        // console.log("testing authcontext below");
        // console.log("testing authcontext: ", await testing.context.token);

        const token = await getTokenInternal();
        //console.log("token: ", token)

        let fakeToken = await token
        //console.log(fakeToken)
        fakeToken = fakeToken.slice(0, 1360)
        
        console.log("Fake token length: ", fakeToken.length)
        
        console.log("About to request fake token")

        // the bearer token doesn't appear to be used
        const tokenRequest = await fetch(`${process.env.REACT_APP_USERS}/users/api/tokens/mine/`, {
          headers: { Authorization: `Bearer ${fakeToken}` },
          credentials: "include",
          // Other fetch options, like method and body, if applicable
        });
        
        console.log("Fake token requested")
        
        
        console.log("Jsson response: ", tokenRequest)
        const gotToken = await tokenRequest.json()
        console.log("Json token: ", gotToken)
        console.log("Json token length: ", gotToken.token.length)
        
      
    
      };  

    render () {

        return (
            <>
            <div>
            <h1 className = "special" >Campfire Page !</h1>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th> 666 ADD STUFF HERE AS A TABLE HEADER  666<button type="button" className="btn btn-danger">Danger</button></th> 
                </tr>
              </thead>
              <tbody>
                {/* {this.state.appointments.filter(app => {
                  if(app.is_finished === false){
                    return app
                  }
                }).reverse().map(appointment => {

                  const dateFormat = new Date(appointment.date).toLocaleDateString()
                
                  return (
                    <tr>
                      <td>You could put stuff here</td>
                    </tr>
                  );
                })} */}
              </tbody>
            </table>
            </div>
            </>
        )        
    }
}

export default UserHomepage
