import React, {useState} from 'react';

const RegistrationForm = () => {
    const initialFormData = {
        name: '',
        email: '',
        password: '',
    };
    const [formData, setformData] = useState<{name: string; email: string; password: string;}>(initialFormData);
    const initialErrors = {
        name: false,
        email: false,
        password: false,
    };
    const [errors, setErrors] = useState<{name: boolean; email: boolean; password: boolean;}>(initialErrors);
    const [success, setSuccess] = useState(false);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setformData((prevData) => ({
            ...prevData,
            [name]: e.target.value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(e.currentTarget.name);

      if (formData.name === '') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: true,
        }));
      }

      if (formData.email === '' || !formData.email.includes('@')) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: true,
        }));
      }
        if (formData.password.length <= 8) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: true,
          }));
        }
        if (formData.name && formData.email && formData.password.length >= 8) {
          setSuccess(true);
          setErrors(initialErrors);
          setformData(initialFormData);
        }

    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">*Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleOnChange}
          />
          {errors.name && (<p>Name is required</p>)}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email || ''}
            onChange={handleOnChange}
          />
          {errors.email && (<p>Invalid email</p>)}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password || ''}
            onChange={handleOnChange}
          />
            {errors.password && (<p>Password must be at least 8 characters long.</p>)}
        </div>

        <button type="submit">Register</button>
        {success && <p>Registration successful!</p>}
      </form>
    );
  };

  export default RegistrationForm;