import React, {useState} from 'react';

const RegistrationForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const initialErrors = {
        name: false,
        email: false,
        password: false,
    };
    const [errors, setErrors] = useState<{name: boolean; email: boolean; password: boolean;}>(initialErrors);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(e.currentTarget.name);

      if (name === '') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: true,
        }));
      }

      if (email === '' || !email.includes('@')) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: true,
        }));
      }
        if (password.length <= 8) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: true,
          }));
        }
        if (name && email && password.length >= 8) {
          setSuccess(true);
          setErrors(initialErrors);
          setName('');
          setEmail('');
          setPassword('');
        }

    };

    return (
      <form onSubmit={handleSubmit} style={{
        border: '1px solid red',
        width: '600px',
        margin: '0 auto'}}
        >
        <div>
          <label htmlFor="name">*Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (<p>Name is required</p>)}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (<p>Invalid email</p>)}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password || ''}
            onChange={(e) => setPassword(e.target.value)}
          />
            {errors.password && (<p>Password must be at least 8 characters long.</p>)}
        </div>

        <button type="submit">Register</button>
        {success && <p>Registration successful!</p>}
      </form>
    );
  };

  export default RegistrationForm;