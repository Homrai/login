import { Box, TextField, Typography } from "@mui/material"
import { useController } from "react-hook-form";
import { useForm } from 'react-hook-form';

export const Input =({name="",place="",errors={},typeField=""})=>{
    const script = /[<">/']/;
    const {control}=useForm();

    let {field}=useController({
        control,
        name,
        defaultValue:"",
        rules: { required: `${name} es requerido`,
        maxLength:{value:50, message:`Max 50 characteres`}, 
        validate: {
          isScript:value=>!script.test(value) || "porfavor no agregue scripts 🤡",
          } },
      });

    if(typeField==="email"){
        field=useController({
            control,
            defaultValue:"",
            name,
            rules: { required: `${name} es requerido`,
            maxLength:{value:30, message:`Max 30 characteres`}, 
            validate: {
              isScript:value=>!script.test(value) || "porfavor no agregue scripts 🤡",
              isEmail:value=>value.includes("@") && value.includes(".") || "porfavor agregue un email valido",
              } },
          }).field;
    }
    if(typeField==="number"){        
        field=useController({
            control,
            defaultValue:"",
            name,
            rules: { required: `${name} es requerido`,
            maxLength:{value:10, message:`Max 10 numbers`},
            minLength:{value:10, message:`Min 10 numbers`},
            validate: {
              isScript:value=>!script.test(value) || "porfavor no agregue scripts 🤡",
              } },
          }).field;
    }    

    return(
        <Box  sx={{my:1, width:300 }}>
            <TextField  label={place} 
                        sx={{color:'blue'}}
                        variant="outlined"
                        value={field.value}
                        onChange={field.onChange} 
                        color="primary"
                        error={JSON.stringify(errors)!=="{}"}
                        type={typeField}
                        />
            {errors && <Typography color={"red"}>{errors?.message}</Typography>}
        </Box>
    )
};

export const ChangeOn=(e,setItem)=>{
    const {value,name,checked}=e.target;    
    if (checked!==undefined) {
        return setItem(old=>({...old, [name]:checked }));
    }else{
        return setItem(value);
    }
}