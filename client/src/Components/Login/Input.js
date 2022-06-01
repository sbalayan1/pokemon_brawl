import TextField from '@mui/material/TextField'
let Input = ({keyName, userInfo, setUserInfo}) => {

    let handleChange = () => {

    }

    return (
        <>
            <label>{keyName}</label>
            <TextField variant="outlined" className='login-input' type="text" onChange={handleChange}/>
        </>
    )
}

export default Input