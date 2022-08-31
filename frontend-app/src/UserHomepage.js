import React from 'react';

class UserHomepage extends React.Component {
  
    constructor(props) {
        super(props)
        this.state = {
            activities: [],
            authenticated: false
        } 
        
      }

    async componentDidMount() {

        const response = await fetch('http://localhost:8080/api/appointments/')
        if (response.ok) {
          const data = await response.json()
          this.setState({ appointments: data.appointments })
          
        }
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
