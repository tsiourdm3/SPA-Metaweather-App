import { useState } from "react";



const useForm = callback => {
  const [weather, setWeather] = useState([]);
  const [location, setLocation] = useState("");

  const initializeLocation = () => {

  }
  const [inputs, setInputs] = useState({ location: initializeLocation()  });
  
  
  //here we handle the submition of the location on the input element by
  //setting the state of the weather on true and passing on the state of
  // the location from the input.
  const handleSubmit = async e => {
    if (e) {
      e.preventDefault();
    }
    setWeather({ loading: true });
    const res = await callback(inputs.location);
    setWeather(res);
    setLocation(inputs.location);
  };

  //If you need to access event object’s properties after the event handler has run, you need to call e.persist():
  const handleInputChange = e => {
    e.persist();
    setInputs(inputs => ({ ...inputs, [e.target.name]: e.target.value }));
  };

 


  return { handleSubmit, handleInputChange, weather, location, inputs };
};

export default useForm;
