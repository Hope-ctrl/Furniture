const Input = ({ type, name, placeholder, onChange })=>{
    return(
        <input
    type={type}
    name={name}
    placeholder={placeholder}
    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2"
    onChange={onChange}
  />
    )
}

export default Input;