// import { useState } from "react";
// const InputField = ({ type, placeholder, icon }) => {
//   // State to toggle password visibility
//   const [isPasswordShown, setIsPasswordShown] = useState(false);
//   return (
//     <div className="input-wrapper">
//       <input
//         type={isPasswordShown ? 'text' : type}
//         placeholder={placeholder}
//         className="input-field"
//         required
//       />
//       <i className="material-symbols-rounded">{icon}</i>
//       {type === 'password' && (
//         <i onClick={() => setIsPasswordShown(prevState => !prevState)} className="material-symbols-rounded eye-icon">
//           {isPasswordShown ? 'visibility' : 'visibility_off'}
//         </i>
//       )}
//     </div>
//   )
// }
// export default InputField;
import { useState } from "react";

const InputField = ({ type, placeholder, icon, name, value, onChange }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
  
    return (
      <div className="input-wrapper">
        <input
          type={isPasswordShown && type === 'password' ? 'text' : type}
          placeholder={placeholder}
          className="input-field"
          required
          name={name}
          value={value}
          onChange={onChange}
        />
        <i className="material-icons">{icon}</i>
        {type === 'password' && (
          <i onClick={() => setIsPasswordShown(prev => !prev)} className="material-icons eye-icon">
            {isPasswordShown ? 'visibility' : 'visibility_off'}
          </i>
        )}
      </div>
    );
  };

export default InputField;
