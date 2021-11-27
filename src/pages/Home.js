import React, {
    useEffect
} from "react";
import {
    Link
} from "react-router-dom";
import {
    getUsers
} from "../actions/login";

import {useSelector, useDispatch} from "react-redux";
import toast, {Toaster} from 'react-hot-toast';

function showToast(users){
 
    const typedUsers = {...users, detailed: true};
    console.log(users)
    toast(
        (t) => (
          <div style={{position: "relative", width: "20rem"}}>
             
            <TableCard users={typedUsers} /> 
            <br/>
            <br/>
            <button style={{position: 'absolute', right: 0, bottom: 0}} onClick={() => toast.dismiss(t.id)}>Dismiss</button>
          </div>
        )
        
      );

    // toast(`${text}`, {style: errorStyle});


}

const TableCard = (props) => {
    const {users} = props;
    const {id, name, login, email, type, detailed} = users;
    console.log(id, name, login, email, type, detailed);
    return(
        <table onClick={()=>showToast(users)}>
            <thead><tr>
                    <th>id</th>
                    <th>user</th>
                    <th>login</th>
                    <th>email</th>
                    {detailed ?
                <th>
                    type
                </th>:
                <></>
                }

                </tr></thead>
            <tbody>
                
                <tr>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{login}</td>
                    <td>{email}</td>
                    {detailed ?
                <td>
                    {type}
                </td>:
                <></>
                }
                </tr>
                
                
            </tbody>
        </table>
    )
}


const Home = () => {

    const users = useSelector(state => state.users)
    const dispatch = useDispatch()

    

    function fillUsers(){
        dispatch(getUsers())
    }

    useEffect(() => {
            fillUsers()},[])

    return ( <>
        <div> Home </div> 
        <Toaster
        toastOptions={{
            width: 1000
        }}/>
            <Link to = "/authorization" > Authorization </Link> 
        {
            users?
            <TableCard users={users}/>
            :<></>
        }

        </>
    )


}


export default Home;