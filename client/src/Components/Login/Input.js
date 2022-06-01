import TextField from '@mui/material/TextField'
let Input = ({keyName, userInfo, setUserInfo}) => {
    let newLabel = () => {
        let updateKey = keyName.replace(/[^a-zA-Z ]/g, " ")
        let i = 0
        while (i<updateKey.length) {
            if (updateKey[i] === ' ') {
                updateKey = updateKey.slice(0, i+1) + updateKey[i+1].toUpperCase() + updateKey.slice(i+2)
            }
            i++
        }
        return updateKey[0].toUpperCase() + updateKey.slice(1)
    }

    let handleChange = () => {

    }

    return (
        <>
            <br></br>
            <label>{newLabel()}</label>
            <TextField variant="outlined" className='login-input' type="text" onChange={handleChange}/>
        </>
    )
}

export default Input