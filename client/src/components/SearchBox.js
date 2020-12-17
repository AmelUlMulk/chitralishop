import React,{useState} from 'react';
import {Form,Button} from 'react-bootstrap'

const SearchBox = ({history}) => {
    const [key,setKey]=useState('');
    const submitHandler=(e)=>{
        e.preventDefault();
        if(key.trim()){
         history.push(`/search/${key}`)
        }
        else{
            history.push('/')
        }
    }
    return <Form onSubmit={submitHandler} inline>
            <Form.Control type='text'
            name='q'
            onChange={e=>setKey(e.target.value)}
            placeholder="Search Products"
            className='mr-sm-2 ml-sm-5'>
                  
            </Form.Control>
            <Button type='submit' variant='outline-grey' className='p-2'>
               Search
            </Button>
        </Form>
    
}

export default SearchBox
